---
name: design-consultation
description: 'Design consultation: understands your product, researches the landscape, proposes a complete design system (aesthetic, typography, color, layout, spacing, motion), and generates font+color preview... (gstack) Use when Codex needs to perform Design Consultation tasks, or when the user explicitly mentions design-consultation.'
---

# Design Consultation

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Required procedure

1. Read [the complete upstream guide](references/upstream-guide.md) before acting.
2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.
3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.
