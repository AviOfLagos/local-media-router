# Mottars.com — Full SEO Audit Report

*Date: 2026-03-05 | Audited by: Claude Code SEO Suite*

---

## Executive Summary

### SEO Health Score: 38/100 🔴

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 30/100 | 7.5 |
| Content Quality | 25% | 55/100 | 13.8 |
| On-Page SEO | 20% | 40/100 | 8.0 |
| Schema / Structured Data | 10% | 46/100 | 4.6 |
| Performance (CWV) | 10% | 50/100 | 5.0 |
| Images | 5% | 35/100 | 1.8 |
| AI Search Readiness | 5% | 45/100 | 2.3 |
| **TOTAL** | **100%** | | **38/100** |

### Business Type Detected
**Automotive Marketplace** — Two-sided marketplace connecting car buyers with verified dealers across Nigeria. Features vehicle listings, auto parts, and mechanic services.

### Top 5 Critical Issues
1. 🚨 **Sitemap points to wrong domain** (`mottars.ng` instead of `mottars.com`) — every URL rejected by Google
2. 🚨 **307 temporary redirect** instead of 301 — link equity not passing between www/non-www
3. 🚨 **Canonical vs. serving domain mismatch** — pages served from `www.mottars.com` but canonicals point to `mottars.com`
4. 🚨 **Test/placeholder data in production** — Lorem Ipsum car listings visible to Google
5. 🚨 **All 9 blog pages missing from sitemap** — highest-value SEO content undiscoverable

### Top 5 Quick Wins
1. ✅ Fix sitemap domain → instant crawl improvement (same-day deploy)
2. ✅ Add blog URLs to sitemap → 9 SEO pages discoverable by Google
3. ✅ Fix title tags (remove brand duplication, under 60 chars) → better CTR
4. ✅ Add H1 tags to /cars and /blog → on-page keyword signals
5. ✅ Replace placeholder phone number in schema → stop serving spam data to Google

---

## 1. Technical SEO (30/100)

### Crawlability

| Check | Status | Details |
|-------|--------|---------|
| robots.txt | ✅ Good | Properly blocks /api/, /admin/, /dashboard/, etc. |
| Sitemap exists | ✅ Yes | 94 URLs at /sitemap.xml |
| Sitemap domain | 🚨 CRITICAL | ALL 94 URLs use `mottars.ng` instead of `mottars.com` |
| Sitemap XML validity | 🚨 CRITICAL | 66 unescaped ampersands make XML invalid |
| Blog in sitemap | 🚨 CRITICAL | 0 of 9 blog pages included |
| Login/register in sitemap | ⚠️ Issue | Auth pages shouldn't be in sitemap |
| Test data in sitemap | 🚨 CRITICAL | 5 fake car listings indexed |

### Indexability

| Check | Status | Details |
|-------|--------|---------|
| Meta robots | ✅ Good | `index, follow` on all public pages |
| Googlebot directives | ✅ Good | `max-video-preview:-1, max-image-preview:large, max-snippet:-1` |
| Canonical tags | ⚠️ Mixed | Present on homepage, MISSING on /blog |
| www vs non-www | 🚨 CRITICAL | Canonical says `mottars.com`, pages served from `www.mottars.com` |

### Redirect Chain

```
http://mottars.com
  → 308 (permanent) → https://mottars.com
    → 307 (TEMPORARY) → https://www.mottars.com  ← PROBLEM
```

**Impact**: The 307 temporary redirect does NOT pass full link equity. Google may indefinitely index the non-www version. Must be changed to 301.

### Security Headers ✅ EXCELLENT

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains; preload | ✅ |
| Content-Security-Policy | Full restrictive policy | ✅ |
| X-Content-Type-Options | nosniff | ✅ |
| X-Frame-Options | DENY | ✅ |
| Referrer-Policy | strict-origin-when-cross-origin | ✅ |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | ✅ |

Security is the strongest area of the entire audit.

---

## 2. Content Quality (55/100)

### Homepage Content
- **H1**: "Premium Cars. Simple Experience." — Generic, doesn't contain target keywords
- **Statistics**: 35 cars listed, 9 for resale, 2 sold — good transparency
- **Feature sections**: Well-structured (verified dealers, offers, split payments, request-a-car, history reports, support)
- **Testimonials**: Section exists but is EMPTY — damages social proof
- **Blog preview**: 3 articles shown — good internal linking

### Blog Content (8 articles)
- All published on Dec 10, 2025 — no editorial cadence (looks like bulk upload)
- Author: "Admin User" on all posts — generic placeholder that kills E-E-A-T
- Best article: "Used Cars for Sale in Nigeria" (~2,200 words, well-structured, 15 H2s)
- No external links to authoritative sources on any article
- FAQ sections too small (only 3 questions each)
- No original data, statistics, or cited research

### E-E-A-T Assessment

| Signal | Score | Issue |
|--------|-------|-------|
| Experience | 3/10 | No customer stories, case studies, or first-hand accounts |
| Expertise | 4/10 | "Admin User" author has zero credibility signals |
| Authoritativeness | 3/10 | No external citations, no original data, no industry partnerships mentioned |
| Trustworthiness | 6/10 | Verified dealer messaging is strong, but test data undermines it |

### Missing Content Pages
- No `/about` page
- No `/contact` page
- No `/faq` page
- No city-specific pages (/cars/lagos, /cars/abuja)
- No brand-specific pages (/cars/toyota, /cars/honda)

---

## 3. On-Page SEO (40/100)

### Title Tags

| Page | Title | Length | Issues |
|------|-------|--------|--------|
| Homepage | "Mottars - Buy Cars, Parts & Repairs in Nigeria \| Trusted Automotive Marketplace \| Mottars" | ~90 chars | 🚨 Too long (max 60), brand duplicated |
| /cars | "Cars for Sale \| Mottars" | 24 chars | ⚠️ Missing "Nigeria" keyword |
| /blog | "Blog \| Mottars Automotive Marketplace \| Mottars" | 49 chars | ⚠️ Brand duplicated |
| Blog posts | ~80-91 chars each | Too long | 🚨 All exceed 60 chars, brand duplicated |

### H1 Tags

| Page | H1 | Issue |
|------|-----|-------|
| Homepage | "Premium Cars. Simple Experience." | ⚠️ Generic, no keywords |
| /cars | MISSING | 🚨 Critical — no H1 at all |
| /blog | MISSING | 🚨 Critical — no H1 at all |
| Blog posts | Present and keyword-rich | ✅ Good |

### Meta Descriptions

| Page | Status | Notes |
|------|--------|-------|
| Homepage | ✅ Good | 155 chars, keywords, CTA |
| /cars | ✅ Good | 127 chars, keyword-rich |
| /blog | ⚠️ Needs work | Generic |
| Blog posts | ✅ Good | Keyword-rich |

### Internal Linking
- Homepage links to 6 car listings, 3 blog posts, main nav pages — adequate
- Blog posts lack cross-linking to each other
- No "related cars" or "related articles" sections
- Car listing pages link back to /cars but not to relevant blog content

---

## 4. Schema / Structured Data (46/100)

### Current Implementation

| Page | Schema Types | Status |
|------|-------------|--------|
| All pages | Organization | ✅ Present (but has errors) |
| Homepage | Organization + WebSite | ✅ Good base |
| /cars | Organization + SearchResultsPage + ItemList | ✅ Good structure |
| /cars/{slug} | Organization + Car + BreadcrumbList + FAQPage | ⚠️ Mixed |
| /blog | Organization only | 🚨 Missing BlogPosting/CollectionPage |
| /blog/{slug} | Organization + Article | ⚠️ Needs upgrade |

### 3 Critical Schema Issues

1. **Placeholder phone number**: `"+234-XXX-XXX-XXXX"` in Organization schema — literal placeholder text being served to Google
2. **FAQPage schema on car listings**: Must be removed — Google restricted FAQ rich results to government/healthcare sites in Aug 2023
3. **Test data in ItemList**: Car listings like "1904 Libero id eligendi c Voluptatum commodi i" at 62 NGN appear in structured data

### Validation Errors
- `availableLanguage: "en-NG"` should be `"en"` (language, not locale)
- `addressCountry.@id: "NG"` is not a valid URI
- Publisher logo inconsistency (Article uses logo.svg, Organization uses favicon)
- BreadcrumbList on car pages has wrong URL in final position
- `addressLocality: "lagos"` is lowercase (should be "Lagos")

### Missing Schema Opportunities

| Schema Type | Where | Impact |
|-------------|-------|--------|
| AutoDealer (LocalBusiness) | Homepage | Enables local business panel, Knowledge Panel |
| BreadcrumbList | /cars, /blog, blog posts | Breadcrumb rich results in SERPs |
| CollectionPage + ItemList | /blog | Carousel presentation potential |
| BlogPosting (upgrade from Article) | Blog posts | Better E-E-A-T properties |
| Enhanced Car properties | Car listings | Missing color, doors, seating, VIN |
| AggregateRating | Homepage/listings | Star ratings in search results |

*Full JSON-LD recommendations in: `marketing/research/mottars-schema-audit-2026-03-05.md`*

---

## 5. Performance (50/100)

### Page Speed Indicators

| Metric | Estimate | Status |
|--------|----------|--------|
| TTFB | ~400-500ms (after redirect chain) | ⚠️ Moderate |
| First Contentful Paint | Estimated 1.5-2.5s | ⚠️ Needs measurement |
| JavaScript bundles | 13 async bundles on homepage | ⚠️ High but async-loaded |
| Cache-Control | `no-cache` on all HTML | 🚨 Every visit hits origin |
| Font loading | Preloaded Avenir (woff2 + woff) | ✅ Good |
| Image optimization | Next.js Image component used | ✅ Good |

### Key Performance Issues
1. **No HTML caching** — Cache-Control: no-cache means every page visit hits the server
2. **Redirect chain** adds ~100-200ms to every page load
3. **13 JS bundles** — async but still significant parse/execute time
4. **Turbopack reference** in production filenames — verify this isn't a dev build leak

---

## 6. Images (35/100)

| Check | Status | Details |
|-------|--------|---------|
| Alt text (homepage) | ✅ Good | Hero images, brand logos all have descriptive alt text |
| Alt text (car listings) | ⚠️ Mixed | Many listing images lack alt text |
| Alt text (blog) | ⚠️ Mixed | Header images have alt, inline images may not |
| Image format | ✅ Good | Next.js serves WebP where supported |
| Image sizing | ✅ Good | Responsive with srcset |
| OG/social images | 🚨 Issue | Uses SVG (should be PNG/JPG, min 1200x630px) |
| Stock photo duplication | 🚨 Issue | Same Unsplash photo used for 13 different car listings |

---

## 7. AI Search Readiness (45/100)

| Signal | Score | Notes |
|--------|-------|-------|
| Content structure | 7/10 | Good heading hierarchy, clear sections |
| Factual citability | 3/10 | No original data or statistics for AI to cite |
| Entity recognition | 4/10 | Domain confusion (mottars.com vs mottars.ng) undermines entity |
| Author expertise | 2/10 | "Admin User" has zero credibility for AI attribution |
| FAQ coverage | 4/10 | FAQ sections exist but too small (3 Qs instead of 10+) |
| External citations | 2/10 | No outbound links to authoritative sources |
| Quick answer formatting | 5/10 | Some content could be cited, but not optimized for it |

### AI Crawler Accessibility
- No `llms.txt` file
- No AI-specific crawler rules in robots.txt (GPTBot, ClaudeBot, PerplexityBot not addressed)
- Schema markup helps but domain confusion hinders entity resolution

---

## Prioritized Action Plan

### 🚨 P0 — CRITICAL (Fix This Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Fix sitemap domain** from `mottars.ng` to `mottars.com` | 🔴 Highest — sitemap currently useless | Low — config change |
| 2 | **Fix sitemap XML** — escape all ampersands as `&amp;` | 🔴 Sitemap unparseable by most tools | Low — encoding fix |
| 3 | **Change 307 redirect to 301** (non-www → www) | 🔴 Link equity not passing | Low — server config |
| 4 | **Resolve canonical domain** — decide www vs non-www, align canonicals | 🔴 Split indexing risk | Medium — sitewide |
| 5 | **Remove test/placeholder listings** from sitemap and site | 🔴 Damages data quality signals | Low — DB cleanup |
| 6 | **Add all 9 blog URLs to sitemap** | 🔴 Best content is undiscoverable | Low — sitemap update |
| 7 | **Fix placeholder phone in schema** (`+234-XXX-XXX-XXXX`) | 🔴 Spam signal to Google | Low — code change |

### ⚠️ P1 — HIGH (Fix Within 2 Weeks)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 8 | **Fix all title tags** — under 60 chars, no brand duplication | High — better CTR | Low |
| 9 | **Add H1 tags** to /cars ("Cars for Sale in Nigeria") and /blog ("Mottars Blog") | High — keyword signals | Low |
| 10 | **Add missing canonical tag** to /blog page | High — prevent duplicate indexing | Low |
| 11 | **Remove login/register from sitemap**, add `noindex` tags | Medium — reduce thin content signals | Low |
| 12 | **Replace "Admin User"** with real author name + bio on all blog posts | High — E-E-A-T | Medium |
| 13 | **Convert OG image** from SVG to PNG/JPG (1200x630px) | Medium — social sharing | Low |
| 14 | **Remove FAQPage schema** from car listing pages | Medium — deprecated rich result | Low |
| 15 | **Update copyright** from 2025 to 2026 | Low — freshness signal | Trivial |

### 📋 P2 — MEDIUM (Fix Within 1 Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 16 | **Add BreadcrumbList schema** to all pages | Medium — SERP enhancement | Medium |
| 17 | **Add AutoDealer LocalBusiness schema** to homepage | Medium — local search visibility | Medium |
| 18 | **Add SEO intro text** above car listings on /cars page | Medium — content signals | Low |
| 19 | **Add alt text** to all car listing images | Medium — image search | Medium |
| 20 | **Add internal cross-links** between blog posts | Medium — crawlability, engagement | Low |
| 21 | **Expand FAQ sections** to 10+ questions per article | Medium — featured snippet potential | Medium |
| 22 | **Add external links** to authoritative sources in blog posts | Medium — E-E-A-T | Low |
| 23 | **Create /about page** with company story, team, mission | Medium — trust signals | Medium |
| 24 | **Create /contact page** with structured contact info | Medium — local SEO | Low |
| 25 | **Set HTML Cache-Control** to a short TTL (e.g., 5 min) instead of no-cache | Medium — performance | Low |
| 26 | **Audit 30 auto-repair partner pages** — real businesses or seed data? | Medium — quality signal | Medium |
| 27 | **Replace stock photos** — same Unsplash image used for 13 different cars | Medium — trust, uniqueness | High |

### 🔮 P3 — STRATEGIC (This Quarter)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 28 | **Create city landing pages** (/cars/lagos, /cars/abuja, /cars/ibadan) | High — local SEO | Medium |
| 29 | **Create brand landing pages** (/cars/toyota, /cars/honda, /cars/mercedes) | High — search capture | Medium |
| 30 | **Launch programmatic SEO** — 1,000+ model/city combination pages | High — long-tail traffic | High |
| 31 | **Produce original market data** (price trends, popular models, etc.) | High — AI citability, backlinks | High |
| 32 | **Build free tools** (import duty calculator, affordability calculator) | High — lead gen, backlinks | High |
| 33 | **Add llms.txt** and configure AI crawler rules | Low — emerging standard | Low |
| 34 | **Implement review/rating system** with AggregateRating schema | High — star ratings in SERPs | High |

---

## Supporting Audit Files

| Report | File |
|--------|------|
| Schema Deep Dive | `marketing/research/mottars-schema-audit-2026-03-05.md` |
| Sitemap Deep Dive | `marketing/research/mottars-sitemap-audit-2026-03-05.md` |
| Corrected Sitemap XML | `marketing/research/mottars-corrected-sitemap.xml` |
| Content & Technical Deep Dive | `marketing/research/mottars-seo-content-audit-2026-03-05.md` |
| Nigerian Car Buyer Research | `marketing/research/nigerian-car-buyer-search-patterns-2026.md` |

---

## Score Improvement Projections

| After Fixes | Estimated Score |
|-------------|-----------------|
| P0 fixes only (week 1) | **55/100** (+17) |
| P0 + P1 (week 2) | **65/100** (+27) |
| P0 + P1 + P2 (month 1) | **75/100** (+37) |
| All fixes including P3 (quarter) | **85-90/100** |

The P0 fixes alone (sitemap domain, redirect, canonical alignment) represent the single highest-leverage improvement possible. The sitemap fix is a one-line config change that will make 94 pages discoverable to Google for the first time.
