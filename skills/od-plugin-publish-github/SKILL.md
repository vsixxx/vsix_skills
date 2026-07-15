---
name: od-plugin-publish-github
description: Publish a local Open Design plugin to a new public GitHub repository using gh CLI. Use when Codex needs to perform Od Plugin Publish GitHub tasks, or when the user explicitly mentions od-plugin-publish-github.
---

# Od Plugin Publish GitHub

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this workflow when the active project contains a copied plugin folder and the user wants it published as a new public GitHub repository.

## Workflow

1. Read the active plugin inputs. `plugin_context_path` is the copied plugin folder relative to the project working directory.
2. Inspect `open-design.json`, `SKILL.md`, and any compatibility metadata in the copied folder.
3. Call the local daemon endpoint instead of hand-rolling GitHub commands:
   `curl -sS -X POST "$OD_DAEMON_URL/api/projects/$OD_PROJECT_ID/plugins/publish-github" -H 'content-type: application/json' -d '{"path":"<plugin_context_path>"}'`
4. Read the JSON response. If `ok` is true, report the final repository URL and any useful log/validation summary.
5. If the endpoint fails, report its `message`, `code`, and useful log lines. When authentication is missing, tell the user to run `gh auth login --hostname github.com`.

Prefer the manifest `name` as the repository slug. If that repository already exists, choose the next clear slug and mention the rename.
