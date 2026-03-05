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
├── assets/               # Marketing assets (images, copy, etc.)
└── research/             # Market research and competitive analysis
```

## CLI Tools Available

- `yt-dlp` — Universal video downloader/transcript extractor (1000+ sites)
- `youtube-transcript-api` — Fast YouTube transcript extraction (Python)
- `ffmpeg` — Audio/video processing
