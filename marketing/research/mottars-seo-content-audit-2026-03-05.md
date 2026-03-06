# Mottars.com Comprehensive SEO & Content Quality Audit
**Date:** 2026-03-05
**Auditor:** Claude (Automated)
**Scope:** Homepage, /cars, /blog, /blog/used-cars-for-sale article, technical infrastructure

---

## EXECUTIVE SUMMARY

Mottars.com has a solid Next.js foundation with good server-side rendering, strong security headers, and proper schema markup. However, **5 critical issues** are actively preventing search visibility and could be losing significant organic traffic:

1. **SITEMAP POINTS TO WRONG DOMAIN** (mottars.ng instead of mottars.com)
2. **REDIRECT CHAIN** on every page load (non-www -> www via 307)
3. **BLOG PAGES MISSING FROM SITEMAP** entirely
4. **TEST/LOREM IPSUM DATA** in live sitemap and listings
5. **CANONICAL vs. SERVING DOMAIN MISMATCH** (canonical=mottars.com, served from www.mottars.com)

**Overall Score: 52/100** (Failing on critical technical fundamentals, good content foundation)

---

## SECTION 1: PAGE-BY-PAGE ANALYSIS

### 1.1 /cars (Main Listing Page)

| Element | Finding | Severity |
|---------|---------|----------|
| **Title Tag** | "Cars for Sale \| Mottars" (26 chars) | OK - concise but could include "Nigeria" |
| **Meta Description** | "Browse thousands of cars for sale on Mottars. Nigeria's trusted automotive marketplace, connecting buyers, renters, and dealers." (127 chars) | GOOD - keyword-rich, actionable |
| **H1 Tag** | **MISSING** - No H1 detected | CRITICAL |
| **OG Image** | Uses logo.svg | HIGH - Social platforms need PNG/JPG |
| **Canonical** | https://mottars.com/cars (non-www) | ISSUE - served from www.mottars.com |
| **Schema** | Organization + SearchResultsPage + ItemList (20 products) | GOOD |
| **robots** | index, follow | OK |

**Content Issues:**
- No introductory text above listings (thin content risk for category page)
- No keyword-rich description explaining what the page offers
- H3 tags used for car titles but no H1 or H2 for the page topic
- "Oops! This page took a wrong turn" H2 visible (404 fallback text rendering on valid page)
- Test data listings visible: "nskznjkj" and "libero-id-eligendi" slugs
- 20 listings shown from 33 total with pagination

**Image Issues:**
- Most product images lack explicit alt attributes
- Images come from Unsplash (stock) and AWS S3 (real uploads) -- mixed quality signal
- No lazy loading indicators visible

**Positive:**
- Comprehensive filter sidebar (brand, price, mileage, transmission, fuel, condition, split payment)
- Proper Product schema for each listing with pricing in NGN
- Pagination present (2 pages)

**Recommendations:**
1. Add an H1: "Cars for Sale in Nigeria" or "Buy Cars in Nigeria - New & Used Vehicles"
2. Add 100-200 words of introductory SEO text above listings
3. Include "Nigeria" in title tag: "Cars for Sale in Nigeria | Mottars"
4. Remove test data listings immediately
5. Add descriptive alt text to all vehicle images
6. Convert OG image to PNG/JPG format

---

### 1.2 /blog (Blog Index Page)

| Element | Finding | Severity |
|---------|---------|----------|
| **Title Tag** | "Blog \| Mottars - Car Buying Guides, Tips & Platform Updates \| Mottars" (72 chars) | HIGH - Too long (over 60 chars), brand duplicated |
| **Meta Description** | "Read our blog for car buying guides, tips on using Mottars platform, feature updates, and more. Learn how to sign up, upload cars, and make the most of our features." (166 chars) | WARNING - Slightly over 160 char ideal |
| **H1 Tag** | **MISSING** - No H1 present | CRITICAL |
| **OG Image** | Not specified in metadata | HIGH - Missing entirely |
| **OG tags** | Incomplete (og:type, og:url missing) | HIGH |
| **Twitter Image** | banner.svg | HIGH - SVG not supported by Twitter |
| **Canonical** | **MISSING** - No canonical tag found | CRITICAL |
| **Schema** | Organization only (no BlogPosting or CollectionPage) | MEDIUM |

**Content Structure:**
- 8 blog articles total + 5 YouTube video embeds
- ALL articles dated December 10, 2025 (looks like bulk publish / launch day content)
- No individual author attribution on any post
- 32 topic tags available for filtering
- "More Posts" section with H2 heading
- Article titles appear in H3 and H4 (inconsistent hierarchy)

**E-E-A-T Issues:**
- No author names or bios on any post
- No expertise indicators
- All content published same day (no editorial cadence)
- No comments or engagement signals

**Recommendations:**
1. Add a canonical tag immediately
2. Fix title: "Car Buying Guides & Tips | Mottars Blog" (under 60 chars)
3. Add an H1: "Mottars Blog: Car Buying Guides for Nigerian Drivers"
4. Add OG image (PNG/JPG, 1200x630px)
5. Add BlogPosting or CollectionPage schema
6. Add author names and bios to demonstrate expertise
7. Stagger publish dates or add new content regularly
8. Fix heading hierarchy (H3/H4 mix for same-level items)

---

### 1.3 /blog/used-cars-for-sale-in-nigeria (Article Page)

| Element | Finding | Severity |
|---------|---------|----------|
| **Title Tag** | "Used Cars for Sale in Nigeria \| Quality Vehicles at Great Prices \| Mottars Blog \| Mottars" (91 chars) | CRITICAL - Way too long (91 chars, limit ~60), brand duplicated |
| **Meta Description** | "Find quality used cars for sale in Nigeria. Browse verified listings, compare prices, and buy from trusted dealers..." (148 chars) | GOOD - keyword-rich, CTA included |
| **H1 Tag** | "Used Cars for Sale in Nigeria: How to Find Quality Vehicles at Great Prices" | GOOD - keyword-rich, specific |
| **OG Image** | Unsplash photo (PNG, 1200x630) | GOOD - proper format and size |
| **OG Type** | "article" | GOOD |
| **Canonical** | Full URL present | GOOD |
| **Schema** | Article + Organization | GOOD |

**Content Quality Assessment:**
- Word count: ~2,200-2,500 words (good depth for target keyword)
- 15 H2 sections covering full buying journey
- Well-structured with H2 > H3 hierarchy
- Nigerian Naira pricing included (local relevance)
- City-specific content (Lagos, Abuja, Port Harcourt)
- FAQ section with 3 questions (could expand)
- Related articles section (3 articles linked)
- Breadcrumb navigation present

**E-E-A-T Analysis:**
| Signal | Present? | Quality |
|--------|----------|---------|
| Author name | Yes | LOW - "Admin User" is generic |
| Author bio | No | MISSING |
| Author credentials | No | MISSING |
| Publish date | Yes | OK - Dec 10, 2025 |
| Modified date | Yes | GOOD - Jan 13, 2026 |
| Citations/sources | No | MISSING |
| External links | No | MISSING (no outbound authority links) |
| Comments | No | MISSING |
| Social proof | No | MISSING |

**Internal Linking:**
- 8+ internal links (mostly CTAs to /cars)
- Links to 3 related articles
- Category and tag links present
- No contextual deep links to specific car listing pages

**Recommendations:**
1. Fix title: "Used Cars for Sale in Nigeria | Find Quality Vehicles | Mottars" (under 60 chars)
2. Replace "Admin User" with a real author name + bio + photo
3. Add external links to authoritative sources (FRSC, Nigeria customs, etc.)
4. Add explicit Table of Contents widget (have headings, just need the TOC)
5. Expand FAQ section to 8-10 questions (target featured snippets)
6. Add contextual links to actual car listings on Mottars
7. Add structured FAQ schema for Common Questions section

---

## SECTION 2: CRITICAL TECHNICAL ISSUES

### 2.1 SITEMAP DOMAIN MISMATCH [CRITICAL]

**Finding:** The sitemap at `https://www.mottars.com/sitemap.xml` contains 94 URLs all pointing to `https://mottars.ng` -- a DIFFERENT DOMAIN.

```
<loc>https://mottars.ng</loc>
<loc>https://mottars.ng/cars</loc>
<loc>https://mottars.ng/rentals</loc>
...all 94 URLs use mottars.ng
```

**Impact:** Google is being told to index `mottars.ng` instead of `mottars.com`. This effectively makes the entire sitemap useless and may be causing Google to not discover or index the correct URLs.

**Fix:** Update sitemap generation to use `https://mottars.com` (or `https://www.mottars.com` -- see canonical issue below).

### 2.2 REDIRECT CHAIN [HIGH]

**Finding:** Every page request follows a redirect chain:

```
http://mottars.com  -> 308 -> https://mottars.com  -> 307 -> https://www.mottars.com
```

The non-www to www redirect uses a **307 Temporary Redirect** instead of a **301 Permanent Redirect**.

**Impact:**
- 307 does NOT pass full link equity (PageRank) to the destination
- Search engines may continue trying to index the non-www version
- Extra hop adds ~150ms latency to every first visit
- The 307 status tells Google this redirect is temporary, undermining domain consolidation

**Fix:**
1. Change the non-www -> www redirect from 307 to 301
2. OR eliminate the redirect by serving directly from one domain
3. Ensure robots.txt sitemap directive matches: currently `Sitemap: https://mottars.com/sitemap.xml` (non-www, which then redirects)

### 2.3 CANONICAL vs. WWW MISMATCH [HIGH]

**Finding:** Pages are served from `www.mottars.com` but canonical tags point to `mottars.com` (non-www).

```
Served from:  https://www.mottars.com/cars
Canonical:    https://mottars.com/cars
```

**Impact:** Google sees conflicting signals -- the server says "www is the real URL" but the canonical says "non-www is preferred." This can cause:
- Split indexing (some pages indexed as www, others as non-www)
- Diluted link equity between two versions
- Crawl budget waste

**Fix:** Choose ONE canonical domain and make everything consistent:
- If canonical = `mottars.com`, then redirect www -> non-www (not the current direction)
- If canonical = `www.mottars.com`, update all canonical tags to use www
- Recommendation: Use `mottars.com` (shorter, cleaner) and redirect www -> non-www

### 2.4 BLOG PAGES MISSING FROM SITEMAP [HIGH]

**Finding:** The sitemap contains 94 URLs but ZERO blog URLs. All 8+ blog articles are completely absent.

**Impact:** Google has no sitemap signal to discover blog content. Blog articles targeting competitive keywords like "used cars for sale in Nigeria" may take much longer to get indexed, or may not be indexed at all.

**Fix:** Add all blog URLs to the sitemap with proper lastmod dates.

### 2.5 TEST/PLACEHOLDER DATA IN PRODUCTION [HIGH]

**Finding:** At least 2 URLs with test data appear in the live sitemap and car listings:

```
https://mottars.ng/cars/libero-id-eligendi-c-voluptatum-commodi-i-1904  (Lorem ipsum)
https://mottars.ng/cars/nskznjkj-kscjz-2025  (keyboard mash)
```

**Impact:**
- Wastes crawl budget
- Makes the site look unprofessional to Google's quality raters
- Could trigger spam signals
- These pages may be indexed and appear in search results

**Fix:** Remove all test listings from the database and regenerate the sitemap.

### 2.6 PARTNER PAGE QUALITY CONCERN [MEDIUM]

**Finding:** 47 partner/workshop pages in the sitemap, many with auto-generated names:

```
auto-repair-30-1772373637087
auto-repair-29-1772373636362
...down to auto-repair-1-...
```

One partner page uses a raw UUID as its slug: `aa30c219-6e72-4d2e-8b72-358428e7b644`

**Impact:** These look like auto-generated test data. If indexed, they create thin content pages that dilute site quality.

**Fix:** Audit all partner pages. Remove test data, ensure real partner pages have unique content.

---

## SECTION 3: SECURITY HEADERS ANALYSIS

The site (www.mottars.com) has **excellent security headers** -- one of the strongest areas of the audit.

| Header | Value | Rating |
|--------|-------|--------|
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | EXCELLENT |
| **Content-Security-Policy** | Full CSP with restricted sources | EXCELLENT |
| **X-Content-Type-Options** | `nosniff` | GOOD |
| **X-Frame-Options** | `DENY` | GOOD |
| **X-XSS-Protection** | `1; mode=block` | GOOD (legacy but present) |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | GOOD |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | GOOD |

**CSP Detail:** The Content-Security-Policy is well-configured:
- `default-src 'self'`
- Script sources limited to self, Google, Vercel
- Frame sources limited to Google and YouTube
- `object-src 'none'` (blocks Flash/plugins)
- `upgrade-insecure-requests` enabled
- `frame-ancestors 'none'` (prevents clickjacking)

**One concern:** `script-src` includes `'unsafe-eval'` and `'unsafe-inline'` -- these weaken CSP but are commonly required by Next.js.

---

## SECTION 4: PAGE SPEED INDICATORS

| Indicator | Finding | Concern Level |
|-----------|---------|---------------|
| **JS Bundles** | 13 script tags loaded on homepage | HIGH |
| **JS Loading** | All scripts use `async=""` attribute | GOOD |
| **Font Preloading** | 2 custom fonts preloaded (Avenir Roman, woff2 + woff) | GOOD |
| **External CSS** | LineIcons CDN loaded via preload | OK |
| **TTFB** | ~285ms (non-www, before redirect) | MODERATE |
| **SSL Handshake** | ~164ms | NORMAL |
| **Cache-Control** | `private, no-cache, no-store, max-age=0` on HTML | CONCERN - no HTML caching |
| **Vercel Cache** | MISS on tested pages | Not being served from edge cache |
| **Turbopack** | `turbopack-*.js` present (Next.js dev bundler) | WARNING - verify this is production build |

**Concerns:**
1. 13 JS chunks is on the higher end. While code splitting is good, each chunk is a separate HTTP request.
2. `cache-control: private, no-cache` on HTML means every page visit hits the origin server.
3. Turbopack reference in production could indicate a development build leaked to production. Should be verified.
4. No visible image optimization (next/image component) indicators on car listing photos.

---

## SECTION 5: AI SEARCH READINESS ASSESSMENT

AI search engines (Google AI Overviews, Perplexity, ChatGPT Search) prioritize content that is:

### 5.1 Structured for Citation

| Criterion | Status | Notes |
|-----------|--------|-------|
| Clear factual statements | PARTIAL | Price ranges are clear and citable. General advice is less so. |
| Question-answer format | YES | FAQ section in blog article with 3 Q&As |
| Numbered/bulleted lists | YES | Multiple lists throughout articles |
| Data points and statistics | WEAK | No original data, no surveys, no market statistics |
| Named entities | PARTIAL | Brand names and cities mentioned, but not as structured entity definitions |

### 5.2 Entity Definitions

| Entity | Defined? | Notes |
|--------|----------|-------|
| Mottars (company) | YES | Organization schema with founding date, location, services |
| Vehicle listings | YES | Product schema with name, price, availability |
| Blog articles | YES | Article schema with author, dates |
| Geographic coverage | PARTIAL | Lagos, Abuja mentioned but no LocalBusiness schema per city |
| Service categories | WEAK | Not defined as structured entities |

### 5.3 Brand Consistency

| Signal | Status |
|--------|--------|
| Brand name in titles | YES - but duplicated in some |
| Brand name in meta descriptions | YES |
| Brand name in schema | YES |
| Consistent URL structure | NO - mottars.com vs mottars.ng vs www.mottars.com |
| Brand name in content | MODERATE - could be more prominent |

### 5.4 AI Readiness Score: 45/100

**Major gaps for AI citation:**
1. No original research or data (AI engines prefer citable statistics)
2. No author expertise signals (AI evaluates source credibility)
3. No external citations (AI looks for well-sourced content)
4. Domain confusion (mottars.com vs mottars.ng) undermines entity clarity
5. FAQ section too small (expand to capture more question-intent queries)

**Recommendations for AI search:**
1. Create original market data (average car prices by model in Nigeria, price trends)
2. Add expert author profiles with automotive credentials
3. Link to authoritative external sources (FRSC, NADDC, NCS)
4. Expand FAQ sections to 10+ questions per article
5. Add "Key Takeaways" or "Quick Answer" boxes at the top of articles
6. Implement HowTo schema for step-by-step guides
7. Create definition-style content ("What is a Nigerian Used car?", "What is split payment?")

---

## SECTION 6: CROSS-CUTTING ISSUES

### 6.1 Issues Affecting ALL Pages

| Issue | Impact | Priority |
|-------|--------|----------|
| OG images use SVG format | Social sharing cards break on Facebook, LinkedIn, WhatsApp | HIGH |
| Brand name duplicated in titles ("...Mottars \| Mottars") | Wastes title tag characters, looks spammy | HIGH |
| Copyright year says 2025 | Signals abandonment to users | LOW |
| Blog dates all Dec 10, 2025 | No freshness signals since launch | MEDIUM |
| Empty testimonials section on homepage | Wastes prime real estate, hurts trust | MEDIUM |
| No breadcrumbs on /cars or /blog index | Lost navigation schema opportunity | MEDIUM |
| No favicon diversity (only .ico and .png) | Missing apple-touch-icon, web manifest | LOW |

### 6.2 Missing Pages/Content

| Gap | SEO Impact |
|-----|------------|
| No /about page | Missing brand trust signal, E-E-A-T deficit |
| No /contact page | Missing NAP (Name, Address, Phone) consistency |
| No individual brand pages (/cars/toyota, /cars/honda) | Missing mid-funnel keyword targets |
| No city-specific pages (/cars/lagos, /cars/abuja) | Missing local SEO opportunities |
| No /how-it-works page | Missing conversion and brand trust content |
| No FAQ page | Missing featured snippet opportunities |

---

## SECTION 7: PRIORITIZED ACTION PLAN

### P0 - Fix Immediately (This Week)

1. **Fix sitemap domain** - Change all URLs from `mottars.ng` to `mottars.com` (or chosen canonical domain)
2. **Add blog URLs to sitemap** - All 8+ articles should be in the sitemap
3. **Fix redirect: 307 -> 301** - Change non-www to www redirect from temporary to permanent
4. **Remove test data** - Delete "libero-id-eligendi" and "nskznjkj" listings
5. **Add missing canonical tag** to /blog page

### P1 - Fix This Month

6. **Resolve canonical domain** - Decide www vs non-www, make ALL signals consistent (canonicals, sitemap, redirects, internal links)
7. **Fix all title tags** - Remove brand duplication, keep under 60 chars
8. **Add missing H1 tags** - /cars and /blog both lack H1s
9. **Convert OG images** - All social images must be PNG or JPG (not SVG)
10. **Fix blog author** - Replace "Admin User" with real person name
11. **Audit and clean partner pages** - Remove auto-generated test partners

### P2 - Fix This Quarter

12. **Add introductory SEO text** to /cars listing page
13. **Add alt text** to all vehicle and blog images
14. **Add breadcrumb schema** to /cars and /blog
15. **Expand FAQ sections** in blog articles (target 10+ questions)
16. **Add external authority links** to blog articles
17. **Create /about and /contact pages**
18. **Add BlogPosting schema** to blog index and article pages
19. **Implement HowTo schema** for guide articles
20. **Update copyright year** to 2026

### P3 - Strategic Improvements

21. **Create programmatic city pages** (/cars/lagos, /cars/abuja, etc.)
22. **Create brand landing pages** (/cars/toyota, /cars/honda, etc.)
23. **Produce original market data** for AI citation
24. **Build author expertise pages** with automotive credentials
25. **Implement review/rating schema** on car listing pages
26. **Add a dedicated FAQ page** targeting common Nigerian car buying questions

---

## APPENDIX: Raw Data

### Response Headers (www.mottars.com)
```
HTTP/2 200
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.lineicons.com; img-src 'self' data: blob: https: http:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google.com https://www.google-analytics.com https://vercel.live wss://ws-*.pusher.com https://sockjs-*.pusher.com https://www.youtube.com; frame-src 'self' https://www.google.com https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
x-xss-protection: 1; mode=block
```

### Redirect Chain
```
http://mottars.com   --308-->  https://mottars.com   --307-->  https://www.mottars.com
```

### Sitemap Stats
- Total URLs: 94
- Domain used: mottars.ng (WRONG)
- Blog URLs: 0 (MISSING)
- Car listings: ~41
- Partner pages: ~47
- Test data URLs: 2 confirmed
