# portfolio-site

Personal portfolio website of **Luka Pejaković**, Software Engineer, built with plain HTML, CSS and JavaScript. There is no build step and no framework.

Live: <https://luka-pejakovic.from.hr>

## Overview

A single-page, responsive site with a fixed sidebar navigation (it becomes a toggleable menu on smaller screens) and these sections:

| Section       | Content                                                                 |
|---------------|-------------------------------------------------------------------------|
| **Home**      | Hero with background image and Typed.js rotating headline               |
| **About**     | Short bio and personal details                                          |
| **Skills**    | Languages, frameworks, databases, tools and soft skills                 |
| **Resume**    | Summary, education and professional experience                          |
| **Portfolio** | Professional and private project cards, rendered from JS data           |
| **Contact**   | Location, email, LinkedIn and GitHub links                              |

## Project structure

```
.
├── index.html            # Whole page: markup, SEO/meta tags, JSON-LD, script includes
├── assets/
│   ├── css/
│   │   └── main.css      # Custom styles (CSS variables, layout, responsive breakpoints)
│   ├── js/
│   │   ├── main.js       # UI behavior: nav toggle, scrollspy, scroll-to-top, AOS & Typed init
│   │   └── projects.js   # Portfolio data (projectListJson) + projectsToHTML() renderer
│   └── img/              # Favicon, profile photo, hero background (webp)
├── robots.txt            # Allows all crawlers, points to sitemap
└── sitemap.xml           # Single-URL sitemap
```

## How it works

- **Styling:** Bootstrap 5.3 grid and utilities plus `main.css`. Theme colors live in CSS custom properties on `:root`. The `.light-background` and `.dark-background` classes switch the palette per section. Fonts are Roboto (body), Raleway (headings) and Poppins (nav), all from Google Fonts.
- **Interactivity (`main.js`):**
  - mobile header toggle that closes when a nav link is clicked
  - scrollspy that highlights the active nav item
  - smooth scroll-to-top button
  - corrected scroll position when the page loads with a `#hash` in the URL
  - AOS (animate-on-scroll) and Typed.js initialization
- **Portfolio (`projects.js`):** projects are defined in the `projectListJson` object, split into `professional` and `private`. On `DOMContentLoaded`, `projectsToHTML()` builds Bootstrap cards (title, tech stack, description, optional links with Font Awesome icons) into `#projects-container`.
- **SEO:** the page includes a meta description and keywords, a canonical URL, Open Graph and Twitter Card tags, schema.org `Person` JSON-LD, `robots.txt` and `sitemap.xml`.
- **Cache busting:** local CSS/JS are included with a `?v=YYMMDDx` query string. Bump it after changing those files.

### Third-party dependencies (via CDN)

| Library        | Version | Purpose                          |
|----------------|---------|----------------------------------|
| Bootstrap      | 5.3.3   | Grid, components, utilities      |
| Font Awesome   | 4.7.0   | Icons                            |
| AOS            | 2.3.1   | Scroll animations                |
| Typed.js       | 2.1.0   | Typing effect in the hero        |
| Google Fonts   | –       | Roboto, Raleway, Poppins         |

## Featured projects

**Professional:** 4D Wand IMC web shop & mobile app, WandStat, 4D WatchDog Service, Fresh Service, 4D Loyalty, WebSocket Service. These are C#/.NET apps (ASP.NET MVC/Core, Xamarin.Forms, .NET MAUI) using MSSQL or SQLite.

**Private:** this portfolio site, [Baby calculator](https://github.com/lpejakovic/baby-calculator) (Python/Flask) and the BEBS. blog (WordPress on SQLite).

## Running locally

Serve the folder with any static file server. Because the libraries come from CDNs, you need an internet connection.

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
      "links": [ { "url": "https://...", "icon": "fa fa-github", "text": "GitHub" } ] // optional
  }
  ```
- **Other sections** (about, skills, resume, contact) are static markup in `index.html`.
- After deploying changes, update `<lastmod>` in `sitemap.xml` and the `?v=` version strings.
