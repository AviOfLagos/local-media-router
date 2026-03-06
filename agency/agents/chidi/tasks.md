# Task Queue: Chidi (SEO Specialist)

## Current Sprint: Sprint 1 (Week 1-2 | 2026-03-06 to 2026-03-17)
Campaign: Trust & Awareness (Month 1)

### In Progress
(none)

### Queued

- [ ] **TASK-C-001**: Fix sitemap domain (mottars.ng → mottars.com) — prepare corrected XML
  - Brief: The current sitemap uses mottars.ng domain for all 94 URLs — Google rejects everything. Corrected sitemap already generated at marketing/research/mottars-corrected-sitemap.xml. Prepare implementation brief for dev team: where to update sitemap generation config (likely next-sitemap or Next.js config), XML encoding fixes (& → &amp;), add 9 blog URLs, remove /login and /register. Include before/after comparison.
  - Priority: Critical
  - Deadline: 2026-03-07
  - Dependencies: none
  - Output: marketing/campaigns/trust-awareness-m1/seo/sitemap-fix-brief.md
  - Status: ASSIGNED

- [ ] **TASK-C-002**: Prepare SEO fix brief for dev team (redirects, canonical, noindex)
  - Brief: Compile all Week 1 emergency SEO fixes from ACTION-PLAN.md into a developer-ready brief. Cover: 307→301 redirect change, canonical domain resolution (www vs non-www), noindex on /login and /register, test listing cleanup (5 Lorem ipsum listings), placeholder phone number fix in Organization schema. Include exact code snippets or config changes where possible.
  - Priority: Critical
  - Deadline: 2026-03-08
  - Dependencies: none
  - Output: marketing/campaigns/trust-awareness-m1/seo/emergency-seo-fix-brief.md
  - Status: ASSIGNED

- [ ] **TASK-C-003**: Create SEO brief for blog post #1: "9 Lies Car Dealers Tell Nigerian Buyers"
  - Brief: Research and compile SEO brief: primary keyword, secondary keywords, search intent analysis, SERP competition, recommended title tag (under 60 chars), meta description (under 155 chars), H1/H2 structure, internal link targets, external authority links, schema markup (Article/BlogPosting). Reference Nigerian car buyer search patterns from marketing/research/nigerian-car-buyer-search-patterns-2026.md.
  - Priority: Critical
  - Deadline: 2026-03-10
  - Dependencies: TASK-I-001 (competitor research from Ife)
  - Output: marketing/campaigns/trust-awareness-m1/seo/seo-brief-9-lies.md
  - Status: ASSIGNED

- [ ] **TASK-C-004**: Create SEO brief for blog post #2: "Complete Tokunbo Inspection Checklist"
  - Brief: Same format as TASK-C-003. Primary keyword: "tokunbo inspection checklist". Research related queries like "how to check tokunbo car", "tokunbo car inspection Nigeria", "things to check before buying used car Nigeria". Include FAQ schema opportunity, HowTo schema opportunity. Reference search patterns research.
  - Priority: Critical
  - Deadline: 2026-03-11
  - Dependencies: TASK-I-001 (competitor research from Ife)
  - Output: marketing/campaigns/trust-awareness-m1/seo/seo-brief-tokunbo-checklist.md
  - Status: ASSIGNED

### Done (This Sprint)
(none)

## Standing Reference
- Current SEO audit score: 38/100 (baseline from 2026-03-05 audit)
- Action plan: marketing/research/ACTION-PLAN.md
- Corrected sitemap: marketing/research/mottars-corrected-sitemap.xml
