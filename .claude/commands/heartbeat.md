# Agency Heartbeat

Sync all agents and report current status to CEO.

## Workflow

1. **Read shared state**:
   - Read `agency/shared/goals.md` for current campaign objectives
   - Read `agency/shared/campaign-board.md` for sprint status
   - Read `agency/shared/roster.md` for agent list

2. **For each agent** (tunde, amara, chidi, kemi, dayo, ife):
   - Read `agency/agents/{code}/heartbeat.md` for last sync time
   - Read `agency/agents/{code}/tasks.md` for task status
   - Read `agency/agents/{code}/memory/short-term.md` for blockers or handoffs
   - Calculate: tasks completed, tasks remaining, blockers

3. **Generate consolidated report**:
   ```
   ## Agency Heartbeat — [timestamp]

   ### Campaign: [name] | Sprint [n]: Day [x] of 5
   Monthly progress: [x]/[y] blog posts | [x]/[y] social | [x]/[y] outreach

   ### Agent Status
   | Agent | Status | Current Task | Health |
   |-------|--------|-------------|--------|
   [one row per agent from their heartbeat.md]

   ### Action Needed
   [numbered list of items needing CEO attention: reviews, blockers, decisions]

   ### Handoffs Ready
   [list of completed work ready for downstream agents]
   ```

4. **Update each agent's heartbeat.md** with new sync timestamp

5. **Update roster.md** with current statuses
