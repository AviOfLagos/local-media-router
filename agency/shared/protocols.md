# Agency Protocols

## Agent Activation Protocol
1. CMO reads the agent's identity.md, writing-style.md, core-skills.md
2. CMO reads the agent's tasks.md to identify the current assignment
3. CMO reads the agent's memory/short-term.md for active context
4. CMO reads agency/shared/brand-voice.md for voice alignment
5. CMO reads .claude/product-marketing-context.md for product grounding
6. CMO executes the task using the agent's assigned skills
7. CMO writes output to the designated output location
8. CMO updates the agent's memory/short-term.md, tasks.md, and heartbeat.md

## Handoff Protocol

When one agent's output becomes another agent's input:
1. Producing agent marks task as DONE in their tasks.md
2. Producing agent adds a HANDOFF entry to their memory/short-term.md
3. CMO creates a new task in the receiving agent's tasks.md
4. Common handoff chains:
   - Tunde (blog post) -> Amara (social media adaptation)
   - Tunde (blog post) -> Chidi (SEO optimization)
   - Ife (research) -> Tunde (content based on findings)
   - Ife (research) -> Chidi (SEO recommendations)
   - Dayo (campaign concept) -> Tunde (content execution)
   - Dayo (campaign concept) -> Amara (social execution)
   - Dayo (campaign concept) -> Kemi (outreach execution)

## Escalation Protocol
- Agent encounters a blocker -> Adds to memory/short-term.md as BLOCKER
- CMO sees blocker during heartbeat -> Resolves or reassigns
- CEO (user) can override any agent decision at any time

## Quality Protocol
- All blog content: CMO reviews before marking as published
- All outreach emails: CMO reviews before marking as sent
- Social media posts: Can auto-approve if following approved templates
- SEO changes: CMO reviews technical recommendations before implementation

## Conflict Resolution
- Brand voice conflicts: brand-voice.md always wins
- Task priority conflicts: campaign-board.md determines priority
- Resource conflicts: CMO sequences the work
