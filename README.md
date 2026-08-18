# BugFalse — ErrorHunter

BugFalse is a developer-focused web shell for **ErrorHunter**, an AI-assisted Python debugging application.

## What it does

The frontend provides a focused product experience around the existing ErrorHunter application:

- Python debugging workspace
- AI-assisted error explanation and fix generation
- Responsive desktop/tablet/mobile UI
- Dark/light theme
- Loading, unavailable, and retry states
- Accessible keyboard navigation
- SEO/Open Graph metadata
- Web App Manifest and lightweight offline shell
- Branded 404 page

The actual debugger is loaded from the deployed ErrorHunter backend; this repository does not duplicate or mock the backend application.

## Architecture

```text
Browser
  ↓
BugFalse static shell
  ↓
ErrorHunter iframe
  ↓
FastAPI backend
  ↓
AI provider
```

## Local development

No build tool is required. Serve the repository with any static HTTP server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

This is a static site and can be deployed through GitHub Pages or a Render Static Site.

- Build command: none
- Publish directory: `.`

## Important security note

Do not place API keys or provider secrets in this repository. AI provider credentials belong in the backend deployment environment.

## Project status

The frontend shell is progressively enhanced around the existing ErrorHunter application. Backend reliability, deterministic Python analysis, persistent database-backed history, automated tests, and CI/CD remain backend-level improvements rather than frontend responsibilities.
