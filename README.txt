Bishop's Companion — install bundle
===================================

Files:
  index.html  - the whole app (everything is inside this one file)
  sw.js       - service worker, makes it work fully offline once installed
  icon.png    - the Home Screen icon

These three files must stay together in the SAME folder when you host them.

HOW TO INSTALL ON YOUR iPhone / iPad
1. Host the folder (see the chat for step-by-step host options).
2. Open the resulting https:// link in Safari (not Chrome).
3. Tap Share -> Add to Home Screen -> Add.

Your data lives only on the device. Nothing you enter is uploaded.

────────────────────────────────────────
SECURITY (hardening notes)
────────────────────────────────────────
This app is built to be safe by design:
 • Zero network calls — your records never leave the device. No analytics,
   no servers, no third-party scripts. (Church reference links open in your
   browser only when you tap them.)
 • A strict Content-Security-Policy is baked into the page: it blocks any
   connection to outside origins, blocks embedded objects, and prevents the
   page from being framed.
 • Member records can be encrypted behind a passcode (AES-GCM, PBKDF2).
   The directory auto-locks after 5 minutes idle and when you switch apps.
 • External links carry no-referrer / noopener. PDF import runs on-device
   with code execution disabled in the parser.

For the strongest setup, host with these HTTP headers. If you use Netlify,
the included "_headers" file applies them automatically. On other hosts,
set the equivalent headers in your server/host config. (GitHub Pages cannot
set custom headers; the in-page CSP still applies there.)

Keep your exported backup somewhere safe — it contains your data in plain
form unless the member lock is on. Treat it like any sensitive document.
