# Fromentin Industries Website

This repository contains a portable static website for Fromentin Industries, a private development-stage Canadian technology and systems initiative.

## What is included

- `index.html` — Homepage with hero, overview, development areas and contact call-to-action.
- `about.html` — About page explaining project direction and development-stage positioning.
- `services/index.html` — Development areas and services page.
- `contact.html` — Contact page with a static form and email call-to-action.
- `privacy/index.html` — Updated privacy notice page.
- `legal.html` — Legal terms and website use notice.
- `style.css` — Shared styling for the site.
- `script.js` — Theme toggle, mobile navigation and terms acceptance logic.
- `robots.txt` and `sitemap.xml` — Static hosting support files.
- `assets/` — Shared logo and hero image assets.

## Editing the site

- Update text in the HTML files directly.
- Replace `./assets/hero-banner` and `./assets/logo` with new images or SVGs as needed.
- Update the Organization schema object in `index.html` if the live domain changes.

## Deployment

### GitHub Pages

1. Push the repository to GitHub.
2. In repository settings, enable GitHub Pages from the `main` branch.
3. Ensure the site files are on the repository root.
4. Use the generated Pages URL or configure a custom domain.

### Other static hosts

- Upload the site folder to Netlify, Vercel, Cloudflare Pages or any basic static host.
- Use relative paths only, so the site works in subfolders and local previews.
- If you deploy to a subfolder, ensure links remain relative.

## Notes

- The theme toggle uses `localStorage` and respects the user's system preference.
- The terms gate uses `localStorage` to avoid repeated prompts after acceptance.
- The site is fully static and requires no backend or build step.
