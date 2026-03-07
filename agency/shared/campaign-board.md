# Campaign Board

*Current Campaign: Trust & Awareness (Month 1)*
*Active Sprints: Sprint 0.5 (Pre-Launch) + Sprint 1 (Foundation)*
*Last Updated: 2026-03-07*

---

## Monthly Goal
**Theme**: Establish Mottars as the trusted voice in Nigerian car buying
**Key Results**:
- [ ] 8 blog posts published (2/week)
- [ ] 60 social media posts (across IG, Twitter/X, TikTok)
- [ ] 1 dealer outreach campaign launched (25 emails)
- [ ] SEO score improved from 38 to 55 (emergency fixes)
- [ ] Email list started (target: 100 subscribers)
- [ ] 500 organic visitors

---

## Sprint 0.5: Pre-Launch Readiness (2026-03-07 to 2026-03-12) — PARALLEL

**Sprint Goal**: Make mottars.com launch-ready before driving any external traffic. Fix visible issues, establish social presence, create foundational pages.

**Why**: No point driving traffic to a site with test data, missing pages, and no social profiles. This sprint runs IN PARALLEL with Sprint 1.

### Task Queue

| ID | Task | Agent | Priority | Depends On | Status |
|----|------|-------|----------|------------|--------|
| TASK-F-003 | Audit mottars.com live site for launch-readiness (broken links, test data, placeholder content) | Femi | Critical | -- | ASSIGNED |
| TASK-F-004 | Create dev ticket bundle: remove test listings, fix phone, update copyright, fix OG image | Femi | Critical | TASK-F-003 | ASSIGNED |
| TASK-C-005 | Submit corrected sitemap to Google Search Console + verify domain | Chidi | Critical | -- | ASSIGNED |
| TASK-D-004 | Design social media profile assets (IG profile pic, bio, cover, highlight covers) | Dayo | High | -- | ASSIGNED |
| TASK-A-005 | Set up/audit Mottars Instagram, Twitter/X, TikTok accounts — ensure professional look | Amara | High | TASK-D-004 | ASSIGNED |
| TASK-T-003 | Write About page copy + Contact page copy for mottars.com | Tunde | High | -- | ASSIGNED |
| TASK-K-004 | Draft "launching soon" teaser + early subscriber capture mechanism | Kemi | Medium | -- | ASSIGNED |

### Sprint 0.5 Timeline (5 days, all parallel)

**Day 1 (Mar 7)**: Femi audits live site (F-003), Chidi submits sitemap (C-005), Tunde writes About/Contact (T-003), Kemi drafts teaser (K-004)
**Day 2-3 (Mar 8-10)**: Femi creates dev ticket bundle (F-004), Dayo designs social assets (D-004)
**Day 4-5 (Mar 11-12)**: Amara sets up social accounts (A-005), CEO routes dev tickets to dev team

### Sprint 0.5 Dependency Map
```
TASK-F-003 --> TASK-F-004 --> CEO routes to dev team
TASK-D-004 --> TASK-A-005
(All others are independent)
```

---

## Sprint 1: Foundation & Emergency SEO (2026-03-06 to 2026-03-17) — PARALLEL

**Sprint Goal**: Fix critical SEO blockers, publish first 2 blog posts, launch social presence, and begin dealer outreach research.

### Task Queue

| ID | Task | Agent | Priority | Depends On | Status |
|----|------|-------|----------|------------|--------|
| TASK-I-001 | Research competitor content strategies | Ife | Critical | -- | DONE |
| TASK-I-002 | Research top Nigerian automotive YouTube channels | Ife | High | -- | ASSIGNED |
| TASK-I-003 | Analyze top 10 Nigerian car Instagram accounts | Ife | High | -- | ASSIGNED |
| TASK-C-001 | Fix sitemap domain — prepare corrected XML brief | Chidi | Critical | -- | ASSIGNED |
| TASK-C-002 | Prepare SEO fix brief for dev team | Chidi | Critical | -- | ASSIGNED |
| TASK-C-003 | SEO brief for blog #1: "9 Lies Car Dealers Tell" | Chidi | Critical | TASK-I-001 | ASSIGNED |
| TASK-C-004 | SEO brief for blog #2: "Tokunbo Inspection Checklist" | Chidi | Critical | TASK-I-001 | ASSIGNED |
| TASK-D-001 | Campaign creative concept for Trust & Awareness Month 1 | Dayo | Critical | -- | ASSIGNED |
| TASK-D-002 | Content brief + headline options for blog #1 | Dayo | Critical | TASK-C-003 | ASSIGNED |
| TASK-D-003 | Content brief + headline options for blog #2 | Dayo | High | TASK-C-004 | ASSIGNED |
| TASK-T-001 | Write blog: "9 Lies Car Dealers Tell Nigerian Buyers" | Tunde | Critical | TASK-D-002, TASK-C-003 | ASSIGNED |
| TASK-T-002 | Write blog: "The Complete Tokunbo Inspection Checklist (2026)" | Tunde | Critical | TASK-D-003, TASK-C-004 | ASSIGNED |
| TASK-A-001 | Set up social media content calendar template | Amara | High | -- | ASSIGNED |
| TASK-A-002 | Create 10 social posts from blog #1 | Amara | High | TASK-T-001 | ASSIGNED |
| TASK-A-003 | Create 10 social posts from blog #2 | Amara | High | TASK-T-002 | ASSIGNED |
| TASK-A-004 | Research hashtag strategy for Nigerian automotive niche | Amara | Medium | -- | ASSIGNED |
| TASK-K-001 | Research 25 target dealers in Lagos, Abuja, Ibadan | Kemi | High | -- | ASSIGNED |
| TASK-K-002 | Draft dealer outreach email sequence (3-email series) | Kemi | High | TASK-D-001 | ASSIGNED |
| TASK-K-003 | Set up Brevo account and email list structure | Kemi | Medium | -- | ASSIGNED |
| TASK-F-001 | Convert Chidi's SEO briefs into dev tickets | Femi | Critical | TASK-C-001, TASK-C-002 | ASSIGNED |
| TASK-F-002 | Spec blog publishing requirements for dev team | Femi | High | -- | ASSIGNED |

### Sprint 1 Daily Plan

**Days 1-2 (Mar 6-7)**: Research + SEO Emergency
**Days 3-4 (Mar 10-11)**: SEO Briefs + Content Briefs
**Days 5-7 (Mar 12-14)**: Content Production
**Days 8-9 (Mar 15-17)**: Social Amplification + Sprint Review

### Sprint 1 Dependency Map
```
TASK-I-001(DONE) --> TASK-C-003 --> TASK-D-002 --> TASK-T-001 --> TASK-A-002
                     TASK-C-004 --> TASK-D-003 --> TASK-T-002 --> TASK-A-003
TASK-D-001 --> TASK-K-002
TASK-C-001 + TASK-C-002 --> TASK-F-001
```

### Status Flow
```
BACKLOG -> ASSIGNED -> IN_PROGRESS -> REVIEW -> DONE
                                         |
                                      BLOCKED (waiting on dependency)
```

---

## Sprint Summary Dashboard

| Sprint | Total | Done | In Progress | Assigned | Blocked |
|--------|-------|------|-------------|----------|---------|
| Sprint 0.5 (Pre-Launch) | 7 | 0 | 0 | 7 | 0 |
| Sprint 1 (Foundation) | 21 | 1 | 0 | 20 | 0 |
| **Combined** | **28** | **1** | **0** | **27** | **0** |

---

## Completed Sprints Archive

### Sprint 0: Setup (2026-03-06)
- [x] Agency system created
- [x] All agent files initialized
- [x] Brand voice document finalized
- [x] Content strategy completed
- [x] SEO audit completed (score: 38/100)
