---
name: create-hyperframes-launch
description: Use this plugin when the user wants a HyperFrames-ready HTML motion composition, launch animation, kinetic typography clip, product reveal, or social video made from code. Use when Codex needs to perform Create Hyperframes Launch tasks, or when the user explicitly mentions create-hyperframes-launch.
---

# Create Hyperframes Launch

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Clarify duration, aspect ratio, product, text beats, and motion style.
2. Plan the composition as scenes with exact timings.
3. Create HyperFrames-ready HTML with named layers, restrained animation, and render notes.
4. Keep composition source organized under a cache or source folder and return the rendered artifact or render instructions.
5. Critique timing, legibility, and whether the composition can render deterministically.

## Output Contract

Produce `hyperframes-plan.md` and a render-ready composition folder or rendered video.
