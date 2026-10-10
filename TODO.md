# TODO

## Replace the "LP" placeholder with a real profile photo

The site currently uses a generated "LP" monogram where a photo should be.

**What to prepare:** a square photo, at least 800×800 px, face centred (it is shown cropped to a circle in the sidebar).

**Files to replace** (keep the same size and format, or update the references below):

| File | Size | Used for |
|---|---|---|
| `assets/img/profile-placeholder.jpg` | 800×800 | structured data (`"image"` in the JSON-LD in `index.html`) |
| `assets/img/profile-placeholder-240.jpg` | 240×240 | sidebar photo (`.profile-img img` in `index.html`) |
| `assets/img/og-image.jpg` | 1200×630 | link previews on LinkedIn/Twitter; optionally regenerate with the photo instead of the monogram |

**Then:**

- [ ] Consider renaming the files (e.g. `profile.jpg`, `profile-240.jpg`) so browsers don't keep the cached placeholder for up to 30 days, and update the references in `index.html`.
- [ ] Update the `alt` text if needed (currently "Luka Pejaković").
- [ ] Optional: bring back a larger photo in the About section (it was removed while the placeholder was in use).
- [ ] If `og-image.jpg` changes, bump its `?v=` in the `og:image` and `twitter:image` tags, then refresh the preview at https://www.linkedin.com/post-inspector/.
- [ ] Update `<lastmod>` in `sitemap.xml`.

## Reminders when changing the site

- Bump the `?v=` strings in `index.html` after editing CSS/JS (they are cached for 30 days).
- Projects are plain HTML cards in `index.html` (see "Updating content" in `README.md`).
- Bootstrap is trimmed to the classes in use; adding new Bootstrap classes needs the full build (see `README.md`).
- nginx only serves `/`, `robots.txt`, `sitemap.xml` and `/assets/`; any new top-level file must be added to the allowlist in the nginx site config.
- Fonts and files in `assets/vendor/` are cached for a year: if one ever changes, give it a new file name.
