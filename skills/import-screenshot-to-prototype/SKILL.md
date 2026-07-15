---
name: import-screenshot-to-prototype
description: Use this plugin when the user provides a screenshot or image reference and wants it reconstructed as an editable Open Design prototype with sensible components, layout, and responsive behavior. Use when Codex needs to perform Import Screenshot To Prototype tasks, or when the user explicitly mentions import-screenshot-to-prototype.
---

# Import Screenshot To Prototype

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Inspect the screenshot and identify layout regions, controls, typography scale, color roles, and content hierarchy.
2. Ask for the target viewport only if it cannot be inferred.
3. Rebuild the screenshot as a clean `index.html` artifact with semantic sections and reusable CSS tokens.
4. Preserve the visual intent, but replace unreadable or unavailable text with realistic editable content.
5. Add responsive behavior for at least one mobile width.
6. Self-critique visual fidelity, text fit, and editability before final.

## Output Contract

Produce `index.html` and a short `import-notes.md` that lists inferred decisions.
