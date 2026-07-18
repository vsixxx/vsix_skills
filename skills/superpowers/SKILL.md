---
name: superpowers
description: Install and activate the complete official Superpowers development workflow bundle for coding agents.
---

# Superpowers

This package vendors the complete official `obra/superpowers` plugin. Keep the
bundle intact: `.codex-plugin/plugin.json` registers every Skill under
`skills/`.

## Installation

1. Inspect `.codex-plugin/plugin.json` and the bundled `skills/` directory.
2. If the current agent supports plugins, install this package root as a plugin.
   Do not flatten or install only this wrapper Skill.
3. If the current agent supports Skills but not plugins, copy each immediate
   child directory under `skills/` into that agent's Skills directory.
4. Do not execute bundled scripts during installation.
5. Verify that all 14 bundled Skills are discoverable, including
   `using-superpowers`, `brainstorming`, `writing-plans`,
   `test-driven-development`, `systematic-debugging`, and
   `verification-before-completion`.

After installation, use the bundled `using-superpowers` Skill as the suite's
runtime entry point. Preserve the official Skill files and their relative
paths because several workflows reference sibling Skills and templates.

The optional brainstorming visual companion may start a local server and load
a remote brand image. Start it only after the user explicitly agrees. Set
`SUPERPOWERS_DISABLE_TELEMETRY=1` to disable that remote image request.
