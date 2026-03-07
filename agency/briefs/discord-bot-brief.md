# Discord Bot Brief — New Conversation Starter

**Purpose**: Use this file to start a NEW Claude conversation for building the Mottars Marketing Agency Discord bot.
**How to use**: Open a new Claude Code session, paste this file's path, and say "Read this brief and let's build it."

---

## What We're Building

A Discord bot that connects to the Mottars Virtual Marketing Agency — 6 AI marketing agents that live in Discord, respond to messages, post daily standups, and do real marketing work.

### Architecture

```
Your Mac (always-on server)
├── Discord Bot (Node.js)
│   ├── Hybrid LLM Router
│   │   ├── LOCAL MODEL (Ollama) → heartbeat, status, formatting, reminders
│   │   └── CLAUDE API → research, writing, strategy, creative briefs
│   ├── Agent Loader
│   │   └── Reads agency/agents/{code}/ files from disk
│   │       (identity.md, writing-style.md, tasks.md, memory/, etc.)
│   ├── Cron Scheduler
│   │   ├── 9:00 AM daily → trigger standup in #standup
│   │   ├── Monday 9 AM → weekly sprint report in #planning
│   │   └── On task completion → notify in #activity
│   └── File Sync
│       └── Updates agent state files (tasks.md, heartbeat.md, memory/) after every interaction
├── Discord Channels
│   ├── #general (CEO commands, orchestrator)
│   ├── #standup (daily standup posts from all agents)
│   ├── #content (Tunde + Dayo workspace)
│   ├── #social (Amara workspace)
│   ├── #seo (Chidi workspace)
│   ├── #outreach (Kemi workspace)
│   ├── #research (Ife workspace)
│   ├── #design (Dayo + design work)
│   ├── #dev-handoff (Femi — Technical Lead)
│   └── #activity (all agent updates, task completions)
└── Config
    ├── model-routing.yaml (which model handles what)
    ├── .env (API keys, bot token)
    └── agent-config.json (maps agents to channels)
```

### Hybrid LLM Routing (Cost Optimization)

```yaml
# model-routing.yaml
routes:
  local_model: "ollama/llama3.2"  # or mistral, phi-3, etc.
  cloud_model: "claude-sonnet-4-20250514"  # or opus for heavy tasks

  # Tasks routed to LOCAL model (free, fast)
  local_tasks:
    - heartbeat_check
    - status_formatting
    - daily_reminders
    - basic_chat_responses
    - task_status_queries
    - file_read_summaries
    - standup_formatting

  # Tasks routed to CLAUDE API (paid, smart)
  cloud_tasks:
    - content_writing
    - research_deep_dive
    - strategy_creation
    - seo_analysis
    - creative_briefs
    - email_copywriting
    - competitive_analysis
    - campaign_planning
```

### Agent System

The bot reads agent identity from disk files. Each agent has:
- `agency/agents/{code}/identity.md` — personality, communication style
- `agency/agents/{code}/writing-style.md` — voice rules
- `agency/agents/{code}/core-skills.md` — what they can do
- `agency/agents/{code}/tasks.md` — current task queue
- `agency/agents/{code}/memory/short-term.md` — active context
- `agency/agents/{code}/memory/long-term.md` — learnings
- `agency/agents/{code}/heartbeat.md` — last sync status

When a Discord message triggers an agent:
1. Bot reads all agent files + shared files (brand-voice.md, goals.md)
2. Constructs a system prompt with agent identity
3. Routes to local or cloud model based on task type
4. Agent responds in their Discord channel
5. Bot updates agent state files (tasks.md, heartbeat.md, memory/)

### The 7 Agents

| Agent | Code | Role | Discord Channel |
|-------|------|------|----------------|
| Tunde | tunde | Content Writer | #content |
| Amara | amara | Social Media Manager | #social |
| Chidi | chidi | SEO Specialist | #seo |
| Kemi | kemi | Growth/Outreach | #outreach |
| Dayo | dayo | Creative Strategist + Design | #design, #content |
| Ife | ife | Analytics/Research | #research |
| Femi | femi | Technical Lead (dev handoffs) | #dev-handoff |

### Interaction Patterns

```
# Direct agent mention
User: @Tunde write a blog about car insurance
→ Bot loads Tunde's context, routes to Claude API, Tunde responds in #content

# Orchestrator command
User: /standup
→ Bot reads all agents' state, routes to local model for formatting, posts summary

# Status check
User: @Ife what are you working on?
→ Bot reads Ife's tasks.md, routes to local model, responds with status

# Task assignment
User: /assign chidi "Audit homepage title tags"
→ Bot updates Chidi's tasks.md, notifies in #seo
```

### Autonomous Operations (Cron Jobs)

| Time | Action | Model |
|------|--------|-------|
| 9:00 AM daily | Post standup summary in #standup | Local |
| 9:00 AM Monday | Weekly sprint report in #planning | Cloud |
| On task DONE | Notify downstream agents in #activity | Local |
| 6:00 PM daily | Save daily standup to `agency/standup/YYYY-MM-DD.md` | Local |
| On blocker | Alert CEO in #general | Local |

### Tech Stack

| Component | Technology | Notes |
|-----------|-----------|-------|
| Bot framework | discord.js (v14) | Node.js Discord library |
| Local LLM | Ollama | Run llama3.2 or mistral locally |
| Cloud LLM | Anthropic Claude API | sonnet for most tasks, opus for complex |
| Scheduler | node-cron | For daily standups, weekly reports |
| File I/O | Node.js fs module | Read/write agent state files |
| Config | dotenv + yaml | .env for secrets, yaml for routing |

### Required Accounts/Keys

1. **Discord Bot Token** — Free from https://discord.com/developers/applications
2. **Anthropic API Key** — ~$3-15/month depending on usage
3. **Ollama** — Free, install from https://ollama.ai

### File Locations

All agent files are at:
```
/Users/MAC/Desktop/ClaudeCode/Marketing/.claude/worktrees/inspiring-germain/agency/
```

The bot should be built at:
```
/Users/MAC/Desktop/ClaudeCode/Marketing/.claude/worktrees/inspiring-germain/discord-bot/
```

### Phase 1 (MVP)
- Bot connects to Discord
- Reads agent files from disk
- Responds to @agent mentions with agent persona
- /standup command posts summary
- All responses go through Claude API (no local model yet)

### Phase 2 (Hybrid)
- Add Ollama integration for local model
- Implement model routing config
- Add cron jobs for daily standup
- Auto-save standups to .md files

### Phase 3 (Autonomous)
- Agents can trigger each other (waterfall)
- Task completion auto-notifies downstream agents
- Weekly sprint planning runs automatically
- Notion integration for standup storage

### Notion Integration (Future)
- Daily standup summaries → Notion database
- Sprint board → Notion kanban
- Agent reports → Notion pages
- Consider using Notion MCP connector when available

---

## Context Files to Read

When starting the Discord bot project, the new conversation should read these files in order:
1. `CLAUDE.md` — Full workspace overview
2. `.claude/product-marketing-context.md` — Product positioning
3. `agency/shared/brand-voice.md` — Writing tone rules
4. `agency/shared/roster.md` — Agent list
5. `agency/shared/protocols.md` — Handoff and escalation rules
6. `agency/shared/campaign-board.md` — Current sprint tasks
7. Any one agent's full profile (e.g., `agency/agents/tunde/`) to understand the file structure
