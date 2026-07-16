# Skill Review 2026-07-16

本轮审查对象：从 Hermes 来源分支导入后、经过首轮删除筛选后剩余的 91 个 skill。

## 验证标准

- `SKILL.md` 和 `agents/openai.yaml` 不应出现要求必须在 Hermes Agent 生态运行的描述。
- 如果只是 `skill.json` 的 `sourceUrl`、`homepage`、`author` 中保留 Hermes 来源信息，视为 provenance，不作为删除条件。
- 旧的分类目录路径要改成当前仓库的一层目录结构，例如 `${CODEX_HOME:-$HOME/.codex}/skills/<skill-id>/...`。
- 有重型依赖、桌面软件、本地服务、外部账号、API token、GPU/模型 checkpoint 的 skill 先保留但列入用户决策清单。
- 运行 `node scripts/validate-skills.mjs` 必须通过。

## 已执行清理

- 删除了用户明确要求移除的 skill，包括训练/推理/GPU、Hermes 生态、其他 agent CLI、OSINT/安全、企业账号和高摩擦服务类。
- 额外移除了 `agentmail`、`antigravity-cli`、`blackbox`、`computer-use`：它们不是适合公开目录的通用 Codex skill。
- 将 `claude-design` 的展示名改为 `Artifact Design`，保留目录 id，避免用户界面误以为必须使用 Claude。
- 修正了从上游分类路径导入造成的错误路径：`hyperliquid`、`darwinian-evolver`、`fastmcp`、`stocks`、`memento-flashcards`、`touchdesigner-mcp`、`github-code-review`。
- 清理了正文里残留的 agent 生态硬编码或语法误伤：`1password`、`baoyu-comic`、`design-md`、`fastmcp`、`notion`、`page-agent`、`popular-web-designs`、`sketch`、`3-statement-model`、`lbo-model`、`merger-model`。
- 根据后续筛选移除：`1password`、`bioinformatics`、`chroma`、`cloudflare-temporary-deploy`、`gitnexus-explorer`、`guidance`、`heartmula`、`here-now`、`llava`、`openhue`、`pinecone`、`qmd`、`shopify`。

## 当前保留数

- 当前剩余：78 个 skill。
- 校验状态：`node scripts/validate-skills.mjs` 通过。

## 建议直接保留

这些 skill 没有明显 Hermes 绑定，也没有重型运行依赖。部分仍可能依赖常见命令或网络访问，但整体适合公开目录。

| skill | 判断 |
| --- | --- |
| `3-statement-model` | 保留；依赖 `excel-author` 工作流。 |
| `adversarial-ux-test` | 保留；偏 UX 评审，低依赖。 |
| `architecture-diagram` | 保留；输出独立 HTML/SVG。 |
| `arxiv` | 保留；公开 API，无 key。 |
| `ascii-art` | 保留；轻量 CLI/可选 pip。 |
| `baoyu-article-illustrator` | 保留；创作型 skill。 |
| `baoyu-comic` | 保留；已修正 agent 文案。 |
| `baoyu-infographic` | 保留；创作型 skill。 |
| `claude-design` | 保留；展示名已中性化为 `Artifact Design`。 |
| `code-wiki` | 保留；代码库文档生成。 |
| `codebase-inspection` | 保留；只需 `pygount`。 |
| `comps-analysis` | 保留；依赖 `excel-author` 工作流。 |
| `concept-diagrams` | 保留；独立 HTML/SVG。 |
| `creative-ideation` | 保留；方法论型，无重依赖。 |
| `dcf-model` | 保留；依赖 `excel-author` 工作流。 |
| `design-md` | 保留；规范文件处理。 |
| `domain-intel` | 保留；标准库被动查询，无 key。 |
| `drug-discovery` | 保留；需 `curl/python3`，但不是本地模型栈。 |
| `excalidraw` | 保留；生成 Excalidraw JSON。 |
| `excel-author` | 保留；通用 Office 产出能力。 |
| `fitness-nutrition` | 保留；USDA 可用 `DEMO_KEY`，正式 key 只是提高限额。 |
| `github-auth` | 保留；GitHub 常见刚需。 |
| `github-code-review` | 保留；GitHub 工作流刚需。 |
| `github-issues` | 保留；GitHub 工作流刚需。 |
| `github-pr-workflow` | 保留；GitHub 工作流刚需。 |
| `github-repo-management` | 保留；GitHub 工作流刚需。 |
| `huggingface-hub` | 保留；下载/搜索模型数据集，非训练本身。 |
| `humanizer` | 保留；文本处理。 |
| `hyperliquid` | 保留；只读公开接口，无 key。 |
| `lbo-model` | 保留；依赖 `excel-author` 工作流。 |
| `llm-wiki` | 保留；知识库组织。 |
| `maps` | 保留；公开地图接口，无 key。 |
| `meme-generation` | 保留；Pillow 生成图片。 |
| `memento-flashcards` | 保留；本地闪卡脚本。 |
| `merger-model` | 保留；依赖 `excel-author` 工作流。 |
| `ocr-and-documents` | 保留；文档处理，后续可视依赖再细分。 |
| `one-three-one-rule` | 保留；决策框架。 |
| `p5js` | 保留；创意代码。 |
| `pixel-art` | 保留；Pillow/可选 ffmpeg。 |
| `polymarket` | 保留；公开市场数据。 |
| `popular-web-designs` | 保留；参考型视觉库，已修正文案。 |
| `powerpoint` | 保留；通用 Office 产出能力。 |
| `pptx-author` | 保留；通用 Office 产出能力。 |
| `pretext` | 保留；前端创意 demo。 |
| `requesting-code-review` | 保留；代码审查流程。 |
| `searxng-search` | 保留；可用公共实例，无 key。 |
| `simplify-code` | 保留；代码简化审查流程。 |
| `sketch` | 保留；一次性 HTML 原型。 |
| `songwriting-and-ai-music` | 保留；提示词/创作指导，非本地生成。 |
| `spike` | 保留；工程实验流程。 |
| `stocks` | 保留；只读行情，无交易能力。 |
| `systematic-debugging` | 保留；调试流程。 |
| `test-driven-development` | 保留；TDD 流程。 |
| `vsix-image-gen` | 保留；我们自己的 skill。 |
| `youtube-content` | 保留；轻量依赖 `youtube-transcript-api`。 |

## 需要用户决策

这些不是 Hermes 专属，但公开收录前建议你决定是否符合“面向普通用户、低摩擦”的方向。

| skill | 原因 | 建议 |
| --- | --- | --- |
| `apple-notes` | macOS + `memo` CLI。 | 可作为 macOS 专区保留。 |
| `apple-reminders` | macOS + `remindctl` CLI。 | 可作为 macOS 专区保留。 |
| `ascii-video` | 依赖 ffmpeg，视频处理耗时。 | 可保留，但标注前置条件。 |
| `blender-mcp` | 需要 Blender 桌面实例和插件/socket。 | 适合创意高级用户；普通用户门槛高。 |
| `comfyui` | ComfyUI、模型、节点、REST/WebSocket，本地 AI 生成重依赖。 | 建议移除或放高级实验区。 |
| `darwinian-evolver` | 进化式 prompt/代码实验，需 `uv`、外部模型 API 或本地环境。 | 建议暂缓。 |
| `docker-management` | 需要 Docker，本身会操作容器/卷/网络。 | 开发者向可保留，普通用户暂缓。 |
| `fastmcp` | 开发/部署 MCP 服务器，偏开发者。 | 可保留在开发者分类。 |
| `findmy` | macOS + FindMy.app，涉及个人设备位置。 | 隐私敏感，建议谨慎。 |
| `hyperframes` | Node 22、npx、ffmpeg、浏览器渲染，视频生产链较重。 | 你自己工作流可用，但公开目录建议标为高级。 |
| `manim-video` | Manim/ffmpeg/数学视频环境。 | 可保留为高级创作类。 |
| `mcporter` | MCP CLI、npx、OAuth/config/daemon。 | 开发者向可保留。 |
| `node-inspect-debugger` | Node Inspector/CDP，纯开发调试。 | 开发者向可保留。 |
| `notion` | 需要 Notion API key/账号。 | 可保留，但前置条件必须明显。 |
| `obsidian` | 依赖用户本地 Obsidian vault。 | 可保留为个人知识库类。 |
| `page-agent` | 面向把 GUI agent 嵌入 Web 应用，偏开发者产品集成。 | 开发者向可保留。 |
| `qdrant-vector-search` | 向量数据库，可能需要本地/远程 Qdrant。 | 建议暂缓或开发者分类。 |
| `research-paper-writing` | 多个 Python 包、论文模板和学术流程。 | 专业价值高，但依赖多；可单独判断。 |
| `segment-anything-model` | `segment-anything`、`transformers`、`torch`。 | 建议移除或高级实验区。 |
| `siyuan` | 自托管 SiYuan、token、URL；可选 MCP。 | 小众但可保留为个人知识库类。 |
| `songsee` | Go 安装 CLI，可选 ffmpeg。 | 轻中度依赖，按音频方向决定。 |
| `stable-diffusion-image-generation` | `diffusers/transformers/accelerate/torch`，本地模型。 | 建议移除。 |
| `touchdesigner-mcp` | TouchDesigner 桌面软件、twozero MCP、本地端口无鉴权。 | 高级创意用户可保留，普通目录建议暂缓。 |

## Hermes/Agent 绑定结论

- 未发现剩余 skill 必须依赖 Hermes Agent 运行。
- `skill.json` 中仍大量保留 `NousResearch/hermes-agent` 的来源链接，这是来源信息，不影响运行。
- 真正可能误导用户的 `Claude Design` 展示名已改成 `Artifact Design`；目录 id 暂不改，避免破坏安装路径。
