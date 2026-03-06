# Daily Standup

Get a standup report from all agents.

## Workflow

1. **Read** `agency/shared/campaign-board.md` for sprint context

2. **For each agent** in `agency/shared/roster.md`:
   - Read `agency/agents/{code}/tasks.md`
   - Read `agency/agents/{code}/memory/short-term.md`
   - Read `agency/agents/{code}/heartbeat.md`

3. **Generate standup for each agent**:
   ```
   ### {Agent Name} ({Role})
   **Yesterday**: {what was completed or worked on}
   **Today**: {next task from tasks.md}
   **Blockers**: {any blockers, or "None"}
   ```

4. **Generate team summary**:
   ```
   ## Daily Standup — [date]

   ### Sprint [n] Progress
   Done: X | In Progress: X | Blocked: X | Remaining: X

   [individual agent standups]

   ### Today's Priority Chain
   1. {most critical task}
   2. {second priority}
   3. {third priority}

   ### Blockers to Resolve
   - {blocker and what is needed}
   ```
