# Justice for DODOBONYA

A premium, cinematic one-page campaign landing page. Frontend only — no backend, no API routes.

## Stack

- **Next.js 14** (App Router)
- **TailwindCSS**
- **Framer Motion**
- **React Icons**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

- `app/` — layout, page, global styles
- `components/` — Hero, Story, TokenSection, Community, FinalStatement, Footer, CursorGlow, SnowfallCanvas
- `public/` — static assets (**hero image must be here for deploy**)
- `styles/` — placeholder (global styles in `app/globals.css`)

Design: deep navy `#0B1220`, accent `#FF6A00`, glassmorphism, animated snowfall, custom cursor glow.

## Deploy (hero image)

For the hero photo to show on the deployed site, add it to the repo:

1. Place the image in the **`public/`** folder.
2. Name it **`dodobonya-hero.jpg`** (or convert your PNG/JFIF to JPG).
3. Commit and push:
   ```bash
   git add public/dodobonya-hero.jpg
   git commit -m "Add hero image"
   git push
   ```
4. Redeploy. The file is served from the root, so the image will appear.
