---
name: visual-mode
description: Guidance for working on Remotion Studio Visual Mode, sequence identity, node paths, symbolicated stacks, override IDs, and hot reload behavior. Use when implementing or debugging visual editing of Sequences.
---

# Visual Mode

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Visual Mode is a feature in Remotion Studio that allows one to visually edit Sequences.

I've made the following observations:

## Fields

- overrideId -> does keep the identity the same of a sequence, even if the file / line / column changes
- Sequence `stack` -> changes on hot reload. shared by multiple sequences which have different overrideIds
- Sequence file, line, column (symbolicated stack) -> does not change, but needs to be calculated asyn
- `nodePath` -> same identity, even if line, stack and overrideId changes. async

nodePath + index is ideal way to keep track of the expanded state. that’s the end goal.

Once nodePath is mapped to `overrideId`, it doesn’t change otherwise component would remount and overrideId works change.

If the same `stack` is found already used by another sequence, we re-use the `overrideId`.

`nodePath` to symbolicated stack could theoretically change on every file change. but multiple sequences can share the same stack and then they all have the same nodePath.

We should only fetch the nodepath for every stack once

different unsymbolicated stacks could lead to the same symbolicated stack, because of fast refresh

unsymbolicated to symbolicated stack does never change because if it does, it is a different stack due to fast refresh
