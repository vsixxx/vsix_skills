---
name: upgrade-mediabunny
description: Upgrade Mediabunny and related @mediabunny packages across the Remotion repo. Use when asked to update Mediabunny to the latest version.
---

# Upgrade Mediabunny

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

- Find the latest version of Mediabunny with `npm view mediabunny version`.
- In the root `package.json`, update the `catalog` versions for `mediabunny`, `@mediabunny/mp3-encoder`, and `@mediabunny/ac3` to that version.
- In `packages/template-*/package.json`, update `mediabunny` and any `@mediabunny/*` packages to the same version. Templates use explicit versions, not `catalog:`, so update them manually.
- Update `packages/cli/src/extra-packages.ts` with the new Mediabunny version.
- Update `packages/studio-shared/src/package-info.ts` with the new Mediabunny version in `extraPackages`.
- Update the compatibility table in `packages/docs/docs/mediabunny/version.mdx`. To find the next version this upgrade will be applied to, look in the root `package.json` for the version and increment the patch version by 1.
- Run `bun i` at the end.
