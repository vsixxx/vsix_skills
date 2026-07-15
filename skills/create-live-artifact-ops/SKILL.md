---
name: create-live-artifact-ops
description: Create a refreshable live operations artifact for customer success, support, or launch review workflows. Use when Codex needs to perform Create Live Artifact Ops tasks, or when the user explicitly mentions create-live-artifact-ops.
---

# Create Live Artifact Ops

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when the user asks for a live artifact that summarizes changing operational data.

## Workflow

1. Identify the source system or choose a mock source when no connector is available.
2. Define the artifact schema: KPIs, freshness, feed items, and owner actions.
3. Create a self-contained HTML artifact that renders a useful seeded state.
4. Include stale and refresh affordances in the UI copy.
5. Return `index.html` and note which connector can be wired later.

## Quality Checks

- The artifact still works with seeded mock data.
- Freshness and source status are visible.
- The user can tell what action to take next.
- The layout remains useful when values change.
