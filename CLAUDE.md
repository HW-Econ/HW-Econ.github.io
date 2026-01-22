# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Early Career Economics Seminar Series (ECESS) website for Heriot-Watt University's Edinburgh Business School. It's a static site built with Astro and deployed to GitHub Pages. The site features a "Lab Notebook" theme with paper textures, margin lines, and hole punch styling to create a playful but professional aesthetic.

## Key Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview production build locally
```

## Architecture

### Content System

Sessions are managed via **Astro Content Collections** located in `src/content/sessions/`:
- Filename format: `YYYY-MM-DD-short-title.md`
- Each session is a Markdown file with YAML front matter
- Schema validation is enforced at build time via `src/content/config.ts`
- Draft sessions (`draft: true`) are excluded in production builds

### Session Schema

Required fields:
- `title` (string)
- `date` (date in YYYY-MM-DD format)
- `start` and `end` (HH:MM time strings in 24h format)
- `speaker` (string)

Optional fields:
- `affiliation`, `series`, `location`
- `tags` (array of strings)
- `links` (object with optional URLs: slides, paper, repo, notes, video)
- `feedback_wanted` (array of strings)
- `draft` (boolean)

### Page Structure

- **Home (`/`)**: Shows "Next Up" session with countdown, "This Week" sessions, and quick actions
- **Schedule (`/schedule/`)**: Full list with client-side filtering (by view/series/tags), search, and URL state management
- **Archive (`/archive/`)**: Past sessions with same filtering as schedule
- **Session Detail (`/sessions/[slug]/`)**: Individual session page with full details and add-to-calendar
- **About (`/about/`)**: Information about the series

### Client-Side Interactivity

All filtering/search happens client-side (no server required):
- URL query parameters reflect filter state (`?view=upcoming&tags=methods&q=error`)
- Filter state synced between URL and UI
- Tag filtering uses AND logic (all selected tags must match)
- Search matches against title, speaker, and abstract

### Countdown Logic

- Next session is determined at build time by filtering for upcoming sessions and sorting by date
- Countdown timer is client-side JavaScript that calculates time until session start
- Located in `src/components/Countdown.astro`

### Calendar Export

- ICS file generation implemented in `src/utils/ics.ts`
- Uses `generateICS()` function to create RFC 5545 compliant calendar files
- Available via `AddToCalendar` component on session detail and home page

### Styling Approach

Uses vanilla CSS with CSS variables defined in `src/styles/global.css`:
- Lab notebook theme with paper texture background (`--paper-color`)
- Red margin line at left (via `::before` pseudo-element)
- Hole punch effect (via `::after` pseudo-element with radial gradients)
- Custom fonts: Inter for body text, Patrick Hand for headings
- Responsive design with mobile breakpoint at 600px

### Component Organization

Key components:
- `Layout.astro`: Global shell with notebook styling, includes NotebookHeader and footer
- `SessionCard.astro`: Reusable session display used across all list views
- `SessionMeta.astro`: Displays date/time/location/series/tags metadata
- `NotebookHeader.astro`: Site header with navigation
- `Countdown.astro`: Live countdown timer for next session
- `AddToCalendar.astro`: ICS download functionality

## Deployment

Automatically deploys to GitHub Pages via `.github/workflows/deploy.yml`:
- Triggers on push to `main` or `master` branches
- Uses official Astro GitHub Action (`withastro/action@v2`)
- Builds and deploys to GitHub Pages environment
- Site configuration in `astro.config.mjs` sets `site` to `https://HW-Econ.github.io` with base path `/`

## Important Notes

- All date/times are handled in a single implicit timezone (local time)
- Sessions are sorted chronologically by combining `date` and `start` time
- Draft sessions are visible in development mode but excluded in production
- The build will fail if session front matter doesn't match the Zod schema
- Client-side scripts use `astro:page-load` event for compatibility with Astro's View Transitions
- Empty states are provided when no sessions match filters or no upcoming sessions exist
