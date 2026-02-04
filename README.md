# ECESS Lab Notebook

This is the source code for the Early Career Economics Seminar Series (ECESS) website, built with [Astro](https://astro.build).
s
## 📝 How to Add a Session

1. Create a new Markdown file in `src/content/sessions/`.
   - Filename format: `YYYY-MM-DD-short-title.md` (e.g., `2026-01-13-error-bars.md`).
2. Copy the following template and fill in the details:

```yaml
---
title: "Your Talk Title"
speaker: "Speaker Name"
affiliation: "PhD Year X / University"
date: 2026-01-13
start: "12:30"
end: "13:15"
location: "Seminar Room 3 / Zoom"
series: "Brown Bag" # or "Formal Seminar"
tags: ["topic1", "topic2"]
links:
  slides: "https://link-to-slides"
  paper: "https://link-to-paper"
feedback_wanted: ["clarity", "methodology"]
draft: false # Set to true to hide from site
---

Write your abstract here. You can use **Markdown** formatting.
```

3. Commit and push your changes. The site will automatically rebuild and deploy.

## 🛠 Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🚀 Deployment

The site is deployed to GitHub Pages via GitHub Actions. Any push to the `main` (or `master`) branch triggers a build.

## 📂 Project Structure

- `src/content/sessions/`: Markdown files for each session.
- `src/pages/`: Page templates (Home, Schedule, etc.).
- `src/components/`: Reusable UI components.
- `src/styles/`: Global CSS.
