---
name: webgl-distortion-grain
description: A vertical gallery (Three.js) where planes bend with scroll velocity, ripple under the cursor via simplex noise, and carry a film grain. Use when Codex needs to perform Webgl Distortion Grain tasks, or when the user explicitly mentions webgl-distortion-grain.
---

# Webgl Distortion Grain

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single self-contained `index.html` — A vertical gallery (Three.js) where planes bend with scroll velocity, ripple under the cursor via simplex noise, and carry a film grain.

## Why this is a powered artifact

Open Design detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-distortion-grain/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- effect: Jan Kohlbach / Codrops (MIT)
- imagery: Original (AI-generated)
- simplex noise: Ashima Arts (MIT)

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
