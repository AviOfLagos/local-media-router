# Mottars Marketing Dashboard

Show a quick status overview of the marketing workspace.

## Workflow

1. **Count transcripts** by platform:
   ```bash
   find marketing/transcripts/youtube -name "*.md" ! -name ".gitkeep" | wc -l
   find marketing/transcripts/instagram -name "*.md" ! -name ".gitkeep" | wc -l
   find marketing/transcripts/other -name "*.md" ! -name ".gitkeep" | wc -l
   ```

2. **Count strategies** by category:
   ```bash
   for cat in content growth social seo paid general; do
     echo "$cat: $(find marketing/strategies/$cat -name "*.md" ! -name ".gitkeep" | wc -l)"
   done
   ```

3. **Show recent activity** — list the 5 most recently modified files across transcripts and strategies.

4. **Display as a dashboard**:
   ```
   ## Mottars.com Marketing Dashboard

   ### Transcripts
   - YouTube: X
   - Instagram: X
   - Other: X
   - Total: X

   ### Strategies
   - Content: X
   - Growth: X
   - Social: X
   - SEO: X
   - Paid: X
   - General: X
   - Total: X

   ### Recent Activity
   - [filename] — [date]
   - [filename] — [date]
   ...
   ```

5. **Suggest next actions** based on what's empty or underrepresented.
