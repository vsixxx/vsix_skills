---
name: webgl-horizontal-parallax
description: 'A horizontal-scroll WebGL gallery (Three.js): frames glide sideways with lerp smoothing and each image parallaxes its texture (UV shift) by its position in the viewport. Use when Codex needs to perform Webgl Horizontal Parallax tasks, or when the user explicitly mentions webgl-horizontal-parallax.'
---

# Webgl Horizontal Parallax

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single self-contained `index.html` — A horizontal-scroll WebGL gallery (Three.js): frames glide sideways with lerp smoothing and each image parallaxes its texture (UV shift) by its position in the viewport.

## Why this is a powered artifact

Open Design detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-horizontal-parallax/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- effect: David Faure / Codrops (MIT)
- imagery: Original (AI-generated)

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
