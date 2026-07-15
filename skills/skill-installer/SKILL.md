---
name: skill-installer
description: Install, update, trust, or inspect DeepSeek skills from GitHub or local skill folders. Use when the user asks for available skills or wants a community skill installed.
---

# Skill Installer

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this skill when the user wants to find, install, update, trust, or remove a
DeepSeek skill.

## Commands

- List installed skills: `/skills`
- Activate a skill: `/skill <name>`
- Scaffold a new skill: `/skill new`
- Install from GitHub: `/skill install github:<owner>/<repo>`
- Update installed skills: `/skill update`
- Remove a skill: `/skill uninstall <name>`
- Trust a skill for script/tool use: `/skill trust <name>`

## Workflow

1. Identify the source:
   - Existing local folder with `SKILL.md`
   - GitHub repo or registry entry
   - User request for a new skill scaffold
2. Prefer DeepSeek's native `/skill` commands over ad hoc copying.
3. For GitHub/community skills, inspect the `SKILL.md` before recommending
   trust. Treat scripts and companion files as untrusted until reviewed.
4. After installing, tell the user to restart the session if the skill does not
   appear immediately in the available-skills list.
5. If a skill conflicts by name with a workspace skill, explain that workspace
   skill directories take precedence over global `~/.deepseek/skills`.

Do not execute community skill scripts unless the user explicitly asks and the
skill has been reviewed or trusted.
