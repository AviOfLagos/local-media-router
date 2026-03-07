# Task Queue: Femi (Technical Lead — Dev Handoff)

## Sprint 0.5: Pre-Launch Readiness (2026-03-07 to 2026-03-12) — PARALLEL
Campaign: Trust & Awareness (Month 1)

### In Progress
(none)

### Queued

- [ ] **TASK-F-004**: Create dev ticket bundle from site audit findings
  - Brief: Take all issues from F-003 audit and convert into individual dev tickets. Each ticket: remove test listings, fix phone number, update copyright to 2026, fix OG image, remove placeholder content. Each gets severity (P0-P3), effort estimate (S/M/L), acceptance criteria, and before/after description.
  - Priority: Critical
  - Deadline: 2026-03-09
  - Dependencies: TASK-F-003
  - Output: marketing/campaigns/trust-awareness-m1/dev/pre-launch-ticket-bundle.md
  - Status: ASSIGNED

---

## Sprint 1: Foundation & Emergency SEO (2026-03-06 to 2026-03-17) — PARALLEL
Campaign: Trust & Awareness (Month 1)

### In Progress
(none)

### Queued

- [ ] **TASK-F-001**: Convert Chidi's sitemap fix + SEO emergency brief into dev tickets
  - Brief: Once Chidi completes TASK-C-001 and TASK-C-002, translate his SEO recommendations into developer-ready tickets. Include: corrected sitemap XML (already at marketing/research/mottars-corrected-sitemap.xml), 307→301 redirect change, canonical tag fixes, noindex on /login and /register, test listing cleanup, placeholder phone fix in Organization schema. Each item gets its own ticket with severity, effort, and acceptance criteria.
  - Priority: Critical
  - Deadline: 2026-03-09
  - Dependencies: TASK-C-001, TASK-C-002 (Chidi)
  - Output: marketing/campaigns/trust-awareness-m1/dev/
  - Status: ASSIGNED

- [ ] **TASK-F-002**: Spec blog publishing requirements for dev team
  - Brief: Ensure mottars.com's blog system is ready to receive Sprint 1 content. Check: does the blog CMS support custom meta descriptions, canonical tags, FAQ/HowTo schema, author bios, publication dates, OG images? If not, spec what needs to be added. Create a "blog post publishing checklist" for the marketing team.
  - Priority: High
  - Deadline: 2026-03-11
  - Dependencies: none
  - Output: marketing/campaigns/trust-awareness-m1/dev/blog-publishing-spec.md
  - Status: ASSIGNED

### Done (This Sprint)

- [x] **TASK-F-003**: Audit mottars.com live site for launch-readiness
  - Brief: Comprehensive audit of the live site. Check for: broken links, test/placeholder data (Lorem ipsum listings), wrong phone numbers, outdated copyright year, missing or broken OG images, placeholder content on any page, test user accounts visible, incorrect contact info. Document every issue found with screenshot descriptions and exact URLs.
  - Priority: Critical
  - Deadline: 2026-03-07
  - Dependencies: none
  - Output: marketing/campaigns/trust-awareness-m1/dev/site-audit-report.md
  - Status: DONE
  - Completed: 2026-03-07
  - Result: 21 issues found (4x P0, 7x P1, 7x P2, 3x P3). Site is NOT launch-ready. Key blockers: zero car inventory, placeholder phone number, test partner data, gibberish mechanic text.
