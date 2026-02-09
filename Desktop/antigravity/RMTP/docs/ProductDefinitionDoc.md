🧱 1. PRODUCT DEFINITION DOC (PDD)
This is the “source of truth.” If this is wrong, everything fails.
Purpose
Defines what the system is, not how.
Must include:
Project Name: Local Media Router (LMR)
Core Goal (MVP):
 Receive RTMP video locally and forward it to:
OBS (pull)
At least 1 external RTMP destination (push)
MVP Success Criteria ✔ DJI can stream to LMR
 ✔ OBS can view stream
 ✔ LMR can forward to YouTube test endpoint
 ✔ UI can start/stop outputs
 ✔ System survives stream drop
Non-Goals (IMPORTANT)
 ❌ No cloud
 ❌ No AI features
 ❌ No recording
 ❌ No accounts/users
This prevents feature creep.

🧠 2. SYSTEM ARCHITECTURE DOC
This prevents AI agents from inventing random structures.
Must define:
Layers
Media Layer → NGINX + RTMP
Control Layer → Node.js API
Processing Layer → FFmpeg workers
UI Layer → React
Communication Rules
UI talks ONLY to Node API
Node talks to FFmpeg via child processes
NGINX is NEVER modified dynamically
Ports
RTMP Ingest: 1935
API: 4000
UI: 3000

🧩 3. FEATURE SPEC FILE (THE MOST IMPORTANT)
This is what AI checks before claiming a feature is done.
Each feature must follow:
Feature: RTMP Ingest Detection

Description:
System detects when a stream starts or stops.

Inputs:
RTMP stream enters nginx

Outputs:
API updates stream status

Success Criteria:
- API returns stream status = LIVE within 2 seconds
- When stream stops, status becomes OFFLINE within 5 seconds

Failure Cases:
- Stream disconnects mid-session
- Stream bitrate drops to 0

AI builds → checks against this → marks done.

🧪 4. TEST SCENARIO DOC
This is what prevents “it works on my machine” syndrome.
Each test:
Test: OBS Pull Test

Steps:
1. Start LMR
2. Push test stream
3. Open OBS → add media source

Expected:
Video appears in OBS within 3 seconds
No buffering

Antigravity must run tests before marking complete.

🧑‍💻 5. CODING STANDARDS DOC
Prevents spaghetti code from AI agents.
Backend Rules
TypeScript only
No business logic in routes
Services must be isolated
All FFmpeg commands in one service
Frontend Rules
Functional components only
No direct API calls inside UI components
State via hooks only

🧭 6. TASK BOARD FILE (AI OPERATIONS LOG)
This replaces Jira.
[ ] Setup NGINX RTMP
[ ] Node server skeleton
[ ] Stream detection module
[ ] Output relay module
[ ] UI control panel
[ ] Test OBS pull

AI updates status:
PENDING
IN PROGRESS
TESTED
FAILED

🚨 7. ERROR HANDLING SPEC
AI never handles errors properly unless told.
Must define:
Situation
System Behavior
Stream drops
Retry FFmpeg in 5s
CPU > 90%
Reduce output bitrate
No internet
Pause external push


📊 8. METRICS SPEC
Prevents blind system.
Must track:
CPU %
Memory
Stream bitrate
Dropped frames
Output success/fail

🧩 9. DEFINITION OF DONE (CRITICAL)
Feature is NOT done until:
✔ Code written
 ✔ Test passed
 ✔ Edge cases handled
 ✔ Logs exist
 ✔ UI reflects status

🧠 HOW YOU USE THIS WITH ANTIGRAVITY
You assign agents:
Agent
Responsibility
Frontend Agent
UI
Backend Agent
API
Media Agent
FFmpeg/NGINX
You (Reviewer Agent)
Validation

Each agent:
Reads Product Doc
Builds from Feature Spec
Tests using Test Doc
Marks Task Board

🎯 WHY PROJECTS DIE (AND WE AVOID IT)
Reason
Our Fix
Scope creep
Non-Goals section
AI invents architecture
Architecture Doc
“It works” but not really
Test Doc
Spaghetti code
Coding Standards
No progress tracking
Task Board
No edge cases
Error Spec


🏁 YOUR MVP PATH (FASTEST SHIP)
We focus on ONE FLOW:
DJI → LMR → OBS

Once this works, everything else is extensions.


