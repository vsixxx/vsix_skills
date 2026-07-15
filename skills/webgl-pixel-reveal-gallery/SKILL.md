---
name: webgl-pixel-reveal-gallery
description: A scroll-reactive masonry gallery (Three.js + GSAP) where each image develops from a pixel/grid dissolve on viewport entry, with a split-text heading and click-to-fullscreen Flip. Use when Codex needs to perform Webgl Pixel Reveal Gallery tasks, or when the user explicitly mentions webgl-pixel-reveal-gallery.
---

# Webgl Pixel Reveal Gallery

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single self-contained `index.html` — A scroll-reactive masonry gallery (Three.js + GSAP) where each image develops from a pixel/grid dissolve on viewport entry, with a split-text heading and click-to-fullscreen Flip.

## Why this is a powered artifact

Open Design detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-pixel-reveal-gallery/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- effect: J0SUKE / Codrops (MIT)
- imagery: Original (AI-generated)

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
