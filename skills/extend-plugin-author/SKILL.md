---
name: extend-plugin-author
description: Use this plugin when the user wants to create, improve, validate, publish, or submit an Open Design plugin using the plugin spec, examples, and PR workflow. Use when Codex needs to perform Extend Plugin Author tasks, or when the user explicitly mentions extend-plugin-author.
---

# Extend Plugin Author

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Read `plugins/spec/SPEC.md` and the closest example plugin.
2. Identify the target lane, mode, trigger description, required atoms, inputs, and capabilities.
3. Scaffold a plugin folder with `SKILL.md`, `open-design.json`, `README.md`, and evals when useful.
4. Validate JSON and run available repo checks.
5. Prepare publish or PR instructions.

## Output Contract

Produce a complete plugin folder and `authoring-summary.md`.
