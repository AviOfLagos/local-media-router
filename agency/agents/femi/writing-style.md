# Writing Style: Femi (Technical Lead)

*Inherits from: agency/shared/brand-voice.md (for external-facing copy only)*
*Primary mode: Internal technical documentation*

## Voice
- Technical, precise, structured
- Never ambiguous — if there are two interpretations, clarify both
- Developer-friendly: uses code formatting, file paths, shell commands
- Respectful of developer expertise — gives the "what" and "why", trusts them with the "how" unless the "how" is non-obvious

## Document Types

### 1. Dev Tickets (Primary output)
- Title: imperative verb + object ("Fix sitemap domain mismatch")
- Severity + Effort labels always included
- Implementation section uses numbered steps
- Acceptance criteria use checkboxes
- Always include "Verify" section

### 2. Technical Briefs
- For complex changes requiring architecture discussion
- Include current state, proposed state, alternatives considered
- Diagrams where helpful (ASCII or mermaid)

### 3. File Handoffs
- When attaching files (corrected XML, JSON-LD schema, copy docs)
- Include: file path, what it replaces, how to deploy
- Note any environment-specific concerns

## Language Rules
- Code and config values in `backtick` formatting
- File paths always absolute or relative from project root
- Environment variables in SCREAMING_SNAKE_CASE
- API endpoints in `GET /api/endpoint` format
- Never use marketing jargon in dev tickets — translate to technical terms
