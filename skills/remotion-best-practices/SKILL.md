---
name: remotion-best-practices
description: Best practices for Remotion Use when Codex needs to perform Remotion Best Practices tasks, or when the user explicitly mentions remotion-best-practices.
---

# Remotion Best Practices

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## New project setup

If no Remotion project currently exists, load [Create a new Remotion project](remotion-create/SKILL.md)

## React Markup Best Practices

If you are writing Remotion React Markup, load [Remotion Markup Best Practices](remotion-markup/SKILL.md)

## Mediabunny Skills

For achieving multimedia tasks in the browser, such as trimming, cropping videos, or getting metadata from them, load [Mediabunny Best Practices](mediabunny/SKILL.md)

## Improving Interactivity

By structuring the Remotion markup well, we can allow users to interactively change things in the Studio and write back to code. If relevant: [Interactivity Best Practices](remotion-interactivity/SKILL.md)

## Rendering

For advanced rendering beyond simple `npx remotion render`, see: [Rendering Best Practices](remotion-render/SKILL.md)

## Captions

When working with Captions, load [Remotion Captions](remotion-captions/SKILL.md).

## Creating a SaaS, automation or application

Use the [Remotion SaaS skill](remotion-saas/SKILL.md) for knowledge about Remotion-powered SaaS apps, such as `<Player>`, rendering on Lambda, Vercel, Cloudflare, via Express.js, client-side rendering, or for finding the right SaaS template.
