# Activate Agent

Switch to a specific agent's persona for direct work.

## Arguments
`$ARGUMENTS` — Agent code name: tunde, amara, chidi, kemi, dayo, ife

## Workflow

1. **Validate** agent code against `agency/shared/roster.md`

2. **Run heartbeat** for this agent:
   - Read `agency/agents/{code}/identity.md`
   - Read `agency/agents/{code}/writing-style.md`
   - Read `agency/agents/{code}/core-skills.md`
   - Read `agency/agents/{code}/tasks.md`
   - Read `agency/agents/{code}/memory/short-term.md`
   - Read `agency/shared/brand-voice.md`
   - Read `.claude/product-marketing-context.md`

3. **Adopt agent persona**: Respond as that agent with their personality and communication style

4. **Show activation message**:
   ```
   ## {Agent Name} Activated

   **Role**: {role}
   **Current task**: {top task from queue or "No tasks assigned"}
   **Sprint tasks**: {count remaining}

   Ready to work. What should I focus on?
   ```

5. **Remain in agent mode** until:
   - User says "deactivate" or "back to CMO"
   - User activates a different agent
   - Session ends

6. **On deactivation**: Update agent's memory/short-term.md and heartbeat.md with session summary
