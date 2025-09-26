// Tenant utilities for EazyAza storefront
// Adapted from Vercel Platforms patterns

export interface TenantData {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  theme_config: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logoPosition: 'left' | 'center' | 'right';
  };
  default_currency: string;
  supported_regions: string[];
  ai_config: {
    brandVoice: string;
    industry: string;
    contentTone: string;
  };
}

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
const ROOT_DOMAIN = process.env.ROOT_DOMAIN || 'localhost:8000';

// Cache for tenant data (similar to Vercel's approach)
const tenantCache = new Map<string, { data: TenantData; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function extractSubdomainFromHost(host: string): string | null {
  if (!host) return null;

  const hostname = host.split(':')[0];

  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      const subdomain = hostname.split('.')[0];
      return subdomain !== 'localhost' ? subdomain : null;
    }
    return null;
  }

  // Handle production domains
  const rootDomainFormatted = ROOT_DOMAIN.split(':')[0];

  // Handle Vercel preview deployments (tenant---branch.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function getTenantData(subdomain: string): Promise<TenantData | null> {
  if (!subdomain) return null;

  // Check cache first
  const cached = tenantCache.get(subdomain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Fetch from our Medusa backend
    const response = await fetch(`${BACKEND_URL}/admin/tenants/${subdomain}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 300, // 5 minutes
        tags: [`tenant-${subdomain}`]
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Tenant not found: ${subdomain}`);
        return null;
      }
      throw new Error(`Failed to fetch tenant: ${response.status}`);
    }

    const tenantData = await response.json();

    // Cache the result
    tenantCache.set(subdomain, {
      data: tenantData,
      timestamp: Date.now()
    });

    return tenantData;

  } catch (error) {
    console.error(`Error fetching tenant data for ${subdomain}:`, error);

    // Return cached data if available, even if expired
    if (cached) {
      console.log(`Using stale cache for tenant: ${subdomain}`);
      return cached.data;
    }

    return null;
  }
}

export function isValidSubdomain(subdomain: string): boolean {
  if (!subdomain) return false;

  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return (
    sanitized === subdomain &&
    subdomain.length >= 2 &&
    subdomain.length <= 50 &&
    !subdomain.startsWith('-') &&
    !subdomain.endsWith('-') &&
    // Reserved subdomains
    !['www', 'api', 'admin', 'app', 'mail', 'ftp', 'localhost', 'platform'].includes(subdomain)
  );
}

export function createFallbackTenant(subdomain: string): TenantData {
  return {
    id: `fallback-${subdomain}`,
    subdomain,
    name: `${subdomain} Store (Demo)`,
    description: 'Demo store - Please configure your tenant',
    theme_config: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Inter',
      logoPosition: 'left'
    },
    default_currency: 'USD',
    supported_regions: ['us'],
    ai_config: {
      brandVoice: 'professional',
      industry: 'general',
      contentTone: 'friendly'
    }
  };
}

// Clear cache for a specific tenant (useful for admin operations)
export function clearTenantCache(subdomain?: string) {
  if (subdomain) {
    tenantCache.delete(subdomain);
  } else {
    tenantCache.clear();
  }
}

// Get all cached tenants (for debugging)
export function getCachedTenants(): string[] {
  return Array.from(tenantCache.keys());
}