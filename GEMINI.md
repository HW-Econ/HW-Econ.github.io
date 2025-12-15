
# Build Prompt for “Lab Notebook” Research Sessions Site (GitHub Pages)

You are an autonomous coding agent. Your task is to create a static website hosted on GitHub Pages for casual research/brown-bag review sessions. The site must be easy to maintain by non-web developers and should feel fun and engaging via a “Lab Notebook” theme. Content will be authored as Markdown files with YAML front matter. The seminar series will be called "Early Career Economics Seminar Series (ECESS)" at the Edinburgh Business School, Heriot-Watt University.

## Primary Goals
1. **Simple maintenance**: Adding/updating sessions should be done by editing/adding Markdown files in a folder.
2. **Static hosting**: Deploy to **GitHub Pages**.
3. **Interactive UX (static-friendly)**: Client-side filtering/search, “Next up” panel, countdown timer, add-to-calendar.
4. **Playful but professional**: “Lab notebook” look and micro-interactions.

## Non-Goals
- No server-side code, databases, auth, or user accounts.
- No heavy SPA framework requirement for the whole site (interactivity should be minimal JS).

---

## Tech Stack Decision
Use **Astro** (static output) with:
- **Content Collections** for session Markdown ingestion and validation.
- **Minimal client-side JS** for filtering/search and countdown.
- Vanilla CSS (or a small utility approach) for styling. Keep dependencies minimal.

Rationale:
- Authors update sessions via Markdown + front matter.
- Build-time generation of pages and indices is straightforward.
- Static output works well for GitHub Pages.

---

## Required Pages and Behavior

### 1) Home (`/`)
- “Next up” card prominently displayed (closest future session).
- “This week” list (Mon–Sun grouping in local time).
- Quick actions:
  - Link to full schedule
  - “Add calendar” (either an overall calendar file or instructions)
- Small playful elements consistent with lab notebook theme:
  - Subtle paper texture background
  - Margin annotations / “sticky note” callouts

### 2) Schedule (`/schedule/`)
- List of upcoming sessions grouped by month and/or week.
- Interactive controls:
  - Filter chips for `series` and `tags`
  - Search input matching title/speaker/abstract
  - Toggle: Upcoming / Past
- URL query parameters should reflect state:
  - `?q=...&tags=...&series=...&view=upcoming`

### 3) Session Detail (`/sessions/<slug>/`)
- Title, speaker, affiliation (optional), date/time, location/Zoom link
- Abstract (Markdown body)
- Links block (slides/paper/repo/notes)
- “Feedback wanted” pills (optional)
- Add-to-calendar button (ICS download or pre-generated ICS file per session)

### 4) About (`/about/`)
- What this is, norms, how to present, how to propose a talk
- Contact / maintainer link

### 5) Archive (`/archive/`)
- Past sessions list with filter/search (may reuse schedule component with `view=past` default)

---

## Content Authoring Model

### Sessions live in:
`src/content/sessions/*.md`

### Session front matter schema (YAML)
Required:
- `title` (string)
- `date` (YYYY-MM-DD, string)
- `start` (HH:MM, 24h string)
- `end` (HH:MM, 24h string)
- `speaker` (string)
Optional:
- `affiliation` (string)
- `series` (string, e.g., “Brown Bag”, “PhD WIP”)
- `location` (string)
- `tags` (string[])
- `links` (object)
  - `slides` (url)
  - `paper` (url)
  - `repo` (url)
  - `notes` (url)
  - `video` (url)
- `feedback_wanted` (string[], e.g., ["clarity", "methods", "positioning"])
- `draft` (boolean) — if true, exclude from production pages

Body:
- Markdown abstract (short preferred; allow longer)

### Sample session file
Create `src/content/sessions/2026-01-13-error-bars.md`:

```yaml
---
title: "How to Not Lie With Error Bars"
speaker: "A. Researcher"
affiliation: "PhD Year 2"
date: 2026-01-13
start: "12:30"
end: "13:15"
location: "Seminar Room 3 / Zoom"
series: "Brown Bag"
tags: ["statistics", "visualization", "methods"]
links:
  slides: "https://example.com/slides"
  paper: "https://example.com/paper"
feedback_wanted: ["clarity", "positioning"]
---
A short abstract written in Markdown. Keep it friendly and accessible.
````

---

## Information Architecture and Components

### Core components

* `Layout.astro` — global shell, nav, footer
* `NotebookHeader.astro` — “lab notebook” masthead with date stamp
* `SessionCard.astro` — used across lists
* `SessionMeta.astro` — date/time/location/series/tags display
* `Filters.ts` / `filters.js` — client-side filter/search logic
* `Countdown.ts` / `countdown.js` — next session countdown

### Design system (Lab Notebook)

Implement:

* Paper-like background (subtle)
* Margin line and “hole punch” motif (lightweight, not distracting)
* “Tabs” for months/weeks
* “Highlighter” hover effect on tags
* Typography: readable body + slightly stylized headings (no novelty fonts that reduce readability)

Accessibility:

* Ensure color contrast meets WCAG AA
* Keyboard navigation for filters/search
* Focus styles visible
* Reduce motion where `prefers-reduced-motion` is set

---

## Interactivity Requirements (Static-Friendly)

1. **Client-side filters**

   * Filter sessions by tags (multi-select)
   * Filter by series (single or multi-select)
   * Search across title, speaker, and abstract excerpt
   * Should work without external services

2. **Next session logic**

   * Determine next upcoming session from content at build time for server-rendered “Next up”
   * Add client-side countdown timer based on next session start time

3. **Calendar export**

   * Provide at least one of:

     * Per-session ICS generated at build time and linked, OR
     * Client-side ICS generation from session data
   * Also provide a Google Calendar “Add” link if feasible

---

## Build, Test, Deploy

### Local development

* `npm install`
* `npm run dev`

### Production build

* `npm run build` outputs static files

### GitHub Pages deployment

* Use GitHub Actions to build Astro and publish `dist/` to Pages.
* Ensure correct `site` / `base` configuration for repository pages:

  * If repo is `org/repo`, base path is `/repo/`

Include:

* A working `.github/workflows/deploy.yml`

---

## Repository Structure (Target)

```
/
├─ src/
│  ├─ content/
│  │  └─ sessions/
│  │     ├─ 2026-01-13-error-bars.md
│  │     └─ ...
│  ├─ components/
│  │  ├─ Layout.astro
│  │  ├─ SessionCard.astro
│  │  ├─ SessionMeta.astro
│  │  ├─ NotebookHeader.astro
│  │  └─ ...
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ schedule.astro
│  │  ├─ archive.astro
│  │  ├─ about.astro
│  │  └─ sessions/[slug].astro
│  ├─ styles/
│  │  └─ global.css
│  └─ utils/
│     ├─ dates.ts
│     ├─ sessionIndex.ts
│     └─ ics.ts
├─ public/
│  ├─ favicon.svg
│  └─ assets/
├─ .github/workflows/deploy.yml
├─ package.json
├─ astro.config.mjs
├─ README.md
└─ agents.md
```

---

## Data Handling Notes

* All dates/times should be treated in a single explicit timezone (document it).
* Parse `date + start` into a comparable datetime for sorting.
* Exclude `draft: true` sessions from production lists and from “next up.”

---

## Deliverables Checklist

1. Astro project scaffolding configured for GitHub Pages base path
2. Content collection schema for sessions
3. Pages: Home, Schedule, Session detail, Archive, About
4. Filter/search UI on schedule & archive
5. Next-up logic + countdown
6. Add-to-calendar functionality
7. Lab notebook theme styling in global CSS
8. GitHub Actions deploy workflow for Pages
9. README with:

   * How to add a session
   * Front matter fields explained
   * Local dev + deploy notes

---

## Implementation Guidance (Quality Bar)

* Keep dependencies minimal; prefer small utilities over heavy libraries.
* Ensure fast load:

  * No large client bundles
  * Only hydrate/ship JS for pages that need it
* Ensure robust content validation:

  * Fail build if required front matter is missing or malformed
* Provide sensible empty states:

  * If no upcoming sessions, show “No upcoming sessions scheduled” and link to archive

---

## Definition of Done

The site builds and deploys successfully to GitHub Pages. A contributor can add a new session by adding one Markdown file in the sessions folder, and it automatically appears on the schedule, home “next up,” and has its own detail page. Filters/search work on the schedule page. The look and feel clearly evokes a lab notebook without harming readability or accessibility.

