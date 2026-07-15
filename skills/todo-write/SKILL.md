---
name: todo-write
description: TodoWrite-driven plan that the agent commits to before generation. Use when Codex needs to perform Todo Write tasks, or when the user explicitly mentions todo-write.
---

# Todo Write

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Before writing any artifact files, the agent commits to a numbered plan
via the TodoWrite tool. The plan is the audit trail; subsequent turns
either tick items off or rewrite the plan. The atom's prompt fragment
teaches the agent to:

1. Keep todos atomic (one verb per todo).
2. Reorder freely as the picture sharpens.
3. Mark a todo complete only after the matching artifact lands.
4. Surface blockers as todos — never silently skip.

The Open Design daemon does not enforce a particular tool name; the
agent is free to use TodoWrite (Claude Code) or an in-prompt list.
The atom's job is to keep "make a plan first" in the system prompt so
non-trivial workflows don't skip the planning step.
