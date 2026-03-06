# Mottars.com SEO Action Plan

*Generated: 2026-03-05 | Current Score: 38/100*

---

## Week 1: Emergency Fixes (38 → 55)

These 7 fixes are **blocking all organic growth**. None require design changes — all are config/code-level.

### Day 1-2: Sitemap & Redirects
- [ ] **Fix sitemap domain**: Change `mottars.ng` → `mottars.com` in sitemap generation code (likely Next.js config or next-sitemap). Corrected sitemap XML available at `marketing/research/mottars-corrected-sitemap.xml`
- [ ] **Fix XML encoding**: Escape all `&` as `&amp;` in image URLs
- [ ] **Change 307 → 301**: Update the non-www to www redirect from temporary (307) to permanent (301) in server/hosting config

### Day 2-3: Canonical & Indexing
- [ ] **Resolve canonical domain**: Decide www vs non-www. Update ALL canonical tags to match the serving domain (likely `https://www.mottars.com`)
- [ ] **Add canonical tag** to /blog page (currently missing)
- [ ] **Remove `/login` and `/register`** from sitemap, add `<meta name="robots" content="noindex">` to both

### Day 3-4: Data Cleanup
- [ ] **Remove test listings**: Delete or unpublish these from the database:
  - `libero-id-eligendi-c-voluptatum-commodi-i-1904` (Lorem ipsum)
  - `nskznjkj-kscjz-2025` (keyboard mash)
  - `tesla-tesla-2025` (duplicate brand)
  - `nissan-chevrolet-2025` (mixed brands)
  - `suv-honda-2022` (body type as brand)
- [ ] **Add all 9 blog URLs** to sitemap
- [ ] **Fix placeholder phone**: Replace `+234-XXX-XXX-XXXX` in Organization schema with real number or remove field

---

## Week 2: On-Page Optimization (55 → 65)

### Title Tags (fix all)
- [ ] Homepage: `"Buy Cars, Parts & Repairs in Nigeria | Mottars"` (48 chars)
- [ ] /cars: `"Cars for Sale in Nigeria — Verified Dealers | Mottars"` (52 chars)
- [ ] /blog: `"Car Buying Tips & Guides Nigeria | Mottars Blog"` (48 chars)
- [ ] Blog posts: Trim to under 60 chars, single brand mention

### H1 Tags
- [ ] /cars: Add `<h1>Cars for Sale in Nigeria</h1>`
- [ ] /blog: Add `<h1>Car Buying Tips & Guides</h1>`
- [ ] Homepage: Consider changing to include keywords (e.g., "Buy Verified Cars in Nigeria")

### Quick Content Fixes
- [ ] Replace "Admin User" author with real person name + bio
- [ ] Add publication dates that show editorial cadence (not all Dec 10, 2025)
- [ ] Update copyright from "2025" to "2026"
- [ ] Convert OG image from SVG to PNG/JPG (1200x630px)
- [ ] Remove FAQPage schema from car listing pages (deprecated for non-gov sites)

---

## Month 1: Content & Schema (65 → 75)

### Schema Enhancements
- [ ] Add BreadcrumbList schema to /cars, /blog, and all blog posts
- [ ] Add AutoDealer (LocalBusiness subtype) schema to homepage
- [ ] Upgrade Article → BlogPosting on blog posts with full author info
- [ ] Add enhanced Car properties (color, doors, seating, drive type)
- [ ] Remove Organization schema duplication (only needed on homepage)

### Content Improvements
- [ ] Add 200-word SEO intro text above car listings on /cars
- [ ] Expand FAQ sections from 3 to 10+ questions per article
- [ ] Add external links to authoritative sources (NCC, FRSC, NCS)
- [ ] Add internal cross-links between related blog posts
- [ ] Create /about page (company story, team, Victoria Island address)
- [ ] Create /contact page (email, phone, address, map embed)

### Image Optimization
- [ ] Add descriptive alt text to all car listing images
- [ ] Replace stock Unsplash photo used across 13 different car listings
- [ ] Audit partner page images for unique, real business photos

### Technical
- [ ] Set Cache-Control to short TTL (5 min) instead of no-cache
- [ ] Audit 30 auto-repair partner pages — keep real businesses, remove seed data
- [ ] Fix partner pages with UUID slugs

---

## Quarter 1: Strategic Growth (75 → 85+)

### Programmatic SEO
- [ ] Create city landing pages: /cars/lagos, /cars/abuja, /cars/ibadan
- [ ] Create brand landing pages: /cars/toyota, /cars/honda, /cars/mercedes
- [ ] Launch programmatic templates: `[Brand] [Model] Price in Nigeria 2026` (200+ pages)
- [ ] Launch programmatic templates: `Tokunbo [Brand] for Sale in [City]` (300+ pages)

### Authority Building
- [ ] Produce original Nigerian car market data (quarterly price report)
- [ ] Build import duty calculator (free tool, high search volume)
- [ ] Build car affordability calculator (salary → budget)
- [ ] Implement review/rating system with AggregateRating schema

### AI Search Optimization
- [ ] Add llms.txt file
- [ ] Configure AI crawler rules (GPTBot, ClaudeBot, PerplexityBot)
- [ ] Add "Quick Answer" summary boxes to all blog posts
- [ ] Add HowTo schema to guide-style content
- [ ] Build author expertise profile pages

---

## How to Track Progress

Re-run `/seo-audit` monthly to measure score improvement. Key metrics:
- Google Search Console: Impressions, clicks, indexed pages, coverage errors
- Sitemap: Pages submitted vs. indexed (should be 100% after P0 fixes)
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Blog traffic: Organic sessions to /blog/* pages
- Dealer signups: Attributed to content/organic channel
