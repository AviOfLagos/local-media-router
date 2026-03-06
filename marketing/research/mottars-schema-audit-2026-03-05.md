# Mottars.com Schema / Structured Data Audit

**Date:** 2026-03-05
**Auditor:** Schema.org Markup Specialist
**Pages Audited:** 5 (Homepage, /cars, /blog, blog post, individual car listing)

---

## PART 1: CURRENT IMPLEMENTATION INVENTORY

### 1.1 Global Schema (Present on ALL Pages)

**Organization** -- present on every page as a site-wide block.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mottars.com/#organization",
  "name": "Mottars",
  "alternateName": "mottars",
  "url": "https://mottars.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://mottars.com/#logo",
    "url": "https://mottars.com/favicon-512x512.png",
    "contentUrl": "https://mottars.com/favicon-512x512.png",
    "caption": "Mottars Logo"
  },
  "description": "Nigeria's trusted automotive marketplace...",
  "email": "info@mottars.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "availableLanguage": ["en-NG"],
    "areaServed": "NG"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Victoria Island",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "postalCode": "101241",
    "addressCountry": { "@type": "Country", "name": "Nigeria", "@id": "NG" }
  },
  "sameAs": [
    "https://facebook.com/mottars",
    "https://twitter.com/mottars",
    "https://www.instagram.com/mottarsofficial_",
    "https://linkedin.com/company/mottars"
  ],
  "foundingDate": "2024",
  "slogan": "Nigeria's Trusted Automotive Marketplace"
}
```

### 1.2 Homepage (https://mottars.com)

| Block | Type | Present |
|-------|------|---------|
| Organization | JSON-LD | YES |
| WebSite + SearchAction | JSON-LD | YES (reported by user) |

### 1.3 /cars (Marketplace Listing Page)

| Block | Type | Present |
|-------|------|---------|
| Organization | JSON-LD | YES (duplicate of global) |
| SearchResultsPage + ItemList | JSON-LD | YES |

The /cars page has a `SearchResultsPage` containing an `ItemList` with 20 `ListItem` entries. Each item contains a `Product` with name, URL, image, and an `Offer` with price in NGN.

### 1.4 /blog (Blog Index)

| Block | Type | Present |
|-------|------|---------|
| Organization | JSON-LD | YES (duplicate of global) |
| ItemList / CollectionPage | JSON-LD | **NO** |
| BlogPosting list | JSON-LD | **NO** |

**Only the Organization block is present. No blog-specific schema exists.**

### 1.5 /blog/used-cars-for-sale-in-nigeria-... (Blog Post)

| Block | Type | Present |
|-------|------|---------|
| Organization | JSON-LD | YES (duplicate of global) |
| Article | JSON-LD | YES |
| BreadcrumbList | JSON-LD | **NO** |

The Article schema is present with headline, description, image, dates, author, and publisher.

### 1.6 /cars/toyota-camry-2025-1 (Individual Car Listing)

| Block | Type | Present |
|-------|------|---------|
| Organization | JSON-LD | YES (duplicate of global) |
| Car | JSON-LD | YES |
| BreadcrumbList | JSON-LD | YES |
| FAQPage | JSON-LD | YES |

This is the most complete page for structured data. It includes a `Car` type with brand, model, mileage, transmission, fuel type, condition, and offers, plus a `BreadcrumbList` and an `FAQPage` with 10 questions.

---

## PART 2: VALIDATION ERRORS AND WARNINGS

### 2.1 Organization Schema -- ERRORS

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Placeholder telephone number** | CRITICAL | `"+234-XXX-XXX-XXXX"` is a placeholder, not a real number. Google will flag this as spam/low-quality. Either use a real number or remove the `contactPoint` entirely. |
| 2 | **Invalid `availableLanguage` value** | WARNING | `"en-NG"` is not a valid language code for Schema.org. It should be `"en"` (BCP-47 language tag). `"en-NG"` is a locale, not a language. |
| 3 | **`addressCountry.@id` is not a valid URI** | WARNING | `"@id": "NG"` should be a full URI like `"@id": "https://www.wikidata.org/wiki/Q1033"` or simply omit the @id and use the string "NG" directly. |
| 4 | **`areaServed.@id` same invalid URI** | WARNING | Same issue as above -- `"@id": "NG"` is not a resolvable URI. |
| 5 | **`foundingDate` format** | MINOR | `"2024"` is technically valid ISO 8601 (year-only), but `"2024-01-01"` would be more precise and is preferred. |
| 6 | **Missing recommended properties** | MINOR | No `numberOfEmployees`, `legalName`, or `taxID` -- not required but useful for Google's Knowledge Panel. |

### 2.2 WebSite Schema (Homepage) -- VALIDATION

Based on the user's report, the homepage has a WebSite with SearchAction pointing to `https://mottars.com/cars?search={search_term_string}`.

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Verify `query-input` property** | CHECK | The SearchAction must include `"query-input": "required name=search_term_string"` for Google to recognize the sitelinks search box. Confirm this is present. |

### 2.3 /cars SearchResultsPage + ItemList -- ERRORS

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Test/dummy data in listings** | CRITICAL | Position 1: `"1904 Libero id eligendi c Voluptatum commodi i"` with price `62 NGN`. Position 2: `"2025 nskznjkj kscjz"`. These are clearly test entries leaking into production schema. Google will penalize data quality. |
| 2 | **Nonsensical prices** | CRITICAL | Several listings have prices that appear to be test data: `62 NGN`, `25,000 NGN` for a 2026 Toyota Camry, `44,000 NGN` for a Cadillac CT5. These destroy trust signals. |
| 3 | **`SearchResultsPage` is not a Google-supported rich result type** | WARNING | While valid Schema.org, Google does not generate rich results from `SearchResultsPage`. The `ItemList` inside it is the valuable part and could be elevated to a standalone block. |
| 4 | **Product items missing `description`** | WARNING | Each `Product` in the ItemList lacks a description. Google recommends descriptions for Product rich results. |
| 5 | **Product items using generic type** | RECOMMENDATION | Individual items use `@type: "Product"` instead of the more specific `@type: "Car"` which would be semantically richer and match the individual listing pages. |
| 6 | **Missing `brand` on Product items** | WARNING | Products in the list lack a `brand` property. The brand is embedded in the name string but not structured. |

### 2.4 Blog Post Article Schema -- ERRORS

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Author name is "Admin User"** | WARNING | Generic author name. Google prefers real author names for E-E-A-T signals. Consider using a real person's name or the organization name. |
| 2 | **Publisher logo URL differs from Organization** | MINOR | Publisher logo is `https://mottars.com/logo.svg` but the Organization schema uses `https://mottars.com/favicon-512x512.png`. These should be consistent, and Google requires the publisher logo to be in a supported format (SVG may not render in search results). |
| 3 | **Missing `wordCount`** | MINOR | Recommended for Article schema to help Google understand content depth. |
| 4 | **Missing `articleSection`** | MINOR | No content category specified. |
| 5 | **Missing `inLanguage`** | MINOR | Should specify `"en"` to match the page's `lang="en-NG"`. |
| 6 | **No `BreadcrumbList` on blog pages** | WARNING | Blog posts have no breadcrumb schema despite having a clear hierarchy (Home > Blog > Article). |

### 2.5 Car Listing (Car Schema) -- ERRORS

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **`addressLocality` lowercase** | MINOR | `"lagos"` should be `"Lagos"` for consistency and data quality. |
| 2 | **`productionDate` is fabricated** | WARNING | `"2025-01-01"` appears to be a default date, not the actual production date. If unknown, omit this field rather than fabricate it. |
| 3 | **Duplicate price data** | MINOR | Price appears in both `offers.price` AND a separate `priceSpecification` block. This is redundant but not harmful. |
| 4 | **Missing `vehicleConfiguration`** | MINOR | No trim/variant info (e.g., "LE", "XLE", "SE"). |
| 5 | **Missing `color` / `vehicleInteriorColor`** | MINOR | No color information despite being a common search filter. |
| 6 | **Missing `driveWheelConfiguration`** | MINOR | No FWD/RWD/AWD info. |
| 7 | **Missing `numberOfDoors`, `vehicleSeatingCapacity`** | MINOR | Recommended automotive properties not included. |
| 8 | **Missing `sku` or `vehicleIdentificationNumber`** | WARNING | No unique product identifier. Google recommends at least one identifier (GTIN, MPN, SKU, or VIN). |

### 2.6 Car Listing (FAQPage Schema) -- CRITICAL ISSUE

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **FAQPage is RESTRICTED since August 2023** | CRITICAL | Google restricted FAQPage rich results to **only government and healthcare authority sites**. Mottars.com is neither. This schema will be **completely ignored by Google** and generates no rich results. It is wasted markup. |
| 2 | **Generic FAQ content** | WARNING | The FAQ questions are identical boilerplate across all car listings (not specific to the individual vehicle). Even if FAQPage were supported, this would be thin/duplicate content. |

**Recommendation:** Remove the FAQPage schema entirely. The FAQ content itself is fine for users on the page, but the structured data provides zero SEO value.

### 2.7 BreadcrumbList on Car Listing -- ERRORS

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | **Last item URL uses UUID instead of SEO-friendly slug** | WARNING | Position 4 links to `https://mottars.com/cars/fb502ccb-cc1e-4dbd-a51f-3a392bbb6f1d` but the canonical page URL is `https://mottars.com/cars/toyota-camry-2025-1`. The breadcrumb's final item URL should match the canonical URL of the current page. |

---

## PART 3: MISSING SCHEMA OPPORTUNITIES

### Priority Ranking

| Priority | Schema Type | Page(s) | Impact | Effort |
|----------|------------|---------|--------|--------|
| P0 | Fix placeholder phone / test data | All pages / /cars | CRITICAL | Low |
| P0 | Remove FAQPage schema | Car listing pages | CRITICAL | Low |
| P1 | AutoDealer (LocalBusiness subtype) | Homepage | HIGH | Low |
| P1 | BreadcrumbList | All pages except car listings | HIGH | Low |
| P2 | CollectionPage + ItemList for Blog | /blog | MEDIUM | Low |
| P2 | Enhance Car schema (Vehicle properties) | Car listing pages | MEDIUM | Medium |
| P3 | WebPage schema | All pages | LOW | Low |
| P3 | ItemList with ListItem for /cars (standalone, not inside SearchResultsPage) | /cars | LOW | Low |

---

## PART 4: RECOMMENDED JSON-LD FOR EACH MISSING OPPORTUNITY

### 4.1 [P0] Fix Organization Schema (All Pages)

Replace the existing Organization block with this corrected version:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mottars.com/#organization",
  "name": "Mottars",
  "alternateName": "mottars",
  "url": "https://mottars.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://mottars.com/#logo",
    "url": "https://mottars.com/favicon-512x512.png",
    "contentUrl": "https://mottars.com/favicon-512x512.png",
    "width": 512,
    "height": 512,
    "caption": "Mottars Logo"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://mottars.com/favicon-512x512.png",
    "contentUrl": "https://mottars.com/favicon-512x512.png",
    "caption": "Mottars Logo"
  },
  "description": "Nigeria's trusted automotive marketplace for buying, selling, and renting quality vehicles. Connect with verified dealers and find your perfect car.",
  "email": "info@mottars.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@mottars.com",
    "contactType": "Customer Service",
    "availableLanguage": ["en"],
    "areaServed": "NG"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Victoria Island",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "postalCode": "101241",
    "addressCountry": "NG"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Nigeria"
  },
  "sameAs": [
    "https://facebook.com/mottars",
    "https://twitter.com/mottars",
    "https://www.instagram.com/mottarsofficial_",
    "https://linkedin.com/company/mottars"
  ],
  "knowsAbout": [
    "Automobile Sales",
    "Car Rental",
    "Used Cars",
    "New Cars",
    "Automotive Marketplace",
    "Vehicle Trading"
  ],
  "foundingDate": "2024-01-01",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    }
  },
  "slogan": "Nigeria's Trusted Automotive Marketplace"
}
```

**Changes made:**
- Removed placeholder telephone `+234-XXX-XXX-XXXX` (add it back ONLY when you have a real number)
- Fixed `availableLanguage` from `"en-NG"` to `"en"`
- Removed invalid `@id: "NG"` from Country objects
- Simplified `addressCountry` to the ISO string `"NG"`
- Changed `foundingDate` to full ISO 8601 format

---

### 4.2 [P0] Remove FAQPage Schema from Car Listings

Simply delete the entire FAQPage JSON-LD block from car listing pages. The FAQ content can remain visible on the page for users -- just remove the `<script type="application/ld+json">` block containing `"@type": "FAQPage"`.

---

### 4.3 [P1] AutoDealer Schema (Homepage)

Add this alongside the Organization schema on the homepage. `AutoDealer` is a subtype of `LocalBusiness` specifically designed for automotive businesses. This enables Google's local business rich results and Knowledge Panel features.

```json
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": "https://mottars.com/#autodealer",
  "name": "Mottars",
  "alternateName": "Mottars Automotive Marketplace",
  "url": "https://mottars.com",
  "logo": "https://mottars.com/favicon-512x512.png",
  "image": "https://mottars.com/favicon-512x512.png",
  "description": "Nigeria's trusted automotive marketplace for buying, selling, and renting quality vehicles. Browse verified dealers, compare prices, and find your perfect car.",
  "email": "info@mottars.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Victoria Island",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "postalCode": "101241",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.4281,
    "longitude": 3.4219
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Lagos"
    },
    {
      "@type": "City",
      "name": "Abuja"
    },
    {
      "@type": "City",
      "name": "Ibadan"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "NGN",
  "paymentAccepted": "Bank Transfer, Cash, Split Payments",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://facebook.com/mottars",
    "https://twitter.com/mottars",
    "https://www.instagram.com/mottarsofficial_",
    "https://linkedin.com/company/mottars"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vehicles for Sale",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "New Cars",
        "url": "https://mottars.com/cars?condition=new"
      },
      {
        "@type": "OfferCatalog",
        "name": "Used Cars",
        "url": "https://mottars.com/cars?condition=used"
      },
      {
        "@type": "OfferCatalog",
        "name": "Auto Parts",
        "url": "https://mottars.com/parts"
      }
    ]
  }
}
```

**Note:** Update the `geo` coordinates to Mottars' exact office location. The values above are approximate for Victoria Island, Lagos. Also adjust `openingHoursSpecification` to match actual business hours. If the platform operates 24/7 online, you can omit this or set `opens: "00:00"` / `closes: "23:59"` for all 7 days.

---

### 4.4 [P1] BreadcrumbList Schema (All Pages)

#### Homepage
No breadcrumb needed (it is the root).

#### /cars
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mottars.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Cars for Sale",
      "item": "https://mottars.com/cars"
    }
  ]
}
```

#### /blog
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mottars.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://mottars.com/blog"
    }
  ]
}
```

#### /blog/{slug} (All Blog Posts)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mottars.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://mottars.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{article.headline}}",
      "item": "https://mottars.com/blog/{{article.slug}}"
    }
  ]
}
```

#### /cars/{slug} (Fix Existing BreadcrumbList)

The existing BreadcrumbList on car listing pages has the wrong URL in position 4. Fix it so position 4's `item` matches the canonical URL:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mottars.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Cars",
      "item": "https://mottars.com/cars"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{car.brand}}",
      "item": "https://mottars.com/cars?brand={{car.brand}}"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "{{car.brand}} {{car.model}} {{car.year}}",
      "item": "https://mottars.com/cars/{{car.seoSlug}}"
    }
  ]
}
```

---

### 4.5 [P2] Blog Index -- CollectionPage + ItemList

Add this to `/blog` to tell Google about the blog's structure and enable potential carousel/list rich results:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://mottars.com/blog#webpage",
  "name": "Mottars Blog - Car Buying Guides, Tips & Platform Updates",
  "description": "Read our blog for car buying guides, tips on using Mottars platform, feature updates, and more.",
  "url": "https://mottars.com/blog",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://mottars.com/#website"
  },
  "about": {
    "@type": "Thing",
    "name": "Car Buying in Nigeria"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://mottars.com/blog/buying-cars-in-nigeria-everything-you-need-to-know-in-2025"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://mottars.com/blog/used-cars-for-sale-in-nigeria-how-to-find-quality-vehicles-at-great-prices"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://mottars.com/blog/understanding-mottars-features-messaging-offers-and-more"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://mottars.com/blog/best-cars-for-nigerian-roads-top-reliable-vehicles-in-2025"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://mottars.com/blog/complete-car-buying-guide-what-to-look-for-when-buying-a-used-car-in-nigeria"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "url": "https://mottars.com/blog/car-inspection-checklist-what-to-check-before-buying-any-vehicle"
      },
      {
        "@type": "ListItem",
        "position": 7,
        "url": "https://mottars.com/blog/how-to-upload-your-first-car-listing-on-mottars"
      },
      {
        "@type": "ListItem",
        "position": 8,
        "url": "https://mottars.com/blog/how-to-sign-up-on-mottars-complete-step-by-step-guide"
      }
    ]
  }
}
```

**Implementation note:** This should be dynamically generated from the actual blog post list. The positions and URLs above are based on the current blog content.

---

### 4.6 [P2] Enhanced Blog Post Article Schema

Replace the existing Article schema on blog posts with this enhanced version:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://mottars.com/blog/{{slug}}#article",
  "headline": "{{article.title}}",
  "description": "{{article.metaDescription}}",
  "image": {
    "@type": "ImageObject",
    "url": "{{article.featuredImage}}",
    "width": 1200,
    "height": 630
  },
  "datePublished": "{{article.publishDate}}",
  "dateModified": "{{article.modifiedDate}}",
  "author": {
    "@type": "Organization",
    "name": "Mottars",
    "@id": "https://mottars.com/#organization"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mottars",
    "@id": "https://mottars.com/#organization",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mottars.com/favicon-512x512.png",
      "width": 512,
      "height": 512
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mottars.com/blog/{{slug}}"
  },
  "inLanguage": "en",
  "articleSection": "Car Buying Guides",
  "keywords": ["used cars Nigeria", "car buying guide", "verified dealers"],
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://mottars.com/#website"
  }
}
```

**Example for the audited blog post:**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://mottars.com/blog/used-cars-for-sale-in-nigeria-how-to-find-quality-vehicles-at-great-prices#article",
  "headline": "Used Cars for Sale in Nigeria: How to Find Quality Vehicles at Great Prices",
  "description": "Discover where to find quality used cars in Nigeria. Learn how to identify good deals, avoid scams, and purchase reliable used vehicles from verified dealers on Mottars.",
  "image": {
    "@type": "ImageObject",
    "url": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2025-12-10T08:42:33+01:00",
  "dateModified": "2026-01-13T09:25:32+01:00",
  "author": {
    "@type": "Organization",
    "name": "Mottars",
    "@id": "https://mottars.com/#organization"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mottars",
    "@id": "https://mottars.com/#organization",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mottars.com/favicon-512x512.png",
      "width": 512,
      "height": 512
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mottars.com/blog/used-cars-for-sale-in-nigeria-how-to-find-quality-vehicles-at-great-prices"
  },
  "inLanguage": "en",
  "articleSection": "Car Buying Guides",
  "keywords": [
    "used cars for sale in Nigeria",
    "quality used cars Nigeria",
    "buy used cars Lagos",
    "verified car dealers Nigeria",
    "tokunbo cars for sale"
  ],
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://mottars.com/#website"
  }
}
```

**Changes from current implementation:**
- Changed `@type` from `Article` to `BlogPosting` (more specific, same rich result eligibility)
- Changed author from `{"@type": "Person", "name": "Admin User"}` to the Organization (until real author names are available)
- Made publisher logo consistent with Organization logo (was `logo.svg`, now `favicon-512x512.png`)
- Added `logo.width` and `logo.height` (Google requirement)
- Added `inLanguage`, `articleSection`, `keywords`
- Added `@id` references to link with other schema blocks on the site

---

### 4.7 [P2] Enhanced Car Schema for Individual Listings

Replace the existing Car schema with this more complete version. This is a template -- populate dynamically from listing data:

```json
{
  "@context": "https://schema.org",
  "@type": "Car",
  "@id": "https://mottars.com/cars/{{seoSlug}}#vehicle",
  "name": "{{year}} {{brand}} {{model}}",
  "description": "{{listing.description}}",
  "url": "https://mottars.com/cars/{{seoSlug}}",
  "image": ["{{listing.images[]}}"],
  "brand": {
    "@type": "Brand",
    "name": "{{brand}}"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "{{brand}}"
  },
  "model": "{{model}}",
  "vehicleModelDate": "{{year}}",
  "mileageFromOdometer": {
    "@type": "QuantitativeValue",
    "value": "{{mileage}}",
    "unitCode": "KMT"
  },
  "vehicleTransmission": "{{transmission}}",
  "fuelType": "{{fuelType}}",
  "itemCondition": "https://schema.org/UsedCondition",
  "color": "{{exteriorColor}}",
  "vehicleInteriorColor": "{{interiorColor}}",
  "numberOfDoors": "{{doors}}",
  "vehicleSeatingCapacity": "{{seats}}",
  "driveWheelConfiguration": "{{driveType}}",
  "vehicleEngine": {
    "@type": "EngineSpecification",
    "fuelType": "{{fuelType}}"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "NGN",
    "price": "{{price}}",
    "priceValidUntil": "{{90daysFromNow}}",
    "availability": "https://schema.org/InStock",
    "url": "https://mottars.com/cars/{{seoSlug}}",
    "itemCondition": "https://schema.org/UsedCondition",
    "seller": {
      "@type": "AutoDealer",
      "name": "{{dealer.name}}",
      "telephone": "{{dealer.phone}}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "{{dealer.city}}",
        "addressCountry": "NG"
      }
    }
  },
  "availableAtOrFrom": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "{{listing.city}}",
      "addressRegion": "{{listing.state}}",
      "addressCountry": "NG"
    }
  }
}
```

**Key improvements:**
- Added `manufacturer`, `color`, `vehicleInteriorColor`, `numberOfDoors`, `vehicleSeatingCapacity`, `driveWheelConfiguration`, `vehicleEngine`
- Changed seller type from generic `Organization` to `AutoDealer`
- Removed fabricated `productionDate`
- Removed redundant `priceSpecification` block
- Capitalized `addressLocality` properly
- Added `@id` for cross-referencing

---

### 4.8 [P2] /cars ItemList Enhancement

The existing ItemList inside `SearchResultsPage` works but can be improved. Consider separating it as a standalone block and upgrading item types:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://mottars.com/cars#itemlist",
  "name": "Cars for Sale on Mottars",
  "description": "Browse verified car listings on Nigeria's trusted automotive marketplace.",
  "numberOfItems": "{{totalCount}}",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://mottars.com/cars/{{slug}}",
      "item": {
        "@type": "Car",
        "@id": "https://mottars.com/cars/{{slug}}#item",
        "name": "{{year}} {{brand}} {{model}}",
        "url": "https://mottars.com/cars/{{slug}}",
        "image": "{{imageUrl}}",
        "brand": {
          "@type": "Brand",
          "name": "{{brand}}"
        },
        "model": "{{model}}",
        "vehicleModelDate": "{{year}}",
        "itemCondition": "https://schema.org/UsedCondition",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "NGN",
          "price": "{{price}}",
          "availability": "https://schema.org/InStock"
        }
      }
    }
  ]
}
```

**Critical:** Filter out test/dummy listings before they enter the schema. Implement server-side validation to ensure only real listings with valid names and reasonable prices are included in the structured data.

---

### 4.9 [P3] WebPage Schema (All Pages)

Add a basic WebPage schema to every page for completeness. This helps Google understand page relationships:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mottars.com/cars#webpage",
  "url": "https://mottars.com/cars",
  "name": "Cars for Sale | Mottars",
  "description": "Browse thousands of cars for sale on Mottars. Nigeria's trusted automotive marketplace.",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://mottars.com/#website"
  },
  "about": {
    "@type": "Thing",
    "name": "Cars for Sale in Nigeria"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://mottars.com/#organization"
  }
}
```

---

## PART 5: IMPLEMENTATION PRIORITY ROADMAP

### Phase 1 -- Critical Fixes (Do Immediately)

| Task | Impact | Effort |
|------|--------|--------|
| Remove placeholder phone number `+234-XXX-XXX-XXXX` from Organization schema or replace with real number | Prevents spam flags | 5 minutes |
| Remove FAQPage schema from all car listing pages | Removes deprecated/restricted markup | 10 minutes |
| Clean test data from /cars ItemList (filter listings with gibberish names or unrealistic prices) | Prevents Google data quality penalties | 30 minutes (server-side filter) |
| Fix `availableLanguage` from `"en-NG"` to `"en"` in Organization | Schema validation | 5 minutes |
| Fix `addressCountry` `@id` values | Schema validation | 5 minutes |

### Phase 2 -- High-Impact Additions (This Week)

| Task | Impact | Effort |
|------|--------|--------|
| Add AutoDealer schema to homepage | Enables local business rich results and Knowledge Panel | 30 minutes |
| Add BreadcrumbList to /cars, /blog, and all blog posts | Enables breadcrumb rich results in SERPs | 1-2 hours |
| Fix BreadcrumbList on car listings (correct final URL) | Fixes existing breadcrumb rich result | 15 minutes |
| Upgrade Article to BlogPosting with enhanced properties | Better article rich results | 1 hour |

### Phase 3 -- Enrichment (This Month)

| Task | Impact | Effort |
|------|--------|--------|
| Add CollectionPage + ItemList to /blog | Blog carousel potential in SERPs | 30 minutes |
| Enhance Car schema with full vehicle properties | Richer vehicle rich results | 2-3 hours (requires data availability) |
| Upgrade /cars ItemList items from Product to Car type | Better semantic accuracy | 1 hour |
| Add WebPage schema to all page templates | Complete schema graph | 1 hour |
| Make publisher logo consistent across all schema blocks | Data consistency | 15 minutes |

### Phase 4 -- Future Opportunities (When Data Available)

| Task | Impact | Effort |
|------|--------|--------|
| Add AggregateRating to Car listings (once reviews are collected) | Star ratings in SERPs | 2 hours |
| Add Review schema to individual verified dealer profiles | Trust signals in search | 2 hours |
| Add SpeakableSpecification to blog posts | Voice search optimization | 1 hour |
| Add Vehicle schema with VIN for verified listings | Maximum automotive rich result eligibility | Depends on data |

---

## PART 6: SUMMARY SCORECARD

| Page | Current Schema | Errors | Missing | Score |
|------|---------------|--------|---------|-------|
| Homepage | Organization, WebSite | 4 warnings | AutoDealer, WebPage | 6/10 |
| /cars | Organization, SearchResultsPage+ItemList | 6 errors (test data critical) | BreadcrumbList, WebPage, Car type upgrade | 4/10 |
| /blog | Organization only | 0 (nothing to validate) | CollectionPage, ItemList, BreadcrumbList, WebPage | 2/10 |
| /blog/{slug} | Organization, Article | 5 warnings | BreadcrumbList, BlogPosting upgrade, WebPage | 5/10 |
| /cars/{slug} | Organization, Car, BreadcrumbList, FAQPage | 3 errors (FAQPage critical) | Enhanced vehicle properties, WebPage | 6/10 |
| **Overall Site** | | **18 issues total** | **11 opportunities** | **4.6/10** |

---

## APPENDIX: Quick Reference -- Schema Types NOT to Use

| Type | Reason |
|------|--------|
| HowTo | Rich results removed September 2023 |
| SpecialAnnouncement | Deprecated July 31, 2025 |
| FAQPage | Restricted to government/healthcare sites since August 2023 (CURRENTLY ON SITE -- REMOVE) |
| CourseInfo, EstimatedSalary, LearningVideo | Retired June 2025 |
