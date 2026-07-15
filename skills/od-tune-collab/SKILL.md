---
name: od-tune-collab
description: Default reference pipeline for the tune-collab taskKind — pick a direction, patch-edit the existing artifact, critique, hand off. Use when Codex needs to perform Od Tune Collab tasks, or when the user explicitly mentions od-tune-collab.
---

# Od Tune Collab

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Spec §1 / §10.1 / §21.5 / §23.3.3: the canonical "iterate on an
existing artifact" flow. Inherits `parentArtifactId` from the
project metadata so the produced artifact's
`ArtifactManifest.parentArtifactId` is set automatically — the
artifact lineage chain stays intact across multi-turn tune cycles.

## Default pipeline

```jsonc
{
  "stages": [
    { "id": "direction", "atoms": ["direction-picker"] },
    { "id": "patch",     "atoms": ["patch-edit"] },
    {
      "id": "critique",
      "atoms": ["critique-theater"],
      "repeat": true,
      "until": "critique.score>=4 || iterations>=3"
    },
    { "id": "handoff",   "atoms": ["handoff"] }
  ]
}
```

The handoff stage records `handoffKind: 'patch'` (or
`'deployable-app'` when the user opted in via
`od plugin run --target deployable-app` AND `build-test` ran
successfully somewhere upstream in the project's history).
