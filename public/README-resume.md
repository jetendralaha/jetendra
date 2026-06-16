# Place your resume here

Drop your CV as **`resume.pdf`** in this `public/` folder.

The "Download CV" button in the site links to `/resume.pdf`, so once this
file exists it will be served automatically (both locally and on GitHub Pages).

If you name the file differently, update `personal.resumeUrl` in
`src/data/portfolio.ts` to match.

## Profile photo

Drop your photo as **`profile.jpg`** in this `public/` folder. It appears as a
circular avatar in the Hero and a framed photo in the About section.

- Recommended: a clear, front-facing headshot, at least 600×750px.
- If you use a different name/format (e.g. `profile.png`/`.webp`), update
  `personal.photoUrl` in `src/data/portfolio.ts` to match.
- Until the file exists, the photo areas stay hidden automatically (no broken
  image).
