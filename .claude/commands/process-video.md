# Process Video Transcript

Extract a transcript from any video URL (YouTube, Instagram, TikTok, or 1000+ other platforms).

## Arguments
- `$ARGUMENTS` — The video URL to process

## Workflow

1. **Detect the platform** from the URL:
   - YouTube: URLs containing `youtube.com`, `youtu.be`, or `youtube.com/shorts`
   - Instagram: URLs containing `instagram.com`
   - Other: Everything else

2. **Extract the transcript**:

   **For YouTube videos**, use the fast Python API first:
   ```bash
   python3 -c "
   from youtube_transcript_api import YouTubeTranscriptApi
   video_id = '$ARGUMENTS'.split('v=')[-1].split('&')[0].split('/')[-1].split('?')[0]
   ytt_api = YouTubeTranscriptApi()
   transcript = ytt_api.fetch(video_id)
   for entry in transcript:
       print(entry.text)
   "
   ```
   If that fails, fall back to yt-dlp:
   ```bash
   yt-dlp --write-auto-subs --skip-download --sub-format txt -o "transcript" "$ARGUMENTS"
   ```

   **For Instagram and all other platforms**, use yt-dlp:
   ```bash
   yt-dlp --write-auto-subs --write-subs --skip-download --sub-format txt -o "transcript" "$ARGUMENTS"
   ```
   If no subtitles are available, download audio and note that manual transcription would be needed.

3. **Format the transcript** as a clean markdown file with this header:
   ```markdown
   # Video Transcript

   - **URL**: [original URL]
   - **Platform**: [youtube/instagram/other]
   - **Date Processed**: [today's date]
   - **Title**: [video title if available]

   ---

   [Clean transcript text, formatted into paragraphs]
   ```

4. **Save the file** to `marketing/transcripts/{platform}/{video-id}.md`
   - For YouTube: use the video ID as filename
   - For Instagram: use the post/reel ID
   - For others: use a sanitized slug from the URL

5. **Output a summary**:
   - Confirm the file was saved and its path
   - Show the first 5-10 lines of the transcript as a preview
   - Report approximate word count
   - Ask if the user wants to run `/save-strategy` to extract marketing strategies from it
