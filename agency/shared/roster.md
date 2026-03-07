# Agency Roster

*Last updated: 2026-03-06*

| Agent | Code | Role | Status | Current Task | Sprint Tasks | Completed |
|-------|------|------|--------|-------------|-------------|-----------|
| Tunde | tunde | Content Writer | WAITING | Awaiting briefs | 0/2 | 0 |
| Amara | amara | Social Media Manager | READY | A-001, A-004 | 0/4 | 0 |
| Chidi | chidi | SEO Specialist | READY | C-001, C-002 (unblocked) | 0/4 | 0 |
| Kemi | kemi | Growth/Outreach | READY | K-001 | 0/3 | 0 |
| Dayo | dayo | Creative Strategist + Design | READY | D-001 (unblocked) | 0/3 | 0 |
| Ife | ife | Analytics/Research | ACTIVE | I-002, I-003 next | 1/3 | 1 |
| Femi | femi | Technical Lead (Dev Handoff) | READY | F-001 (awaiting Chidi) | 0/2 | 0 |

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
