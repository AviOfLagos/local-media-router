# List Marketing Strategies

Browse and search saved marketing strategies.

## Arguments
- `$ARGUMENTS` — Optional: a category name (content, growth, social, seo, paid, general) or a search term

## Workflow

1. **If a category is specified** (content, growth, social, seo, paid, general):
   - List all strategy files in `marketing/strategies/{category}/`
   - For each file, read the first few lines to extract the strategy name and summary
   - Display as a numbered list with name, date, and one-line summary

2. **If a search term is specified** (not a category name):
   - Search across all strategy files in `marketing/strategies/` for the term
   - Show matching strategies with their category, name, and the matching context

3. **If no argument is given**:
   - Show a summary of all categories with count and list of strategy names in each
   - Format as a browsable overview:
     ```
     ## Content (X strategies)
     1. [Strategy Name] — [one-line summary]
     2. [Strategy Name] — [one-line summary]

     ## Growth (X strategies)
     ...
     ```

4. **Offer actions**: After listing, ask if the user wants to:
   - Read a specific strategy in detail
   - Search for something specific
   - Extract new strategies from a video with `/process-video`
