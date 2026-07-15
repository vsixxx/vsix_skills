---
name: od-new-generation
description: Default reference pipeline for the new-generation taskKind — discovery → plan → generate → critique with a critique-theater devloop. Use when Codex needs to perform Od New Generation tasks, or when the user explicitly mentions od-new-generation.
---

# Od New Generation

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Spec §10.1 / §23.3.3: when a plugin omits `od.pipeline`, the daemon
falls back to this scenario plugin's pipeline. Replacing the
default for an enterprise / vertical edition is now a content edit
rather than a code change.

## Default pipeline

```jsonc
{
  "stages": [
    { "id": "discovery", "atoms": ["discovery-question-form"] },
    { "id": "plan",      "atoms": ["direction-picker", "todo-write"] },
    { "id": "generate",  "atoms": ["file-write", "live-artifact"] },
    {
      "id": "critique", "atoms": ["critique-theater"],
      "repeat": true,
      "until": "critique.score>=4 || iterations>=3"
    }
  ]
}
```

The discovery stage gives the agent a clean surface for clarifying
questions; the plan stage commits to a TodoWrite-backed plan; the
generate stage produces the artifact; the critique stage devloops
until the score converges or the iteration ceiling is hit.

## Plugins that customise this scenario

A plugin can override or extend by declaring its own `od.pipeline`.
The default applies only when the plugin's pipeline is absent.
