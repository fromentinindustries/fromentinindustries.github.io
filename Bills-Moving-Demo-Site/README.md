# Bill's Moving Demo Website

This is a complete static website concept for Bill's Moving in Brockville, Ontario.

## What is included

- `index.html` — Landing page with service details, quote form and local SEO structure.
- `styles.css` — Responsive styling with light/dark mode support.
- `script.js` — Theme toggle, mobile menu and quote form mailto handling.
- `sales-brief.md` — Sales messaging, pitch notes and owner verification checklist.
- `sitemap.xml` — Simple sitemap for static hosting.
- `robots.txt` — Static host support file.
- `assets/` — SVG illustrations and logo assets.

## Editing the website

- Replace text content directly in `index.html`.
- Update the quote form recipient in `script.js` before launch.
- Replace the placeholder address or phone number only after confirming with the owner.
- Replace SVG assets in `assets/` with real photos or custom graphics if needed.

## Quote form behavior

The quote form is static. It opens the user’s email client with move details.
No backend is required.

## Deploying the site

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In repository settings, enable GitHub Pages from the `main` branch.
3. The site will be available at the generated GitHub Pages URL.

### Netlify / Vercel / Static hosts

- Deploy the folder as a static site.
- Use the `index.html` root file as the entry point.
- No build step or server is required.

## Verify before launch

- Confirm the business name and address with the owner.
- Confirm the phone number is current.
- Replace the `mailto:` email address in `script.js` with the owner’s preferred contact address.
- Review the service copy for accuracy.
- Ensure the site is published on the correct domain.
