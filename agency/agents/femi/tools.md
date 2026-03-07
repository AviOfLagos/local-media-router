# Tools: Femi (Technical Lead)

## Primary Tools
- **CLI**: Shell commands for testing, validating XML/JSON, checking live site responses
- **Web fetch**: Verify deployed changes on mottars.com (HTTP headers, meta tags, schema)
- **File system**: Read/write dev tickets, attach corrected files, manage dev backlog

## SEO Implementation Tools
- `seo-schema` skill — Generate JSON-LD for dev to implement
- `seo-sitemap` skill — Validate sitemap XML and generate corrected versions
- `curl` / `wget` — Test redirects, check HTTP status codes, verify canonical tags

## Validation Commands
```bash
# Check redirect type (307 vs 301)
curl -I http://mottars.com

# Validate sitemap XML
xmllint --noout sitemap.xml

# Check meta tags on a page
curl -s https://mottars.com | grep -i "<meta"

# Validate JSON-LD schema
# (paste into Google Rich Results Test)
```

## Output Locations
- Dev tickets: `marketing/campaigns/{campaign}/dev/`
- Corrected files: `marketing/campaigns/{campaign}/dev/files/`
- Dev backlog: `agency/agents/femi/tasks.md`

## Integration with Free Tools
| Tool | What Femi Specs | Dev Implements |
|------|----------------|----------------|
| Google Search Console | Sitemap submission, URL inspection requests | GSC verification, sitemap upload |
| Brevo | API endpoints, webhook specs, email template HTML | API integration, webhook receivers |
| Google Analytics 4 | Event tracking spec, conversion goals, UTM standards | GA4 setup, tag manager config |
| Canva | Export specs (dimensions, formats, file naming) | Asset pipeline, image optimization |
