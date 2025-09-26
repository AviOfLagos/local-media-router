import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"
import { extractSubdomainFromHost, getTenantData, isValidSubdomain, createFallbackTenant } from "@lib/tenant-utils"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
const ROOT_DOMAIN = process.env.ROOT_DOMAIN || "localhost:8000"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    let regions: HttpTypes.StoreRegion[] = [];

    try {
      // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
      const response = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
        next: {
          revalidate: 3600,
          tags: [`regions-${cacheId}`],
        },
        cache: "force-cache",
      });

      if (response.ok) {
        const json = await response.json();
        regions = json.regions || [];
      } else {
        console.error(`Failed to fetch regions: HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch regions:", error);
      // regions will remain empty array, triggering fallback below
    }

    if (!regions?.length) {
      // Create a fallback USA region for development
      console.log("No regions found, creating fallback USA region");
      const fallbackRegion: HttpTypes.StoreRegion = {
        id: "fallback-usa",
        name: "United States (Fallback)",
        currency_code: "usd",
        countries: [{ iso_2: "us", display_name: "United States" }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      };

      regionMapCache.regionMap.clear(); // Clear any stale data
      regionMapCache.regionMap.set("us", fallbackRegion);
      regionMapCache.regionMapUpdated = Date.now();
      return regionMapCache.regionMap;
    }

    // Create a map of country codes to regions.
    regionMapCache.regionMap.clear(); // Clear existing data
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

/**
 * Enhanced middleware to handle multi-tenancy and region selection
 * Adapted from Vercel Platforms patterns for EazyAza e-commerce
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get("host") || ""

  // Extract subdomain using our tenant utilities
  const subdomain = extractSubdomainFromHost(host, ROOT_DOMAIN)

  // Handle subdomain routing (tenant stores)
  if (subdomain && isValidSubdomain(subdomain)) {
    // Block access to admin routes from tenant subdomains (Vercel pattern)
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      // Get tenant data from our backend
      let tenantData = await getTenantData(subdomain)

      // Create fallback tenant if not found (for development/demo)
      if (!tenantData) {
        console.log(`Creating fallback tenant for: ${subdomain}`)
        tenantData = createFallbackTenant(subdomain)
      }

      // Inject tenant context into request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-tenant-id', tenantData.id)
      requestHeaders.set('x-tenant-subdomain', subdomain)
      requestHeaders.set('x-tenant-currency', tenantData.default_currency)

      // For root path on subdomain, rewrite to tenant store page
      if (pathname === '/') {
        return NextResponse.rewrite(
          new URL(`/store/${subdomain}`, request.url),
          { request: { headers: requestHeaders } }
        )
      }

      // Pass through other paths with tenant context
      return NextResponse.next({ request: { headers: requestHeaders } })

    } catch (error) {
      console.error(`Error handling tenant ${subdomain}:`, error)
      return new NextResponse('Tenant temporarily unavailable', { status: 503 })
    }
  }

  // Handle main domain (non-subdomain) requests - existing Medusa logic
  let cacheIdCookie = request.cookies.get("_medusa_cache_id")
  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)
  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

  // Existing Medusa region logic
  if (urlHasCountryCode && cacheIdCookie) {
    return NextResponse.next()
  }

  if (urlHasCountryCode && !cacheIdCookie) {
    const response = NextResponse.redirect(request.nextUrl.href, 307)
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
    return response
  }

  // Skip middleware for static assets
  if (pathname.includes(".")) {
    return NextResponse.next()
  }

  const redirectPath = pathname === "/" ? "" : pathname
  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  // Redirect to appropriate region
  if (!urlHasCountryCode && countryCode) {
    const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    return NextResponse.redirect(redirectUrl, 307)
  } else if (!urlHasCountryCode && !countryCode) {
    // Fallback to US region
    const redirectUrl = `${request.nextUrl.origin}/us${redirectPath}${queryString}`
    return NextResponse.redirect(redirectUrl, 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
