# Hero dissolve sequence

Export the finalized dissolve video (Kling / Runway / Luma) into this folder:

    ffmpeg -i hero-dissolve.mp4 -vf "fps=30,scale=1920:-1" -q:v 3 public/hero-sequence/frame-%03d.webp

- Frames must be named `frame-001.webp`, `frame-002.webp`, ... (150–220 frames).
- The loader probes up to `frame-220.webp` and stops at the first missing frame.
- While frames are absent, the hero renders a graceful static fallback.

Mobile fallback: place a short, muted autoplay loop at `public/hero-loop.mp4`
(e.g. a 3–5 s excerpt of the dissolve). It is used instead of the canvas scrub
on small screens.
