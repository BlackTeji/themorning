# AM — A Cinematic Wedding Invitation

A single-page, cinematic wedding website built with plain HTML5, CSS3, and
TypeScript (no framework, no bundler). The story of the day unfolds as one
continuous scroll — from **Before Dawn** to **Forever** — with the
background gradually lightening from deep burgundy to warm ivory as the
guest scrolls, echoing the couple's shared initials, **AM** — for Amara &
Julian, and for the first light of morning.

## Stack

- **HTML5 / CSS3** — semantic markup, custom properties, no CSS framework
- **TypeScript** — compiled to native ES modules (`tsc`, no bundler)
- **GSAP + ScrollTrigger** — the hero sequence, atmosphere color shifts, reveals
- **Lenis** — smooth scrolling, synced to the GSAP ticker
- **tsParticles** — the drifting light particles
- **Firebase Firestore** — RSVP storage
- **Firebase Hosting** — static hosting + PWA support

All third-party libraries are loaded as ES modules straight from a CDN
(`esm.sh`) via an [import map](index.html) in `index.html` — there is no
webpack/Vite/esbuild step. `tsc` compiles `ts/*.ts` → `js/*.js` and the
browser resolves the bare module specifiers (`"gsap"`, `"lenis"`, etc.)
directly.

## Project structure

```
├── index.html            Single-page markup for the whole experience
├── css/styles.css         Design system + all section styles
├── ts/                     TypeScript source (edit here)
│   ├── config.ts           ← All editable content lives here
│   ├── main.ts              Entry point / init order
│   ├── animations.ts        GSAP hero sequence + atmosphere + reveals
│   ├── heroVideo.ts          Hero background video + graceful fallback
│   ├── smoothScroll.ts      Lenis setup
│   ├── particles.ts         tsParticles setup
│   ├── firebase.ts          Firestore RSVP write (used only if RSVP_BACKEND = "firebase")
│   ├── googleSheets.ts      Google Sheets RSVP write (default backend)
│   ├── rsvpBackend.ts       Routes submitRsvp() to the selected backend
│   ├── rsvpForm.ts          Form validation + submission + confirmation
│   ├── countdown.ts         Live countdown timer
│   ├── gallery.ts           Masonry lightbox
│   ├── faqAccordion.ts      Accordion behavior
│   ├── audioToggle.ts       Ambient audio toggle (off by default)
│   ├── cursorGlow.ts        Desktop cursor glow
│   ├── progress.ts          Reading progress bar
│   ├── render.ts            Renders config data into the DOM
│   ├── icons.ts             Inline SVG icon library
│   └── types.ts             Shared TypeScript interfaces
├── js/                     Compiled output (generated — do not edit by hand)
├── google-apps-script/
│   └── Code.gs              Paste into Apps Script to power the Google Sheets RSVP backend
├── images/gallery/         Gallery images (SVG placeholders included)
├── assets/                 Favicon, OG image, apple touch icon, audio/
├── manifest.json           PWA manifest
├── sw.js                   Service worker (offline shell caching)
├── firebase.json           Firebase Hosting configuration
└── firestore.rules         Firestore security rules (write-only RSVPs)
```

## Getting started

```bash
npm install       # installs TypeScript + type packages for editor/tsc support
npm run build      # compiles ts/ → js/
npm run watch       # recompiles on save while you work
```

Then serve the project root with any static file server, e.g.:

```bash
npx serve .
# or
firebase emulators:start --only hosting
```

## Customizing content

Almost everything you'd want to change — names, the wedding date, venue
details, the story timeline, FAQs, gift copy — lives in **`ts/config.ts`**.
Edit it, run `npm run build`, and reload.

### Swapping in real photography

Replace the files in `images/gallery/` (currently elegant gradient
placeholders) with real photos of the same filenames, or update the `src`
paths in the `GALLERY` array in `ts/config.ts`. Large photos should be
compressed/resized (long edge ~1600px is plenty) before adding them, to
keep the lazy-loaded masonry gallery fast.

### Hero background video (sunrise over the beach)

The hero can show a looping video instead of (behind) the gradient — a
scrim automatically darkens/tints it so the monogram and names stay
legible, and it fades between the atmosphere colors just like the
gradient-only version does.

1. Set `HERO_MEDIA.enabled = true` in `ts/config.ts` (on by default).
2. Add your clip at:
   - `assets/video/hero-sunrise.mp4` (H.264, required — the universal fallback)
   - `assets/video/hero-sunrise.webm` (VP9, optional — smaller file size on browsers that support it)
3. Optionally replace `assets/video/hero-poster.svg` with a still frame
   from your video (JPG/PNG/SVG all work) — it shows instantly while
   the video loads.
4. `npm run build` and reload.

**Specs that work well:** 1920×1080, a 10–20 second *seamless* loop
(same first and last frame, or a slow enough pan that the cut is
invisible), no audio track needed since it always plays muted.
Compress to roughly 4–10MB — guests are here for the invitation, not a
9MB-per-second download. `ffmpeg -i in.mov -vf scale=1920:-2 -c:v
libx264 -crf 23 -an -movflags +faststart hero-sunrise.mp4` is a solid
starting point; add `-c:v libvpx-vp9 -b:v 1M` for the `.webm`.

**If you don't have footage yet:** the site works beautifully without
one — it simply shows the animated gradient (the original design).
For royalty-free sunrise/beach footage, sites like Pexels, Coverr, and
Mixkit are good starting points; just confirm the specific clip's
license permits your use.

**Built-in safety net:** if the files are missing, still loading, an
unsupported format, or the guest has `prefers-reduced-motion` or a
data-saver connection enabled, the hero automatically and silently
falls back to the gradient-only design — no broken video icon, no
layout shift, no console errors.



Drop a royalty-free piano/strings/birdsong track at
`assets/audio/dawn-ambience.mp3`. Playback is **off by default** and only
ever starts when a guest taps the sound toggle — it will never autoplay.

### Fonts

Headings use **Cormorant Garamond**, body copy uses **Jost**, both loaded
from Google Fonts in `index.html`. To self-host (recommended for the
best Lighthouse score and full offline support), download the woff2
files into `fonts/` and replace the `<link>` tags with `@font-face`
declarations at the top of `css/styles.css`.

## RSVP data: Google Sheets or Firebase

RSVP submissions can go to either a **Google Sheet** (the default —
no backend to host, no project to create beyond the Sheet itself) or
**Firebase Firestore**. Switch between them with one line in
`ts/config.ts`:

```ts
export const RSVP_BACKEND: "google-sheets" | "firebase" = "google-sheets";
```

The form code (`ts/rsvpForm.ts`) never changes — it always calls
`submitRsvp()` from `ts/rsvpBackend.ts`, which routes to whichever
backend is selected.

### Option A — Google Sheets (default)

1. Create a new Google Sheet (e.g. "AM Wedding RSVPs").
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of
   `google-apps-script/Code.gs` from this project.
4. Click **Deploy → New deployment**.
   - Select type **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, then authorize the permissions Google asks for
     (you'll see an "unverified app" warning the first time — that's
     expected for a script only you use; click through it).
5. Copy the **Web app URL** (it ends in `/exec`) and paste it into
   `GOOGLE_SHEETS_WEB_APP_URL` in `ts/config.ts`.
6. `npm run build`, then submit a test RSVP on the site and confirm a
   new row appears in the Sheet.

**Worth knowing:** the browser can't read the response from an Apps
Script Web App across origins, so the site sends the request with
`mode: "no-cors"` and treats "the request didn't throw" as success —
it can't detect an error *inside* the script (e.g. a bug in `Code.gs`
or the Sheet being deleted). This is the standard, well-understood
tradeoff for this integration; test it after setup and check the
Sheet periodically. Apps Script's free quota (tens of thousands of
requests/day) is far more than a wedding site will ever need.

Whenever you edit `Code.gs`, use **Deploy → Manage deployments → Edit
→ New version** so the changes go live at the same URL — creating a
brand-new deployment instead gives you a different URL.

### Option B — Firebase Firestore

1. Set `RSVP_BACKEND = "firebase"` in `ts/config.ts`.
2. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
3. Enable **Firestore** (production mode).
4. In **Project settings → General → Your apps**, create a Web App and
   copy the config object into `FIREBASE_CONFIG` in `ts/config.ts`.
5. Deploy the security rules in `firestore.rules` (they allow guests to
   *create* an RSVP but never read, edit, or delete submissions —
   only you, via the Firebase Console or Admin SDK, can view them).
   This is a Firestore-only deploy — it doesn't touch hosting, so you
   run it regardless of where the site itself is hosted:
   ```bash
   firebase deploy --only firestore:rules
   ```
6. Host the site wherever you like — see **Deploying to Vercel** below
   (recommended), or `firebase deploy --only hosting` if you'd rather
   keep everything on Firebase.

Either way, submissions carry each guest's name, contact info,
attendance, guest count, dietary notes, and message.

## Deploying to Vercel

This site needs no build step on Vercel's side — `js/` is already the
final compiled output, so Vercel just serves the files as-is. This is
Vercel's own recommended setup for a plain HTML/CSS/JS site.

**Via the dashboard:**
1. Push this project to a GitHub/GitLab/Bitbucket repo (`node_modules`
   should stay out of it — it's already covered by `.gitignore`).
2. In Vercel, **Add New → Project**, import the repo.
3. Framework Preset: **Other**. Leave Build and Install Command blank
   (or trust `vercel.json`, which already sets both to empty).
4. Deploy.

**Via the CLI**, from the project root:
```bash
npm install -g vercel
vercel        # first run links/creates the project and deploys a preview
vercel --prod # promotes to your production domain
```

`vercel.json` is already set up to skip the install/build steps
entirely and serve the project root directly, with long-lived cache
headers on `css/`, `js/`, `images/`, and `assets/`, and always-revalidate
headers on `index.html`, `sw.js`, and `manifest.json` so guests never
get stuck on a stale cached version of the page itself. `.vercelignore`
keeps dev-only files (`ts/`, `node_modules`, Firebase Hosting config,
etc.) out of the deployment — none of it is needed to serve the site.

**Custom domain:** add it under the Vercel project's **Settings →
Domains** tab and follow the DNS instructions there.

Remember: whichever backend you chose above (Google Sheets or
Firebase), it's completely independent of where the static site is
hosted — the RSVP form talks directly to Google's or Firebase's APIs
from the guest's browser, not through your host. You can move hosting
between Vercel, Firebase Hosting, Netlify, or anywhere else at any
time without touching your RSVP setup.


## Accessibility & performance notes

- Semantic landmarks (`<main>`, `<footer>`, headings in order) and a skip link.
- All interactive controls (accordion, lightbox, audio toggle, form) are
  keyboard operable with visible focus states and appropriate ARIA.
- `prefers-reduced-motion` disables the hero sequence, particles, cursor
  glow, and parallax, falling back to a simple faded-in layout.
- Images are lazy-loaded (`loading="lazy"`) and use `decoding="async"`.
- The service worker caches the core shell so the invitation still opens
  on a flaky connection.

## Notes on the CDN import map approach

Using an import map instead of a bundler keeps the project genuinely
framework-free and easy to reason about, at the cost of an extra
network round-trip per module on first load (mitigated by HTTP/2 and
browser caching). If you later want a single bundled `main.js` for
production, you can run any ESM-aware bundler (esbuild, Rollup, Vite)
against `js/main.js` with `gsap`, `lenis`, `tsparticles*`, and
`firebase/*` externalized or installed locally — no source changes
required.
