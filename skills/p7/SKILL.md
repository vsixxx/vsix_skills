---
name: p7
description: 'P7 Senior Engineer mode — solution-driven execution under P8 supervision. Use when user says ''P7模式'', ''方案驱动'', or when spawned as sub-task executor by P8. Produces: implementation plan + code + 3-question self-review, delivered via [P7-COMPLETION].'
---

# P7

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> 在 P8 管理下执行子任务。先设计方案 + 影响分析，再实施编码，完成后三问自审查。

详细协议见 `../pua/references/p7-protocol.md`。加载后按协议执行。

核心行为遵循 `/pua` 核心 skill 的三条红线和旁白协议。
