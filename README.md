# Fromentin Industries Website

Static GitHub Pages build for the Fromentin Industries public website.

## Structure

- `index.html` - main public website
- `privacy.html` - privacy, legal, and development-stage notice
- `thanks.html` - contact form success redirect
- `style.css` - shared styling
- `script.js` - navigation, theme, modal, reveal, and terms gate logic
- `Assets/` - logos, banners, favicon, and social icons
- `Services/` - individual service pages

## Deployment

Upload the contents of this folder to the root of `fromentinindustries.github.io`.

Do not upload ZIP files, old demo folders, or unrelated site experiments into the live repository.

## Notes

The site detects browser/device light or dark mode through `prefers-color-scheme`. A manual theme toggle stores the chosen preference in localStorage. The terms gate also uses localStorage.

The contact form uses the original FormSubmit workflow and redirects to `thanks.html`.
