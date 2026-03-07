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

5. **Save standup to file**:
   - Write the full standup report to `agency/standup/YYYY-MM-DD.md`
   - Include a **one-paragraph executive summary** at the top of the file
   - The summary should be concise enough for CEO to read in 30 seconds

6. **Display one-paragraph summary** to the user after the full standup:
   ```
   ## TL;DR
   [One paragraph summarizing: what got done, what's in progress, key blockers,
   and the most important thing happening today. Mention the file path.]
   ```

7. **Format for standup file** (`agency/standup/YYYY-MM-DD.md`):
   ```
   # Daily Standup — YYYY-MM-DD

   **Campaign**: [name] | **Sprint [n]**: Day [x] of [y]
   **Progress**: [x]/[y] tasks complete | [z] completed today

   ## Summary
   [One paragraph executive summary — what happened, what's next, any blockers]

   ## Agent Status
   | Agent | Status | Completed | Working On | Blockers |
   [table rows]

   ## Key Decisions / Ideas
   [Numbered list of notable decisions or ideas from the standup]

   ## CEO Questions Addressed
   [Any questions the CEO raised and how they were answered]
   ```
