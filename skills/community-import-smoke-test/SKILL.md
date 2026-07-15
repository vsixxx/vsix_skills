---
name: community-import-smoke-test
description: A portable community plugin for validating Open Design plugin import flows. Use when Codex needs to perform Community Import Smoke Test tasks, or when the user explicitly mentions community-import-smoke-test.
---

# Community Import Smoke Test

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when validating that Open Design can import community plugins
from a local folder, a zip archive, a GitHub subpath, or a marketplace entry.

When this plugin is applied:

1. Identify the import path the user is testing: folder, zip, GitHub, or marketplace.
2. Produce a compact import receipt that includes the plugin name, source kind,
   files detected, and any user note.
3. Keep the output intentionally small so install, apply, and provenance states
   are easy to inspect in the UI.

Do not require network access, shell commands, external connectors, or secrets.
This plugin exists to exercise install and apply plumbing, not to perform a
production workflow.

## Additional upstream documentation

Read [the additional upstream documentation](references/upstream-readme.md) when setup or background details are needed.
