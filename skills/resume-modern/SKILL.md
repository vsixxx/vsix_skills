---
name: resume-modern
description: Modern minimal resume, single A4 page, ready for print or PDF export. Use when Codex needs to perform Resume Modern tasks, or when the user explicitly mentions resume-modern.
---

# Resume Modern

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

【模板: 现代极简简历】
- 容器宽度模拟 A4: `w-[210mm] min-h-[297mm] mx-auto`, 内边距 16-20mm。
- 顶部姓名巨大 (text-4xl), 底下一行 contact (邮箱 / 电话 / 城市 / GitHub / LinkedIn), 中间用细竖线分隔。
- 主体两栏可选: 左 60% 主线（经历/项目/教育）, 右 40% 副线（技能/语言/获奖）。
- 章节标题: small caps 风格, 上方一条短 accent 线 (w-8 h-0.5)。
- 经历每条: 公司 + 职位 + 时间区间 (右对齐), 下方 1-3 条 bullet 用动词开头。
- 不使用花哨颜色, 黑白灰 + 1 个 accent (深蓝 / 墨绿)。
- 添加 @media print 样式, 隐藏不必要的元素, 颜色保留。
