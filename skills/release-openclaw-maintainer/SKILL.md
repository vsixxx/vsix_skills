---
name: release-openclaw-maintainer
description: Prepare or verify OpenClaw stable, beta, and extended-stable releases, including backport discovery, changelogs, release notes, publish commands, and artifacts. Use when Codex needs to perform Release Openclaw Maintainer tasks, or when the user explicitly mentions release-openclaw-maintainer.
---

# Release Openclaw Maintainer

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Required procedure

1. Read [the complete upstream guide](references/upstream-guide.md) before acting.
2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.
3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.
