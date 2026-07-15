---
name: upgrade-caniuse
description: Upgrade the caniuse-lite override in the Remotion repo. Use when asked to update caniuse-lite to the latest npm version.
---

# Upgrade Caniuse

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

- Ensure we are on the `main` branch and status is clean.
- In the root `package.json`, find the `overrides` section and update `caniuse-lite` to the latest npm version.
- Look up the latest version with npm.
- Run `bun i`.
- Commit with `Upgrade caniuse-lite to <version>` and push.
