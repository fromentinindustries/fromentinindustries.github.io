# Bill's Moving Website Demo

A complete static website package for a Brockville moving and storage business.

## Files

- `index.html` — full single-page website
- `styles.css` — responsive design, mobile-first styling, light professional brand
- `script.js` — menu and scroll reveal interactions
- `assets/` — local SVG logo, icons and illustrations
- `sitemap.xml` and `robots.txt` — basic SEO support
- `SALES_BRIEF.md` — pitch notes and research summary

## Before going live

Replace the placeholder form action in `index.html`:

```html
<form class="quote-form" action="mailto:example@example.com" method="post" enctype="text/plain">
```

Use the owner's confirmed email address or connect a form service such as Formspree, Netlify Forms, Basin or a backend endpoint.

Also replace `https://example.com/` in the schema, robots file and sitemap with the final domain.

## Deployment

This site can run anywhere static files are accepted:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Standard cPanel hosting
- Any folder on a web server

Upload the full folder contents, not just the HTML file.
