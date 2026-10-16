# Tempo — a pocket Pomodoro timer

A restrained black-base timer with a smoothly blended rainbow progress ring for GitHub Pages. No build, database, account, API key, or external libraries.

## Put it on your phone
1. Create a new public GitHub repository called `focus-timer`.
2. Unzip this download. Upload all the files inside it directly into the repository root. Do not upload the ZIP itself or put index.html in a nested folder.
3. Open repository Settings → Pages. Under deployment source, select Deploy from a branch; branch `main`; folder `/ (root)`. Save.
4. Once deployed, visit `https://YOUR-USERNAME.github.io/focus-timer/`.
5. On iPhone, open it in Safari, use Share → Add to Home Screen.

The code is public. Task names, settings, and session history are stored only in that browser's local storage, not in the repository. Devices do not sync. Clearing website data removes the saved history. A second timer tab on the same browser shares timer state; use one active tab for the simplest experience.

## Quick presets
Choose a preset in the Rhythm selector above the timer to prepare a fresh focus session:

| Preset | Focus | Short break | Long break |
| --- | --- | --- | --- |
| Writing | 25 min | 5 min | 15 min |
| Grading | 40 min | 10 min | 20 min |
| Deep work | 50 min | 10 min | 20 min |

Each preset schedules a long break after four completed focus sessions. Switching asks before discarding an unfinished timer. Completed sessions, cycle progress, your task, and sound/screen preferences are retained. Settings can customize any duration; the preset label changes to Custom rhythm when it no longer matches a preset.

## Use
- Default: 25-minute focus, 5-minute short break, 15-minute long break after four completed focus sessions.
- **+5 minutes** extends the current timer by five minutes, whether running, paused, or not yet started. It does not change your preset or saved duration settings. Paused timers stay paused.
- **Finish early** saves the actual focus time worked (excluding pauses), counts one focus session toward your long break, and prepares the next break without starting it. Available after at least one second of focus time. The history marks early finishes. Daily minutes are rounded for display, with values below 0.1 minute shown as <0.1.
- Start, pause, resume, reset, or skip. Resetting/skipping an unfinished focus session does not award focus time.
- Breaks and focus sessions require you to press Start; returning hours later cannot silently count multiple sessions.
- Settings change future timers; an already started session keeps its duration.
- Write one intention for your session. The latest intention is attached to the completed session.
- Today's totals include completed focus sessions, credited on the local date the timer ended. At most the most recent 500 completed sessions are retained, with the latest three from today displayed.
- A chime plays if enabled and the browser allows audio. Optional screen wake lock works only when supported and the app is visible.
- Timer progress survives refresh and is recalculated from a saved deadline after the app returns from the background. Phone operating systems can suspend webpages. The chime is **not a reliable locked-screen or closed-app alarm**; use the phone's Clock timer if you need that guarantee.
- Offline use works after a successful online visit and service-worker installation. No notifications/push backend is included.

## Local preview
Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Updates
For later app updates, increment the `?v=6` references in index.html and sw.js together and change the service-worker CACHE version. Close and reopen all app tabs after deployment.
