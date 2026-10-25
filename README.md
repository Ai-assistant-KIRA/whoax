# whoax.com

[![CI](https://github.com/Ai-assistant-KIRA/whoax/actions/workflows/ci.yml/badge.svg)](https://github.com/Ai-assistant-KIRA/whoax/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-all%20rights%20reserved-lightgrey.svg)](LICENSE)

**Live site: [whoax.com](https://whoax.com)**

Source for my personal portfolio. The interface is a terminal file tree: every
page is a file, and selecting one opens it in an editor view. The site is a
static export, so it runs on any file host with no server-side runtime.

## Overview

- **Content is data.** Pages live in `src/data/portfolioData.ts` as typed
  records. Adding a page means adding one record and one entry in
  `FILE_SEQUENCE`, not writing another component.
- **Two background engines.** A 3D instanced voxel field and an ASCII canvas,
  both client-only. The visitor's choice is saved in `localStorage`.
- **Project case studies.** Each one can carry responsive screenshots, video
  with chapter navigation, and structured metadata for the "at a glance" panel.
- **A voice assistant that does not leak its key.** The browser requests a
  30-second Deepgram token from a Cloudflare Worker. The long-lived key stays
  on the server.
- **Reduced motion is respected.** Text reveals check
  `prefers-reduced-motion` before animating.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS 4 with a custom terminal theme |
| 3D and motion | React Three Fiber, Three.js, CSS transitions |
| Content | Typed records rendered by a small in-house Markdown renderer |
| Deployment | Static export to GitHub Pages, custom domain via CNAME |
| Voice | Deepgram Voice Agent with short-lived tokens from a Cloudflare Worker |
| CI | ESLint, `tsc --noEmit`, and a production build |

## Architecture

```text
Browser
  Next.js static export (out/)
    DigitalMeadowPortfolio
      SiteSidebar            file tree navigation
      CodeEditorView         renders the selected file
      CyberMeadow3D          voxel background (client-only)
      Ascii404Background     ASCII background (client-only)
      TerminalVideoShowcase  intro film with chapters and fullscreen
      ProjectGallery         responsive case study screenshots
      VoiceAudioPreview      live voice assistant
  Cloudflare Worker (voice-token-worker/)
    POST / -> short-lived Deepgram token
```

### Content model

Each entry in `PORTFOLIO_FILES` has an id, file name, path, title, subtitle,
body, and optional metadata such as impact, timeline, stack, gallery, and
video. `CodeEditorView` turns the body into headings, sections, lists, code
blocks, and links. Navigation order comes from `FILE_SEQUENCE`.

### Static export

`next.config.ts` sets `output: "export"` and `trailingSlash: true`.
`npm run build` writes `out/`. GitHub Pages serves that output from the
`gh-pages` branch, and `public/CNAME` keeps the custom domain on
`whoax.com`. There is no Node server, no runtime secret, and no cold start.

### Voice token broker

The browser never receives `DEEPGRAM_API_KEY`. `VoiceAudioPreview` asks
`voice-token-worker/` for a token. The worker checks the request origin against
an allowlist and applies a per-IP limit of four tokens per minute through
Cloudflare's rate-limit binding. Tokens expire in 30 seconds, so a copied token
is not reusable. Deployment steps are in
[`voice-token-worker/README.md`](voice-token-worker/README.md).

### Performance and accessibility

- Screenshots are pre-generated at 960 and 1920 pixels wide and served with
  `srcset`, so phones do not download desktop images.
- Images below the fold load lazily; video preloads metadata only.
- The canvas engines are dynamically imported with `ssr: false`.
- The shell includes a skip link, labelled controls, and visible focus styles.
- Text animations check the reduced-motion preference before running.

## Local development

Requirements: Node.js 20.9 or newer and npm.

```bash
npm ci
cp .env.example .env.local   # set NEXT_PUBLIC_VOICE_TOKEN_URL
npm run dev
```

The site runs at http://localhost:3000.

Checks:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` writes the static site to `out/`.

## Deployment

1. Run `npm run build`.
2. Publish the contents of `out/` to the `gh-pages` branch.
3. GitHub Pages serves that branch. `public/CNAME` keeps the domain at
   `whoax.com`.

`gh-pages` contains generated output only. Edit the source on `master`.

## Repository layout

```text
src/app/                    App Router entry, layout, global theme
src/components/             Terminal shell, editor view, backgrounds, media
src/data/portfolioData.ts   All page content
src/lib/                    Utilities and the voice agent prompt
src/types/                  Shared types
public/                     Static assets and CNAME
voice-token-worker/         Cloudflare Worker that issues Deepgram tokens
.github/workflows/          CI
```

## License

Copyright 2026 Reda Alaarabi. All rights reserved. The source is published for
review. See [LICENSE](LICENSE).
