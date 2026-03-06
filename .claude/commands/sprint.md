# Sprint Planning

Plan the next weekly sprint for all agents.

## Arguments
`$ARGUMENTS` — Optional: sprint number or "next"

## Workflow

1. **Read current state**:
   - `agency/shared/goals.md` for monthly targets
   - `agency/shared/campaign-board.md` for current sprint completion
   - `marketing/strategies/content/mottars-content-strategy-2026.md` for content calendar
   - `marketing/research/ACTION-PLAN.md` for SEO priorities

2. **Calculate remaining monthly targets** based on completed work vs goals

3. **Generate sprint plan**:
   - Distribute tasks across agents based on their roles
   - Respect task dependencies (content before social, SEO before publication)
   - Balance workload (no agent overloaded)
   - Prioritize based on content calendar and SEO action plan

4. **Create daily breakdown** for the 5-day sprint (Monday-Friday)

5. **Present to CEO for approval**:
   ```
   ## Sprint [N] Plan: [dates]

   ### Sprint Goal
   [1-2 sentence goal aligned with monthly campaign]

   ### Task Allocation
   | Agent | Tasks | Priority Items |
   |-------|-------|---------------|
   [one row per agent]

   ### Full Task List
   | ID | Task | Agent | Priority | Depends On | Day |
   [all tasks]

   ### Daily Plan
   [day-by-day breakdown]
   ```

6. **On CEO approval**:
   - Write tasks to each agent's tasks.md
   - Update campaign-board.md with full sprint
   - Update roster.md task counts
