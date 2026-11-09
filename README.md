# aadeelp.com

Source code for [aadeelp.com](https://aadeelp.com), the portfolio site of Aadeel Peerally.
It is a static site built with [Astro](https://docs.astro.build/) 7 and hosted on GitHub Pages.

This README follows the [Diátaxis](https://diataxis.fr/) structure: a tutorial to get started,
how-to guides for routine changes, reference tables, and a short explanation of how the site fits together.

---

## Tutorial: run the site on your computer

You need [Node.js](https://nodejs.org/) 22.23.4 or later (`node --version` to check) and git.

1. Install the project's dependencies. Run this once, and again after anyone changes `package.json`:

   ```bash
   npm install
   ```

2. Start the preview server:

   ```bash
   npm run dev
   ```

3. Open <http://localhost:4321>. Pages reload when you save a file.
   If the server started in the background, stop it with `npx astro dev stop`.

4. Before you publish anything, run the full build. It checks types and content, then builds the site into `dist/`:

   ```bash
   npm run build
   ```

   If the build fails, the message names the file and the problem. Nothing is published until it passes.

---

## How-to guides

### Add a case study

Adding a case study takes **one content file plus its images**. No code changes: the home page,
`/work/`, the case-study page and its social preview image all pick it up automatically.

1. Create a folder in `src/content/work/` named after the URL you want, for example
   `src/content/work/pvcase-platform/`. The page will live at `/work/pvcase-platform/`.
2. Put the images in that folder.
3. Create `index.md` in the folder. Start from this template:

   ```markdown
   ---
   title: "Case-study title"
   description: "One or two sentences for cards and search results (220 characters at most)."
   publishDate: 2026-11-30
   role: "Product Director – Platform"
   company: "PVcase"
   sector: "Solar energy, B2B SaaS"
   timeframe: "Nov 2024 – present"
   team: "Optional"
   outcome: "Exceeded pilot goals, 500+ monthly active users"
   tags: [Platform, AI]
   cover: ./cover.png
   coverAlt: "What the cover image shows"
   ---

   ## Summary
   ## Context
   ## The problem
   ## My role
   ## Decisions and trade-offs
   ## What we shipped
   ## Outcome
   ## What I'd do differently
   ```

4. Write each section. Add images with standard Markdown, for example `![Alt text](./screen-1.png)`.
   Astro resizes and compresses them at build time.
5. Run `npm run build`. If a required field or section is missing, the build stops and says what to fix.
6. Look at the page with `npm run dev`, then commit and push (see [Publish a change](#publish-a-change)).

Rules the build enforces:

- `title`, `description`, `publishDate`, `role`, `company`, `sector`, `timeframe`, `outcome` and `tags` are required. `team` is optional.
- `tags` MUST be one or more of `Platform`, `Payments`, `AI` and `Founder`.
- `coverAlt` is required when `cover` is set.
- The `##` headings MUST be the seven required sections in the order above. `What I'd do differently` MAY follow at the end.

Rules the build cannot enforce (check them yourself):

- Copy follows `positioning.md`: voice, the numbers rule and the red-line words.
- Do not commit an unfinished case study. Files whose names start with `_sample` are ignored by git, so you can use that prefix for drafts and tests.

### Add a video to a case study

1. Copy the MP4 (H.264, no audio, a few MB) and its poster image into `public/videos/`.
2. Add a `video` block to the case study's frontmatter:

   ```yaml
   video:
     src: /videos/pvcase-platform-demo.mp4
     poster: /videos/pvcase-platform-demo-poster.jpg
     width: 1280
     height: 1038
     label: "What the video shows, for screen readers"
     caption: "Optional caption."
   ```

The video plays silently on a loop with a pause button. It does not autoplay for visitors who have
reduced motion turned on, and it pauses when scrolled out of view.
When a case study has a video, the page shows it in place of the cover image.

### Replace a video

Overwrite the files in `public/videos/` with the new ones, keeping the same names.
If the size changes, update `width` and `height` in the case study's frontmatter.

### Update the resume

1. Edit the wording in `src/data/resume.ts`. The site is the master copy for wording.
2. Re-export the PDF and save it as `public/Aadeel-Peerally-Resume.pdf`, replacing the old file.
   Check it is two pages or fewer and has no phone number or street address.
3. Run `npm run build`, then commit and push.

### Change site-wide settings

Edit `src/site.config.ts`. It holds the name, default title and description, LinkedIn URL, email,
resume path, Cloudflare Web Analytics token and the `hideWorkWhenEmpty` switch.
If you change analytics, update the privacy page (`src/pages/privacy.astro`) in the same commit.

### Publish a change

Every push to the `main` branch rebuilds and publishes the site through GitHub Actions.

```bash
git add -A
git commit -m "Describe the change"
git push
```

Check progress in the repository's **Actions** tab. The live site updates a minute or two after the run turns green.

---

## Reference

### Folders

| Path | What it holds |
|---|---|
| `src/pages/` | One file per page. The file path is the URL. |
| `src/content/work/` | Case studies, one folder each. |
| `src/content.config.ts` | The case-study schema: required fields and allowed tags. |
| `src/data/resume.ts` | Resume content. |
| `src/components/` | Reusable pieces: navigation, cards, buttons, video, contact block. |
| `src/layouts/BaseLayout.astro` | The shell every page shares. |
| `src/lib/` | Helpers: case-study sorting and section checks, social preview images. |
| `src/styles/global.css` | Colours, type and spacing as CSS custom properties. |
| `src/site.config.ts` | Site-wide settings. |
| `public/` | Files served as-is: resume PDF, videos, favicon, `robots.txt`. |

### Commands

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies. |
| `npm run dev` | Starts the local preview at <http://localhost:4321>. |
| `npm run build` | Checks types and content, then builds the site into `dist/`. |
| `npm run preview` | Serves the built `dist/` folder locally. |

### Generated files

| URL | Source |
|---|---|
| `/og/<page>.png` | Social preview images for fixed pages, from `src/pages/og/[...slug].png.ts`. |
| `/og/work/<slug>.png` | One social preview image per case study. |
| `/sitemap-index.xml` | Sitemap, from `@astrojs/sitemap`. |

---

## Explanation: how the site fits together

The site is fully static. Astro turns the pages and content into plain HTML, CSS and images at build time,
so there is no server, database or login to maintain. The only JavaScript in the browser handles the theme
switch, the video controls, the email link and (in production) Cloudflare Web Analytics.

**Context (C4 level 1).** Visitors reach aadeelp.com in a browser. GitHub Pages serves the files.
Cloudflare Web Analytics receives anonymous page-view data. Visitors contact Aadeel through email or LinkedIn.

**Containers (C4 level 2).** There is one container: the static site in `dist/`, built by GitHub Actions
from this repository on every push to `main`.

**Why case studies are content files.** Each case study is a Markdown file checked against a schema.
The schema turns the case-study template into rules, so a missing field or section fails the build
instead of reaching the live site.

**Why the email address is assembled in the browser.** Bots that harvest email addresses read raw HTML.
The address is stored reversed and assembled by a small script, so it never appears whole in the page source.
