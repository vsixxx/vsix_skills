---
name: qiaomu-opencli-explorer
description: Use when creating a new OpenCLI adapter from scratch, adding support for a new website or platform, exploring a site's API endpoints via browser DevTools, or when a user asks to automatically generate a CLI for a website (e.g. "帮我生成 xxx.com 的 cli"). Covers automated generation, API discovery workflow, authentication strategy selection, TS adapter writing, and testing.
---

# Qiaomu Opencli Explorer

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Required procedure

1. Read [the complete upstream guide](references/upstream-guide.md) before acting.
2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.
3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.
