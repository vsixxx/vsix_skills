---
name: ppt-master
description: >
  Create and edit native, editable PowerPoint presentations in Codex. Use when
  the user asks to generate a PPTX, build a reusable presentation template,
  fill an existing PowerPoint template, beautify a deck, or add notes, audio,
  transitions, and other native presentation behavior.
---

# PPT Master

PPT Master is a routed presentation workflow for Codex and compatible agents. It creates native, editable PPTX files rather than flattened slide images. This entry owns global execution discipline and route selection; each selected route owns its procedure.

## Codex Integration

- Use the current agent's existing tools and installed Skills. Do not ask the user to install another agent or clone the upstream repository.
- For generated images, first detect an available agent-native image tool or installed image-generation Skill. `vsix-image-gen` is one compatible option when installed, but it is not the only supported implementation.
- If no image-generation capability is available, stop the image-generation stage and tell the user which image files are missing. Do not request a Gemini, OpenAI, Qwen, Zhipu, Volcengine, or other provider API key from this Skill.
- Do not silently replace failed image generation with internet image search. Web sourcing is a separate acquisition choice and runs only when the user or confirmed design plan selects it.
- Install required Python packages from this Skill's `requirements.txt` when needed. Keep dependency setup out of the user's chat unless installation genuinely cannot proceed automatically.
- Before running a bundled script, resolve `SKILL_DIR` to the directory containing this `SKILL.md`; never assume the current working directory is the repository root.
- Treat optional tools as route-specific prerequisites. Check for them at the start of the route and stop with an actionable message when they are required but unavailable.

## Mandatory Load Order

1. Read this file.
2. Read [`workflows/routing.md`](workflows/routing.md).
3. Select exactly one top-level route from the routing authority.
4. Read only that route's authority and its explicitly triggered supporting documents.

| Selected route | Runtime authority |
|---|---|
| Generate PPTX | [`workflows/generate-pptx.md`](workflows/generate-pptx.md) |
| Create Template | [`workflows/create-template.md`](workflows/create-template.md) |
| Fill Native PPTX | [`workflows/template-fill-pptx.md`](workflows/template-fill-pptx.md) |
| Enhance Native PPTX | [`workflows/native-enhance-pptx.md`](workflows/native-enhance-pptx.md) |

**Hard rule — selected authority only**: Do not load another top-level route's procedure after routing. Profiles, stages, governance files, and child workflows refine the selected route; they never compete with it.

---

## Global Execution Discipline

1. **Serial execution** — Follow the selected authority's steps in order. A completed non-blocking step may continue directly to the next eligible step.
2. **Blocking means stop** — At every `⛔ BLOCKING` gate, wait for explicit user confirmation. Do not decide on the user's behalf.
3. **No cross-phase bundling** — Do not combine work across an unclosed gate. Once the route's final user gate closes, later non-blocking steps may continue automatically.
4. **Gate before entry** — Verify every listed prerequisite before entering a step.
5. **No speculative execution** — Do not prepare later-phase artifacts before their owning step.
6. **Deterministic routing** — Do not add a route-choice question when [`routing.md`](workflows/routing.md) resolves the request. If a route prerequisite is missing, state it and stop that route.
7. **Owning-source recovery** — On failure, repair or regenerate the owning source artifact and resume from the route's declared pointer. Do not silently downgrade a required artifact.

## Global Communication Rules

- Match the user's language and source language unless the user explicitly overrides it.
- Localize user-facing option labels and explanations. Keep exact enum IDs or field names when needed for precision.
- Keep `design_spec.md` section headings and field names in the template's original English; content values may use the user's language.
- Before switching roles, read the corresponding role reference and output:

```markdown
## [Role Switch: <Role Name>]
📖 Reading role definition: references/<filename>.md
📋 Current task: <brief description>
```

---

## Workspace Compatibility

- This package is a workflow Skill, not a generic application scaffold. Do not create `.worktrees/`, tests, branch workflows, or generic engineering structure by default.
- Keep required workflow, reference, script, and template documentation inside this Skill directory.
- Repository-level documents may point into the package; package runtime files must not depend on repository-level instructions.
- On Windows, if a documented `python3 ...` command is unavailable, rerun the same command with `python`.
