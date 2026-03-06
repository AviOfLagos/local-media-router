# Mottars.com Marketing Workspace

## Product

**Mottars** — Nigeria's trusted automotive marketplace for buying, selling, and renting quality vehicles.

- **URL**: https://mottars.com
- **Founded**: 2024, Victoria Island, Lagos
- **Contact**: info@mottars.com
- **Categories**: Vehicle sales (new & used), auto parts, mechanic services
- **Markets**: Lagos, Abuja, Ibadan (expanding Nigeria-wide)
- **Key features**: Split payments, verified dealers, request-a-car, vehicle history reports, multi-city coverage

## Before Any Marketing Task

Always read `.claude/product-marketing-context.md` first — it contains positioning, audience, competitors, and brand voice that all marketing skills reference automatically.

---

## Virtual Marketing Agency

This workspace runs a **persistent multi-agent marketing agency** with 6 specialized agents, a task board, and a heartbeat sync system.

### Quick Commands

| Command | What It Does |
|---------|-------------|
| `/heartbeat` | Sync all agents — reads state files, reports status and blockers |
| `/board` | View the campaign task board with statuses and dependencies |
| `/standup` | Get a daily standup report from all agents |
| `/sprint` | Plan the next weekly sprint and assign tasks |
| `/assign {agent} {task}` | Assign a task to a specific agent |
| `/activate {agent}` | Switch to an agent's persona for direct work |
| `/agency-status` | Full dashboard — goals vs actual, pipeline, inventory |

### The Team

| Agent | Code | Role | Activates With |
|-------|------|------|---------------|
| **Tunde** | `tunde` | Content Writer | `/activate tunde` |
| **Amara** | `amara` | Social Media Manager | `/activate amara` |
| **Chidi** | `chidi` | SEO Specialist | `/activate chidi` |
| **Kemi** | `kemi` | Growth/Outreach | `/activate kemi` |
| **Dayo** | `dayo` | Creative Strategist | `/activate dayo` |
| **Ife** | `ife` | Analytics/Research | `/activate ife` |

**CMO** = Claude (main session) — orchestrates agents, reviews work, plans sprints

### Content Waterfall (Cross-Agent Coordination)
```
Ife researches -> Dayo creates concept -> Tunde writes blog -> Chidi SEO-optimizes -> Amara adapts to social -> Kemi includes in email
```

### Key Files
- **Brand voice**: `agency/shared/brand-voice.md` — THE source of truth for writing tone
- **Task board**: `agency/shared/campaign-board.md` — master sprint/task tracker
- **Goals**: `agency/shared/goals.md` — monthly targets and KPIs
- **Roster**: `agency/shared/roster.md` — agent status at a glance
- **Protocols**: `agency/shared/protocols.md` — handoff, escalation, quality rules
- **Playbook**: `agency/shared/agent-playbook.md` — how to manage agents
- **Documentation**: `agency/docs/index.html` — open in browser for full overview

### Agent File Structure
Each agent has 8 files at `agency/agents/{code}/`:
```
identity.md        — Name, personality, role, communication style
writing-style.md   — Voice rules (inherits from brand-voice.md)
core-skills.md     — Primary + secondary skills
tools.md           — Specific tools/connectors
tasks.md           — Current task queue
heartbeat.md       — Last sync timestamp, status
memory/short-term.md — Active work context
memory/long-term.md  — Learnings, patterns, history
```

---

## Installed Skills

### Core Marketing (Corey Haines Suite)
- `content-strategy` — Plan content that drives traffic and builds authority
- `copywriting` — Write compelling copy using proven frameworks
- `marketing-psychology` — Apply psychological principles to marketing
- `product-marketing-context` — Maintain product positioning document
- `launch-strategy` — Plan and execute product launches
- `pricing-strategy` — Develop pricing models and communication
- `seo-audit` — Comprehensive SEO analysis
- `programmatic-seo` — Scale SEO with programmatic content
- `email-sequence` — Design email nurture sequences
- `free-tool-strategy` — Build free tools for lead generation
- `social-content` — Create social media content strategies
- `cold-email` — Write effective cold outreach

### Video & Research
- `youtube-transcript` — Extract transcripts from YouTube videos
- `video-transcript-downloader` — Download transcripts from any video platform via yt-dlp
- `instagram-research` — Analyze high-performing Instagram content

### Social Media
- `social-media-marketing` — Full social media marketing strategy

### SEO Suite (Built-in)
- `seo`, `seo-audit`, `seo-page`, `seo-sitemap`, `seo-schema`, `seo-geo`, `seo-plan`, `seo-competitor-pages`, `seo-hreflang`

## Video Transcript Workflow

1. **Process any video**: Use `/process-video <URL>` to extract transcript from YouTube, Instagram, or any supported platform
2. **Save strategies**: Use `/save-strategy` to extract and categorize marketing strategies from a transcript
3. **Browse strategies**: Use `/list-strategies` to search saved strategies by category
4. **Dashboard**: Use `/mottars-status` for a quick overview of transcripts, strategies, and activity

## Directory Structure

```
agency/                   # Virtual marketing agency system
├── shared/               # Shared config (brand voice, goals, roster, protocols)
├── agents/               # 6 agent profiles (identity, memory, tasks, heartbeat)
│   ├── tunde/            # Content Writer
│   ├── amara/            # Social Media Manager
│   ├── chidi/            # SEO Specialist
│   ├── kemi/             # Growth/Outreach
│   ├── dayo/             # Creative Strategist
│   └── ife/              # Analytics/Research
└── docs/                 # HTML documentation (index.html + style.css)

marketing/
├── transcripts/          # Extracted video transcripts
│   ├── youtube/
│   ├── instagram/
│   └── other/
├── strategies/           # Saved marketing strategies
│   ├── content/
│   ├── growth/
│   ├── social/
│   ├── seo/
│   ├── paid/
│   └── general/
├── campaigns/            # Campaign plans and assets
│   └── trust-awareness-m1/  # Current campaign
│       ├── content/blog/
│       ├── content/social/
│       ├── outreach/
│       ├── email/
│       ├── creative/
│       ├── seo/
│       └── reports/
├── assets/               # Marketing assets (images, copy, etc.)
└── research/             # Market research and competitive analysis
```

## Free Tools (No Paid Services)

| Tool | Use | Integration |
|------|-----|-------------|
| Buffer (free) | Social scheduling (3 channels, 10 posts) | Chrome browser automation |
| Brevo (free) | Email marketing (300 emails/day) | Chrome browser automation |
| Google Search Console | SEO analytics | Chrome browser automation |
| Google Analytics 4 | Traffic analytics | Chrome browser automation |
| Canva (free) | Graphics/design | Chrome browser automation |
| yt-dlp | Video transcripts | CLI (installed) |
| youtube-transcript-api | YouTube transcripts | Python (installed) |

## CLI Tools Available

- `yt-dlp` — Universal video downloader/transcript extractor (1000+ sites)
- `youtube-transcript-api` — Fast YouTube transcript extraction (Python)
- `ffmpeg` — Audio/video processing
