# Assign Task to Agent

Add a new task to a specific agent's queue.

## Arguments
`$ARGUMENTS` — Format: `{agent-code} {task description}`
Example: `tunde Write a buying guide for Toyota Camry in Nigeria`

## Workflow

1. **Parse arguments**: Extract agent code (first word) and task description (rest)

2. **Validate agent code** against `agency/shared/roster.md` (valid: tunde, amara, chidi, kemi, dayo, ife)

3. **Read the agent's current** `agency/agents/{code}/tasks.md`

4. **Generate task ID**: Format `TASK-{FIRST_LETTER}-{XXX}` (auto-increment based on existing tasks)

5. **Determine priority**: Infer from campaign-board.md context or ask CEO:
   - Critical: Blocking other work or deadline imminent
   - High: Important for sprint goals
   - Medium: Good to do but not urgent
   - Low: Nice to have

6. **Add task to agent's tasks.md** under "Queued" section:
   ```
   - [ ] **{TASK-ID}**: {task description}
     - Brief: {expanded description}
     - Priority: {priority}
     - Deadline: {inferred or TBD}
     - Dependencies: {any}
     - Output: {suggested path based on agent role}
     - Status: QUEUED
   ```

7. **Add to campaign-board.md** sprint task queue

8. **Update roster.md** task count for this agent

9. **Confirm**: "Assigned '{task}' to {agent name}. Task ID: {id}. They have {n} tasks in queue."
