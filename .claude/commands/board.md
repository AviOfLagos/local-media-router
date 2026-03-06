# Campaign Board View

Display the current campaign task board.

## Workflow

1. **Read** `agency/shared/campaign-board.md`

2. **Display** the current sprint with color-coded statuses:
   - BACKLOG: Not started
   - ASSIGNED: Agent knows about it
   - IN_PROGRESS: Actively being worked on
   - REVIEW: Awaiting CMO approval
   - DONE: Completed
   - BLOCKED: Waiting on dependency

3. **Show summary stats**:
   - Total tasks, Done, In Progress, Blocked, Backlog
   - Sprint progress percentage
   - Days remaining in sprint

4. **Show dependency map** for any blocked tasks

5. **Suggest next actions**: "Run `/assign {agent} {task}` to add a new task, or `/sprint` to plan next week"
