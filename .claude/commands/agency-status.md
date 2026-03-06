# Agency Status Dashboard

Full overview of the Mottars marketing agency.

## Workflow

1. **Read all shared files**: goals.md, campaign-board.md, roster.md

2. **Read all agent heartbeats** from agency/agents/{code}/heartbeat.md

3. **Count content assets**:
   - Blog posts in marketing/campaigns/ directories
   - Strategies in marketing/strategies/ directories
   - Research reports in marketing/research/
   - Transcripts in marketing/transcripts/

4. **Display dashboard**:
   ```
   ## Mottars Marketing Agency Dashboard

   ### Campaign: {name}
   Sprint {n} | Day {x}/5 | {days_left} days until month end

   ### Goals vs. Actual
   | Metric | Target | Actual | Gap |
   |--------|--------|--------|-----|
   [from goals.md vs actual asset counts]

   ### Team
   | Agent | Role | Status | Current Task |
   [from roster.md]

   ### Content Pipeline
   - Published: X articles
   - In Review: X articles
   - In Progress: X articles
   - Planned: X articles

   ### Asset Inventory
   - Research reports: X
   - Strategies saved: X
   - Video transcripts: X
   - Social posts drafted: X

   ### Recent Activity
   [last 5 completed tasks with timestamps from heartbeats]
   ```

5. **Suggest**: "Run `/heartbeat` for detailed sync, `/board` for task view, or `/sprint` to plan next week"
