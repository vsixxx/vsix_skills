---
name: video-report
description: Generate a report about a video Use when Codex needs to perform Video Report tasks, or when the user explicitly mentions video-report.
---

# Video Report

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

When a user reports a video not working, we should download the URL and put it as the `src` in `packages/example/src/NewVideo.tsx`.

Then, in `packages/example`, we should run `bunx remotion render NewVideo --log=verbose`.
