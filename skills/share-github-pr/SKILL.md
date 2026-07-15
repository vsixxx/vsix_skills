---
name: share-github-pr
description: Use this plugin when the user wants to package an accepted plugin or artifact as a GitHub pull request for Open Design or another target repository. Use when Codex needs to perform Share GitHub PR tasks, or when the user explicitly mentions share-github-pr.
---

# Share GitHub PR

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Confirm the target repository, branch, and PR intent before making externally visible changes.
2. Read the changed artifact or plugin folder and create a concise PR summary.
3. Run available validation commands.
4. Stage only relevant files.
5. Open or prepare the PR and report the URL or exact next command.

## Output Contract

Produce `pr-summary.md` and a PR URL or prepared branch summary.
