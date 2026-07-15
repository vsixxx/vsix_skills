---
name: obsidian-vault-maintainer
description: Maintain an Obsidian-friendly memory wiki vault with wikilinks, frontmatter, and official Obsidian CLI awareness. Use when Codex needs to perform Obsidian Vault Maintainer tasks, or when the user explicitly mentions obsidian-vault-maintainer.
---

# Obsidian Vault Maintainer

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this skill when the memory-wiki vault render mode is `obsidian` or the user wants the wiki to play nicely with Obsidian.

- Start from `openclaw wiki status` to confirm the vault mode and whether the official Obsidian CLI is available.
- Use `openclaw wiki obsidian status` before shelling out, then prefer the dedicated helpers like `openclaw wiki obsidian search`, `openclaw wiki obsidian open`, `openclaw wiki obsidian command`, and `openclaw wiki obsidian daily`.
- Prefer `[[Wikilinks]]`, stable filenames, and frontmatter that works with Obsidian dashboards and Dataview-style queries.
- Keep generated sections deterministic so Obsidian users can safely add handwritten notes around them.
- If the official Obsidian CLI is enabled, probe it before depending on it. Do not assume the app is installed, running, or configured.
- Avoid destructive renames unless you also have a link-repair plan.
