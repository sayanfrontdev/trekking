# Project Plan

**Status**: Planning
**Created**: 2026-11-05
**Mode**: AUGMENT

---

## 1. Project Overview

**Goal**: Create three simple, responsive standalone semantic HTML pages for TREKKING—Home, Explore Treks, and About TREKKING—with shared Bootstrap 5 styling, a dark/light theme toggle, and the existing logo. The project is designed so that every module is independently testable.

**App Type**: Static

**API Login**: No

**Mode**: AUGMENT

**Deployment Plan**: No deployment plan found

---

## 2. Frontend — Static Website

| Component | Technology |
|-----------|-----------|
| **Language** | JavaScript |
| **Framework** | Semantic HTML, Bootstrap 5, CSS, and vanilla JavaScript |
| **Package Manager** | None (no package dependencies) |
| **Test Runner** | Browser smoke checks |
| **Mocking Library** | Not applicable |
| **Test Command** | Manual browser verification |

---

## 3. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure Static Web Apps | Host and serve the standalone static website | — | No local service required | Essential |

---

## 4. Prerequisites

The site is built from static HTML, CSS, and JavaScript and can be opened in a modern browser. No backend runtime, package manager, database, or container is required.

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Web browser (Safari, Google Chrome, or Firefox) | frontend | ✅ | Safari 17.6; Chrome 150.0.7871.125; Firefox 157.0.1 |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Browser Developer Tools (Safari, Chrome, or Firefox) | frontend | ✅ | Included with detected browsers |

---

## 5. Design System & UI

**Component Library**: Bootstrap 5
**Style Direction**: A calm, outdoors-focused travel experience with forest-green navigation, warm paper-like surfaces, and restrained gold accents. Keep the markup simple and semantic, with a consistent header, footer, spacing system, and accessible dark/light theme across all three pages.
**Typography**: Inter, system-ui, -apple-system, "Segoe UI", sans-serif

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#24533F` | TREKKING navigation, current-page state, and primary trip-discovery actions |
| `accent`  | `#D99A36` | Small highlights such as trek difficulty labels and section accents |
| `surface` | `#F6F5EF` | Warm page background behind trip and about content |
| `text`    | `#1D2B24` | Main headings, trek names, and readable page copy |
| `muted`   | `#6A756E` | Regions, durations, supporting descriptions, and footer details |
| `border`  | `#D9DED8` | Card edges, separators, and form/control outlines |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Home | `/` | Introduce TREKKING and direct visitors to featured routes and the other pages | `header, nav, hero, grid, footer` |
| Explore Treks | `/treks.html` | Browse a concise list of featured trekking routes and their key details | `header, nav, main, grid, card-list, footer` |
| About TREKKING | `/about.html` | Explain the site's trekking focus and guiding principles | `header, nav, hero, main, grid, footer` |

> Each route is a separate HTML document. All pages share the same visual theme, navigation links, footer, and dark/light mode styling; the active navigation item identifies the current page.

### Sample Content

Home — featured treks:
| Trek | Region | Duration | Difficulty |
|------|--------|----------|------------|
| Sandakphu & Singalila | West Bengal, India | 6 days | Moderate |
| Goechala Trek | Sikkim, India | 11 days | Challenging |
| Valley of Flowers | Uttarakhand, India | 6 days | Moderate |

Explore Treks — route listings:
| Trek | Region | Duration | Difficulty |
|------|--------|----------|------------|
| Sandakphu & Singalila | West Bengal, India | 6 days | Moderate |
| Goechala Trek | Sikkim, India | 11 days | Challenging |
| Valley of Flowers | Uttarakhand, India | 6 days | Moderate |

About TREKKING — guiding principles:
| Principle | Description |
|-----------|-------------|
| Trail-first itineraries | Make the route and mountain setting the focus of each trip description. |
| Thoughtful pacing | Present duration and difficulty clearly so visitors can compare routes. |
| Respect for place | Encourage considerate travel in mountain landscapes and local communities. |

---

## 6. Project Structure

```text
project-root/
├── .azure/
│   ├── .preview-temp/
│   │   ├── about-trekking.html
│   │   ├── explore-treks.html
│   │   ├── home.html
│   │   ├── manifest.json
│   │   └── theme.css
│   └── project-plan.md
├── images/
│   ├── favicon.svg
│   └── logo.svg
├── about.html                 ← Standalone About TREKKING page
├── app.js                     ← Shared dark/light theme behavior
├── index.html                 ← Standalone Home page
├── styles.css                 ← Shared styling for all pages
└── treks.html                 ← Standalone Explore Treks page
```

---

## 7. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/` | Serve the standalone TREKKING homepage | — | HTML document | 200, 404 |
| 2 | GET | `/treks.html` | Serve the standalone Explore Treks page | — | HTML document | 200, 404 |
| 3 | GET | `/about.html` | Serve the standalone About TREKKING page | — | HTML document | 200, 404 |
| 4 | GET | `/styles.css` | Serve shared responsive and theme styles | — | CSS asset | 200, 404 |
| 5 | GET | `/app.js` | Serve shared dark/light theme behavior | — | JavaScript asset | 200, 404 |
| 6 | GET | `/images/logo.svg` | Serve the existing TREKKING logo | — | SVG asset | 200, 404 |
| 7 | GET | `/images/favicon.svg` | Serve the existing site favicon | — | SVG asset | 200, 404 |

---

## 8. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
