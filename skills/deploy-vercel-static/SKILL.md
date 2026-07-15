---
name: deploy-vercel-static
description: Use this plugin when the user wants to deploy an accepted static web artifact to Vercel or prepare an equivalent deployment handoff with preview and production URLs. Use when Codex needs to perform Deploy Vercel Static tasks, or when the user explicitly mentions deploy-vercel-static.
---

# Deploy Vercel Static

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Confirm the artifact path, project name, and whether this is preview-only or production.
2. Validate that the artifact can run as a static web surface.
3. Prepare deployment files if needed.
4. Ask for confirmation before deployment.
5. Deploy or produce exact deployment instructions and return links.

## Output Contract

Produce `deploy-summary.md` and a preview URL, production URL, or prepared command list.
