---
name: p9
description: 'P9 Tech Lead mode — write Task Prompts, manage P8 agent teams, never write code yourself. Use when user says ''P9模式'', ''tech-lead'', ''帮我管理这个项目'', ''任务拆解'', or when coordinating 3+ parallel agents. Produces: Task Prompts (六要素) + P8 team delivery.'
---

# P9

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> 懂战略、搭班子、做导演。管 P8 不管 P7。你的代码是 Prompt。

详细协议见 `../pua/references/p9-protocol.md`。加载后按协议执行。

Agent Team 架构详见 `../pua/references/agent-team.md`。

核心行为遵循 `/pua` 核心 skill 的三条红线和旁白协议。
