---
name: voice-assigner
description: 角色音色分配原则与音色库 Use when Codex needs to perform Voice Assigner tasks, or when the user explicitly mentions voice-assigner.
---

# Voice Assigner

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## 分配原则

1. **性别匹配**：男性角色用男声，女性角色用女声
2. **年龄匹配**：少年/青年/中年/老年对应不同音色
3. **性格匹配**：
   - 活泼开朗 → 明亮有活力的音色
   - 沉稳内敛 → 低沉稳重的音色
   - 温柔体贴 → 柔和甜美的音色
   - 威严霸气 → 浑厚有力的音色
4. **角色定位**：主角用辨识度高的音色，配角用中性音色

## 使用步骤

1. 调用 `list_voices` 查看可用音色列表
2. 调用 `get_characters` 获取所有角色信息
3. 分析每个角色的性格、年龄、性别等特征
4. 为每个角色调用 `assign_voice` 分配合适的音色
5. 汇总分配结果给用户
