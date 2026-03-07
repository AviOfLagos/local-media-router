# Agency Roster

*Last updated: 2026-03-07 (end of day)*

| Agent | Code | Role | Status | Next Task | Sprint 0.5 | Sprint 1 | Completed |
|-------|------|------|--------|-----------|-----------|----------|-----------|
| Tunde | tunde | Content Writer | WAITING | T-001 (blocked by D-002, C-003) | 1/1 ✅ | 0/2 | 1 |
| Amara | amara | Social Media Manager | READY | A-005 (social account audit — unblocked!) | 0/1 | 2/4 | 2 |
| Chidi | chidi | SEO Specialist | READY | C-002, C-003, C-004 (all unblocked) | 1/1 ✅ | 1/4 | 2 |
| Kemi | kemi | Growth/Outreach | READY | K-002 (dealer outreach — unblocked!) | 1/1 ✅ | 1/3 | 2 |
| Dayo | dayo | Creative Strategist + Design | WAITING | D-002 (blocked by C-003), D-003 (blocked by C-004) | 1/1 ✅ | 1/3 | 2 |
| Ife | ife | Analytics/Research | READY | I-002, I-003 | 0/0 | 1/3 | 1 |
| Femi | femi | Technical Lead (Dev Handoff) | READY | F-004 (dev tickets — unblocked!), F-002 | 1/2 | 0/2 | 1 |

**Total completed today: 11 tasks** | Sprint 0.5: 5/7 | Sprint 1: 6/21 | Combined: 11/28

## Agent Activation Sequence

To activate an agent, the CMO reads these files in order:
1. `agency/agents/{code}/identity.md`
2. `agency/agents/{code}/writing-style.md`
3. `agency/agents/{code}/core-skills.md`
4. `agency/agents/{code}/tasks.md`
5. `agency/agents/{code}/memory/short-term.md`
6. `agency/shared/brand-voice.md`
7. `agency/shared/brand-style.md` (for visual work — Dayo, Amara)
8. `.claude/product-marketing-context.md`
