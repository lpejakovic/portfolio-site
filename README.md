# portfolio-site

Personal portfolio website of **Luka Pejaković**, Software Engineer, built with plain HTML, CSS and JavaScript. There is no build step and no framework.

Live: <https://luka-pejakovic.from.hr>

## Overview

A single-page, responsive site with a fixed sidebar navigation (it becomes a toggleable menu on smaller screens) and these sections:

| Section       | Content                                                                 |
|---------------|-------------------------------------------------------------------------|
| **Home**      | Name, Typed.js rotating role, one-line tagline and call-to-action buttons |
| **About**     | Short bio and personal details                                          |
| **Portfolio** | Project cards rendered from JS data, with older projects collapsible    |
| **Resume**    | Summary, education and professional experience                          |
| **Skills**    | Technologies and areas of expertise, shown as tags                      |
| **Contact**   | Email, LinkedIn and GitHub buttons, plus location                       |

## Project structure

```
.
├── index.html            # Whole page: markup, SEO/meta tags, JSON-LD, script includes
├── assets/
│   ├── css/
│   │   ├── fonts.css     # @font-face rules for the self-hosted fonts
│   │   └── main.css      # Custom styles (CSS variables, layout, responsive breakpoints)
│   ├── js/
│   │   ├── main.js       # UI behavior: nav toggle, scrollspy, scroll-to-top, AOS & Typed init
│   │   └── projects.js   # Portfolio data (projectListJson) + projectsToHTML() renderer
│   ├── fonts/            # Roboto, Raleway, Poppins (woff2, latin + latin-ext subsets)
│   ├── img/              # Favicon, profile placeholder, hero background (webp), link-preview image
│   └── vendor/           # Third-party libraries: Bootstrap CSS (trimmed), AOS, Typed.js
├── robots.txt            # Allows all crawlers, points to sitemap
└── sitemap.xml           # Single-URL sitemap
```

## How it works

- **Styling:** Bootstrap 5.3 grid and utilities plus `main.css`. Theme colors live in CSS custom properties on `:root`. The `.light-background` and `.dark-background` classes switch the palette per section. Fonts are Roboto (body), Raleway (headings) and Poppins (nav). They are self-hosted from `assets/fonts/` instead of loaded from Google, so visitors' IP addresses aren't sent to Google (a GDPR concern).
- **Interactivity (`main.js`):**
  - mobile header toggle that closes when a nav link is clicked
  - scrollspy that highlights the active nav item
  - smooth scroll-to-top button
  - corrected scroll position when the page loads with a `#hash` in the URL
  - AOS (animate-on-scroll) and Typed.js initialization
- **Portfolio (`projects.js`):** projects are defined in the `projectListJson` object, split into `professional` and `private`. On `DOMContentLoaded`, `projectsToHTML()` builds Bootstrap cards (title, tech stack, description, optional links with icons) into `#projects-container`. The `subtitle` is shown as technology tags, and projects with `"earlier": true` go into a collapsible "Earlier projects" section.
- **Icons:** an inline SVG sprite at the top of `<body>` in `index.html` (Font Awesome Free 6 icons, CC BY 4.0). Use an icon with `<svg class="icon" aria-hidden="true"><use href="#i-NAME"></use></svg>`. To add one, copy its `<path>` from the Font Awesome Free SVGs into a new `<symbol id="i-NAME">`.
- **Accessibility:** skip link, one `h1` and ordered headings, a closed mobile menu that can't be tabbed into (Escape closes it), visible keyboard focus, and the `prefers-reduced-motion` setting is respected (no scroll animations or typing effect).
- **SEO:** the page includes a meta description, a canonical URL, Open Graph and Twitter Card tags, schema.org `Person` JSON-LD, `robots.txt` and `sitemap.xml`.
- **Cache busting:** local CSS/JS are included with a `?v=YYMMDDx` query string. Bump it after changing those files.

### Third-party dependencies (self-hosted in `assets/vendor/`, all MIT licensed)

The page loads `bootstrap.trimmed.css`: only the Bootstrap rules this page uses (about 10 KB instead of 233 KB), copied verbatim from Bootstrap 5.3.3. If you add Bootstrap classes that aren't styled yet, put the full build back in `assets/vendor/` (`git show 8830f81:assets/vendor/bootstrap.min.css > assets/vendor/bootstrap.min.css`, or download it from `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`) and point the `<link>` in `index.html` at it. Loading it straight from the CDN won't work: the Content-Security-Policy only allows files from this domain.

| Library        | Version | Purpose                          |
|----------------|---------|----------------------------------|
| Bootstrap      | 5.3.3   | Grid, cards, utilities (trimmed) |
| AOS            | 2.3.1   | Scroll animations                |
| Typed.js       | 2.1.0   | Typing effect in the hero        |

## Featured projects

**Professional:** 4D Web Shop (WordPress/WooCommerce e-commerce platform integrated with the 4D Wand ERP), the 4D Wand IMC mobile app (migrated from Xamarin.Forms to .NET MAUI), a document exchange platform (.NET MAUI and Rust), WebSocket Service (.NET 8 Native AOT), a Rust real-time messaging server, a release notes service, 4D Loyalty, plus earlier projects (ASP.NET web shop, WandStat, 4D WatchDog Service, Fresh Service).

**Private:** Battleship multiplayer (ASP.NET Core, SignalR, Vue 3), this portfolio site, Soundboard for kids (.NET MAUI), [Baby calculator](https://github.com/lpejakovic/baby-calculator) (Python/Flask) and the BEBS. blog (WordPress on SQLite).

## Running locally

Serve the folder with any static file server. Everything is self-hosted, so it works offline.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Updating content

- **Add or edit a project:** add an object to `professional` or `private` in `assets/js/projects.js`:
  ```js
  {
      "title": "Project name",
      "subtitle": "Tech, stack, list",
      "description": "Short description.",
      "links": [ { "url": "https://...", "icon": "github", "text": "GitHub" } ] // optional; icon = sprite id without "i-"
  }
  ```
- **Other sections** (about, skills, resume, contact) are static markup in `index.html`.
- After deploying changes, update `<lastmod>` in `sitemap.xml` and the `?v=` version strings.
