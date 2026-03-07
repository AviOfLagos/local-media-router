# Mottars.com Launch Readiness Audit Report

**Audited by:** Femi (Technical Lead)
**Task:** TASK-F-003
**Date:** 2026-03-07
**Site:** https://mottars.com / https://www.mottars.com
**Sprint:** 0.5 (Pre-Launch Readiness)

---

## Executive Summary

**Total Issues Found: 21**

| Severity | Count | Description |
|----------|-------|-------------|
| **P0 (Blocks Launch)** | 4 | Must fix before ANY marketing activity |
| **P1 (High)** | 7 | Fix within 48 hours |
| **P2 (Medium)** | 7 | Fix within 1 week |
| **P3 (Low)** | 3 | Nice to have |

**Overall Readiness Score: NOT READY FOR LAUNCH**

The site has four launch-blocking issues: zero car inventory on the listings page, placeholder phone number in structured data across every page, test partner data in production ("sqsqsq"), and gibberish text in a verified mechanic profile. These must be resolved before any marketing campaign drives traffic to the site. A visitor arriving from a social ad or blog post would see zero cars and encounter fake data -- destroying trust instantly.

---

## P0 -- Launch Blockers

### ISSUE-001: Zero Car Inventory on /cars Page
- **Severity:** P0 (Blocks Launch)
- **URL:** https://www.mottars.com/cars
- **Current State:** Page displays "0 cars available" with message "No cars found - Try adjusting your filters to see more results." The entire marketplace has no vehicle listings.
- **Expected State:** Active car listings with real vehicles, prices, images, and dealer information. A marketplace with no inventory is not a marketplace.
- **Effort:** XL (requires data entry or dealer onboarding pipeline)
- **Fix Recommendation:** Either (a) manually add a minimum of 20-30 real vehicle listings with verified photos and pricing, or (b) onboard 3-5 dealers who can populate their own inventory. No marketing campaign should send traffic to an empty marketplace. This is the single highest priority item.

### ISSUE-002: Placeholder Phone Number in Organization Schema (Site-Wide)
- **Severity:** P0 (Blocks Launch)
- **URL:** All pages (homepage, blog posts, terms, privacy, partner pages)
- **Current State:** Organization schema `contactPoint.telephone` is set to `"+234-XXX-XXX-XXXX"` -- literal placeholder text with X characters.
- **Expected State:** A real, working Nigerian phone number (e.g., `"+234-801-XXX-XXXX"`).
- **Effort:** S (single config change)
- **Fix Recommendation:** Update the Organization schema telephone field in the site's global layout/config to a real customer service phone number. This appears in structured data Google reads directly. Google Search Console may flag this as a schema error.

### ISSUE-003: Test Partner "sqsqsq" in Production with Verified Badge
- **Severity:** P0 (Blocks Launch)
- **URL:** https://www.mottars.com/partners/sqsqsq (also indexed in sitemap)
- **Current State:** A partner profile named "sqsqsq" (keyboard mashing) exists in production, is marked as "Verified," has 0 listings, and displays contact info (phone: 08141142376, email: braintechstudios@gmail.com) that appears to be developer test data.
- **Expected State:** No test accounts in production. All "Verified" partners should be real, vetted businesses.
- **Effort:** S (database deletion + sitemap regeneration)
- **Fix Recommendation:** (1) Delete the "sqsqsq" partner record from the database. (2) Remove the URL from the sitemap. (3) Audit for any other test accounts. The "Verified" badge on fake data is especially damaging to trust.

### ISSUE-004: Gibberish Service Specializations on Mechanic Profile
- **Severity:** P0 (Blocks Launch)
- **URL:** https://www.mottars.com/auto-repair/mottee
- **Current State:** The "Mottee" mechanic profile lists services as "wfdwdwdw, dwdwwdwdw, dwdwdwdw" -- random keyboard mashing displayed as actual service categories.
- **Expected State:** Real service categories (e.g., "Engine Repair, Body Work, Diagnostics").
- **Effort:** S (database update)
- **Fix Recommendation:** Update the specializations field for this mechanic with real service descriptions. Also audit all 11 mechanic profiles on /auto-repair to ensure none have similar test data.

---

## P1 -- High Priority (Fix Within 48 Hours)

### ISSUE-005: Sitemap Uses mottars.ng Domain Instead of mottars.com
- **Severity:** P1 (High)
- **URL:** https://www.mottars.com/sitemap.xml
- **Current State:** All URLs in the sitemap use `mottars.ng` domain (e.g., `https://mottars.ng/cars`). The actual live site is `mottars.com`.
- **Expected State:** All sitemap URLs should use `mottars.com` (or `www.mottars.com`, matching the canonical domain).
- **Effort:** S (sitemap regeneration or config change)
- **Fix Recommendation:** Update the sitemap generation config to use `mottars.com` as the base domain. Resubmit to Google Search Console after fix. A corrected sitemap already exists at `marketing/research/mottars-corrected-sitemap.xml`.

### ISSUE-006: /login and /register Indexed in Search Engines
- **Severity:** P1 (High)
- **URL:** https://www.mottars.com/login, https://www.mottars.com/register
- **Current State:** Both pages have `robots: "index, follow"` meta tag, are included in the sitemap (as mottars.ng URLs), and are NOT disallowed in robots.txt. Search engines will index these authentication pages.
- **Expected State:** Both pages should have `<meta name="robots" content="noindex, nofollow">`, be excluded from the sitemap, and ideally be disallowed in robots.txt.
- **Effort:** S (meta tag + sitemap + robots.txt changes)
- **Fix Recommendation:** (1) Add noindex meta tag to /login and /register. (2) Remove them from sitemap.xml. (3) Add `Disallow: /login` and `Disallow: /register` to robots.txt.

### ISSUE-007: 307 Temporary Redirect Instead of 301 Permanent (Non-WWW to WWW)
- **Severity:** P1 (High)
- **URL:** https://mottars.com (non-www)
- **Current State:** Based on prior SEO audit, non-www redirects to www with a 307 (temporary) redirect.
- **Expected State:** 301 (permanent) redirect from non-www to www. A 307 does not pass SEO link equity.
- **Effort:** S (server/hosting config change)
- **Fix Recommendation:** Change the redirect from 307 to 301 in the hosting platform or CDN configuration (likely Vercel, given Next.js). This ensures search engines consolidate ranking signals on the www version.

### ISSUE-008: Facebook Share Link is Malformed
- **Severity:** P1 (High)
- **URL:** Homepage footer social links
- **Current State:** Facebook link points to `https://facebook.com/share/1CauoDt7V9/?ref=waios.fb_links_xma_control` -- this is a temporary share URL, not a permanent page URL. It will likely break or lead to an unintended destination.
- **Expected State:** A permanent Facebook page URL like `https://www.facebook.com/mottarsofficial` or similar.
- **Effort:** S (link update)
- **Fix Recommendation:** Replace with the actual Mottars Facebook page URL. Verify the page exists and is properly set up.

### ISSUE-009: /about Page Returns 404
- **Severity:** P1 (High)
- **URL:** https://www.mottars.com/about
- **Current State:** Returns a 404 error. The homepage footer links to `#about-us` (an anchor on the homepage), but there is no dedicated About page. Marketing campaigns and potential partners will look for /about.
- **Expected State:** Either a dedicated /about page with company story, team, mission, and trust signals, OR ensure the footer link properly scrolls to the about section on the homepage.
- **Effort:** M (if creating a new page) / S (if just fixing the footer link)
- **Fix Recommendation:** Create a dedicated /about page with: founding story, team, mission statement, trust signals (verified dealers count, etc.), office address, and contact info. An About page is critical for trust-building, especially for a financial platform in Nigeria.

### ISSUE-010: /contact Page Returns 404
- **Severity:** P1 (High)
- **URL:** https://www.mottars.com/contact
- **Current State:** Returns a 404 error. There is no dedicated contact page. Contact info (email, address) is only in the footer and schema markup.
- **Expected State:** A dedicated /contact page with contact form, email, phone, office address, and possibly a map.
- **Effort:** M (new page build)
- **Fix Recommendation:** Create a /contact page. For a marketplace handling vehicle transactions, accessible customer support is essential for trust. Include: contact form, email (info@mottars.com), phone (once real number is available), physical address, and business hours.

### ISSUE-011: /sell Page Returns 404
- **Severity:** P1 (High)
- **URL:** https://www.mottars.com/sell
- **Current State:** Navigation includes "Sell Car" link but the /sell page returns 404. Users clicking "Sell Car" in the nav hit a dead end.
- **Expected State:** A working page explaining how to list a car for sale, or a form to begin the listing process.
- **Effort:** M (page build or redirect)
- **Fix Recommendation:** Either build the /sell page or redirect it to the appropriate listing flow. A marketplace that cannot onboard sellers will never have inventory (see ISSUE-001).

---

## P2 -- Medium Priority (Fix Within 1 Week)

### ISSUE-012: Blog "More Posts" Section Shows "No posts found"
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/blog
- **Current State:** The featured articles section shows 2 blog posts, but the "More Posts" section below displays "No posts found." This suggests a rendering bug or content loading issue.
- **Expected State:** Either show all blog posts in a unified layout, or if only 2 posts exist, remove the empty "More Posts" section entirely.
- **Effort:** S (frontend fix)
- **Fix Recommendation:** Debug the blog page component. If the "More Posts" section pulls from a different data source than featured posts, fix the query. If there are genuinely only 2 posts, hide the empty section.

### ISSUE-013: Placeholder YouTube Video IDs on Blog Page
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/blog
- **Current State:** The blog page shows video content sections with YouTube video ID `dQw4w9WgXcQ` (the "Never Gonna Give You Up" rickroll video). This is clearly placeholder test data.
- **Expected State:** Either real Mottars video content or remove the video section until real content is available.
- **Effort:** S (content update or section removal)
- **Fix Recommendation:** Remove the video section from the blog page until real Mottars YouTube content exists. Alternatively, create actual video content for "Understanding Car Financing in Nigeria," etc., and replace the placeholder IDs.

### ISSUE-014: Terms of Service Shows "Last Updated: December 2025"
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/terms
- **Current State:** Terms page header states "Last updated: December 2025." Since we are now in March 2026, this is not inherently wrong, but the original audit flagged potential date issues.
- **Expected State:** If terms have been updated since December 2025, the date should reflect the latest revision. If launching now, consider updating to March 2026.
- **Effort:** S (text change)
- **Fix Recommendation:** Review if the terms have been modified since December 2025. If so, update the date. If launching in March 2026, update to current date to signal freshness.

### ISSUE-015: Privacy Policy Shows "Last Updated: December 2025"
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/privacy
- **Current State:** Same issue as terms page -- dated December 2025.
- **Expected State:** Current date if content has been revised.
- **Effort:** S (text change)
- **Fix Recommendation:** Same as ISSUE-014. Update to March 2026 if content has been revised for launch.

### ISSUE-016: Privacy Policy Missing Key Compliance Sections
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/privacy
- **Current State:** Privacy policy is missing: explicit data retention policy, NDPR (Nigeria Data Protection Regulation) compliance statement, cookie consent mechanism description, specific data deletion procedures.
- **Expected State:** For a Nigerian marketplace handling user data and financial transactions, NDPR compliance is legally required. The policy should explicitly reference NDPR and include data retention timelines.
- **Effort:** M (legal review + content update)
- **Fix Recommendation:** Have legal counsel review the privacy policy for NDPR compliance. Add sections for: data retention periods, right to deletion procedures, NDPR compliance statement, cookie policy details.

### ISSUE-017: Partner Page /partners/mottee Redirects/Errors
- **Severity:** P2 (Medium)
- **URL:** https://www.mottars.com/partners/mottee
- **Current State:** Page attempts a 307 redirect to /auto-repair/mottee but shows a 404 error page instead. The URL is in the sitemap (as mottars.ng domain).
- **Expected State:** Either redirect properly to /auto-repair/mottee (which does work), or remove the /partners/ route if it is deprecated.
- **Effort:** S (routing fix or sitemap cleanup)
- **Fix Recommendation:** (1) Fix the redirect from /partners/mottee to /auto-repair/mottee with a 301 permanent redirect. (2) Remove /partners/ URLs from sitemap. (3) Update any internal links pointing to /partners/.

### ISSUE-018: Copyright Year Shows 2025 Instead of 2026
- **Severity:** P2 (Medium)
- **URL:** Homepage footer (and likely all pages)
- **Current State:** Footer displays "2025 Mottars. All rights reserved."
- **Expected State:** "2026 Mottars. All rights reserved." -- it is currently March 2026.
- **Effort:** S (single text/config change)
- **Fix Recommendation:** Update the copyright year to 2026 in the footer component. Consider making it dynamic (e.g., `new Date().getFullYear()`) to auto-update each year.

---

## P3 -- Low Priority (Nice to Have)

### ISSUE-019: No Author Byline Visible on Blog Posts
- **Severity:** P3 (Low)
- **URL:** https://www.mottars.com/blog/*
- **Current State:** Blog posts have author info in schema markup (Olatunji Tjohn) but no visible author byline on the page. Readers cannot see who wrote the article.
- **Expected State:** Visible author name, avatar, and brief bio on each blog post. This builds authority and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) for SEO.
- **Effort:** M (frontend component + CMS field)
- **Fix Recommendation:** Add an author byline component to the blog post template. Include: author name, photo/avatar, one-line bio, and optionally a link to an author page. The schema already has author data, so the frontend just needs to render it.

### ISSUE-020: Terms Page Uses support@mottars.com But Other Pages Use info@mottars.com
- **Severity:** P3 (Low)
- **URL:** https://www.mottars.com/terms vs. rest of site
- **Current State:** The Terms of Service page lists `support@mottars.com` as the contact email, while all other pages (homepage, schema, privacy) use `info@mottars.com`.
- **Expected State:** Consistent email across all pages, or intentionally different emails with clear purpose (support@ for support issues, info@ for general inquiries).
- **Effort:** S (text change or verification)
- **Fix Recommendation:** Verify both email addresses exist and are monitored. If intentionally different, that is fine. If not, standardize to one address. At minimum, ensure both addresses are functional.

### ISSUE-021: LinkedIn Listed in Schema but Not in Footer Social Links
- **Severity:** P3 (Low)
- **URL:** Homepage, /cars page (schema vs. visible footer)
- **Current State:** The Organization schema on some pages includes LinkedIn as a social profile, but the footer only shows Telegram, WhatsApp, Instagram, X, and Facebook. LinkedIn is missing from the visible footer.
- **Expected State:** Either add LinkedIn to the footer social links, or remove it from schema markup. Consistency between structured data and visible content.
- **Effort:** S (add link to footer or remove from schema)
- **Fix Recommendation:** If Mottars has an active LinkedIn page, add it to the footer. If not, remove it from schema markup.

---

## Pages Audited

| Page | URL | Status |
|------|-----|--------|
| Homepage | https://mottars.com | Loads, multiple issues |
| Car Listings | https://www.mottars.com/cars | Loads, zero inventory (P0) |
| Blog Index | https://www.mottars.com/blog | Loads, partial content issues |
| Blog Post 1 | https://www.mottars.com/blog/nigerian-car-buyers-dictionary | Loads, good content |
| Blog Post 2 | https://www.mottars.com/blog/how-to-buy-a-car-safely-in-nigeria | Loads, good content |
| Auto Repair | https://www.mottars.com/auto-repair | Loads, 11 mechanics listed |
| Mechanic Profile | https://www.mottars.com/auto-repair/mottee | Loads, gibberish data (P0) |
| Partner (test) | https://www.mottars.com/partners/sqsqsq | Loads, test data (P0) |
| Partner (mottee) | https://www.mottars.com/partners/mottee | 404/redirect error |
| Terms | https://www.mottars.com/terms | Loads, minor issues |
| Privacy | https://www.mottars.com/privacy | Loads, compliance gaps |
| About | https://www.mottars.com/about | 404 -- page does not exist |
| Contact | https://www.mottars.com/contact | 404 -- page does not exist |
| Sell | https://www.mottars.com/sell | 404 -- page does not exist |
| Login | https://www.mottars.com/login | Loads (client-side rendered) |
| Register | https://www.mottars.com/register | Loads (client-side rendered) |
| Sitemap | https://www.mottars.com/sitemap.xml | Wrong domain (mottars.ng) |

---

## Positive Findings

Not everything is broken. The following areas are in good shape:

1. **Blog content quality** -- Both published articles are well-written, original, and relevant to the Nigerian car market. Author attribution (Olatunji Tjohn) is real.
2. **Auto Repair section** -- 11 verified mechanics with real data (except the Mottee gibberish issue). Filters and search work.
3. **Design and UX** -- Professional, modern design with dark mode support, responsive layout, and clean typography. The visual identity is solid.
4. **Social media presence** -- Active accounts on Telegram, WhatsApp, Instagram, X, and Facebook (though the FB link is broken).
5. **SEO foundation** -- Schema.org markup is present site-wide, OG tags are configured, canonical URLs are set (though domain is wrong in sitemap).
6. **Tech stack** -- Next.js on what appears to be Vercel hosting. Google Analytics is integrated. PWA manifest is configured.
7. **Legal pages** -- Terms and Privacy exist with real, platform-specific content (not generic templates).

---

## Recommended Fix Order

1. **Week 1 (Before any marketing):**
   - ISSUE-001: Get real car inventory on /cars (or at minimum 20 listings)
   - ISSUE-002: Replace placeholder phone number
   - ISSUE-003: Delete "sqsqsq" test partner
   - ISSUE-004: Fix gibberish on Mottee mechanic profile
   - ISSUE-005: Fix sitemap domain
   - ISSUE-006: Noindex /login and /register
   - ISSUE-007: 307 to 301 redirect fix
   - ISSUE-008: Fix Facebook link

2. **Week 2:**
   - ISSUE-009: Create /about page
   - ISSUE-010: Create /contact page
   - ISSUE-011: Build or redirect /sell page
   - ISSUE-012: Fix blog "More Posts" section
   - ISSUE-013: Remove rickroll video placeholder
   - ISSUE-018: Update copyright to 2026

3. **Week 3:**
   - ISSUE-014/015: Update legal page dates
   - ISSUE-016: NDPR compliance review
   - ISSUE-017: Fix /partners/ routing
   - ISSUE-019/020/021: Author bylines, email consistency, LinkedIn link

---

*Report generated by Femi (Technical Lead) as part of Sprint 0.5 Pre-Launch Readiness audit. This report feeds into TASK-F-004 (dev ticket bundle creation).*
