# Save Marketing Strategy

Extract marketing strategies from a transcript and save them for future reference.

## Arguments
- `$ARGUMENTS` — Path to a transcript file, or "latest" to use the most recently saved transcript

## Workflow

1. **Find the transcript**:
   - If `$ARGUMENTS` is "latest" or empty, find the most recently modified `.md` file in `marketing/transcripts/`
   - Otherwise, read the file at the specified path

2. **Read `.claude/product-marketing-context.md`** to understand Mottars.com's positioning, audience, and goals.

3. **Analyze the transcript** and extract every distinct marketing strategy, tactic, or insight mentioned. For each one, capture:
   - **Strategy name**: A clear, descriptive title
   - **Category**: One of `content`, `growth`, `social`, `seo`, `paid`, or `general`
   - **Summary**: 2-3 sentence description of the strategy
   - **Key steps**: Actionable steps to implement it
   - **Mottars.com application**: How specifically this strategy could be applied to Mottars.com's automotive marketplace in Nigeria — reference specific features, audience segments, or goals from the product context

4. **Save each strategy** as a separate markdown file at `marketing/strategies/{category}/{strategy-name-slug}.md` with this format:
   ```markdown
   # [Strategy Name]

   **Category**: [category]
   **Source**: [transcript filename and video URL]
   **Date**: [today's date]

   ## Summary
   [2-3 sentence description]

   ## Key Steps
   1. [step]
   2. [step]
   3. [step]

   ## How to Apply to Mottars.com
   [Specific application notes referencing Mottars features, audience, market]

   ## Action Items
   - [ ] [specific next action]
   - [ ] [specific next action]
   - [ ] [specific next action]
   ```

5. **Output a summary**:
   - List all strategies extracted with their categories
   - Show the file paths where each was saved
   - Highlight the top 3 most impactful strategies for Mottars.com
   - Show total count by category
