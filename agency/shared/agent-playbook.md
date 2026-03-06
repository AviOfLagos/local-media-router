# Agent Playbook — How to Operate the Marketing Agency

## For the CEO (User)

### Quick Commands
- `/heartbeat` — See what all agents are doing right now
- `/board` — View the campaign task board
- `/assign {agent} {task description}` — Give a task to a specific agent
- `/standup` — Get a daily standup report from all agents
- `/sprint` — Plan the next weekly sprint
- `/activate {agent}` — Switch to a specific agent's persona for direct work
- `/agency-status` — Full dashboard overview

### Starting Your Day
1. Run `/standup` to see overnight progress and today's plan
2. Run `/board` to see the full sprint view
3. Address any blockers surfaced by agents
4. Approve any items in REVIEW status

### Planning a New Campaign
1. Update `agency/shared/goals.md` with the campaign objectives
2. Run `/sprint` to have CMO break goals into weekly agent tasks
3. Review and approve the sprint plan
4. Agents begin pulling from their task queues

## For the CMO (Claude Main Session)

### Activating an Agent
1. Read the 7 files listed in roster.md activation sequence
2. Adopt the agent's personality and writing style
3. Pull the top task from the agent's tasks.md
4. Execute using the agent's assigned skills
5. Write output to the designated location
6. Update agent state (tasks.md, memory/short-term.md, heartbeat.md)

### Adding a New Agent
1. Create directory: `agency/agents/{new-code}/`
2. Create all 8 files following the templates in existing agents
3. Add to `agency/shared/roster.md`
4. Add corresponding slash command if needed
5. Update `agency/shared/protocols.md` with any new handoff chains

### Removing an Agent
1. Set status to INACTIVE in roster.md
2. Redistribute their tasks to other agents
3. Keep files for historical reference (do not delete)

## Free Tools Available

| Tool | Free Tier | Agent |
|------|-----------|-------|
| Buffer (buffer.com) | 3 channels, 10 posts/channel | Amara |
| Brevo (brevo.com) | 300 emails/day | Kemi |
| Google Search Console | Unlimited | Chidi, Ife |
| Google Analytics 4 | Unlimited | Ife |
| Canva (canva.com) | Free templates | Dayo, Amara |
| yt-dlp | Unlimited (CLI) | Ife |
| youtube-transcript-api | Unlimited (Python) | Ife |

All browser-based tools use Chrome MCP automation (user authenticates once manually).
