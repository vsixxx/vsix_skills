---
name: update-stars
description: Update Remotion homepage GitHub star counts. Use when asked to refresh the displayed GitHub star count and push the change to main.
---

# Update Stars

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Check on GitHub how many stars Remotion has.

Always round down to the closest 1000, never round up.

Update:

- `packages/promo-pages/src/components/homepage/CommunityStatsItems.tsx`
- `packages/promo-pages/src/components/homepage/GitHubButton.tsx`

Commit and push to `main`.
