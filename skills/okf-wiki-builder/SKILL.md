---
name: okf-wiki-builder
description: Build, migrate, lint, and maintain portable Open Knowledge Format (OKF) Markdown bundles and durable knowledge workspaces. Use for software and data project fact bases, business workspaces, operations, research corpora, writing, design, brand, campaigns, media and other creative projects, including goals, constraints, stakeholders, concepts, claims, sources, decisions, assumptions, briefs, artifacts, feedback, selections, playbooks, runbooks, provenance, cross-session context, or official Google OKF v0.1 conformance checks.
---

# OKF Wiki Builder

Build knowledge in explicit layers:

1. **OKF v0.1 Core** provides the portable interchange format.
2. **Knowledge Workspace** provides shared durability, lifecycle, time, attribution, and maintenance rules.
3. **Domain Profiles** provide patterns for engineering, work, research, creative, or deliberate hybrids.

Never present profile fields or community proposals as official OKF requirements. Never weaken an existing high-rigor profile to accommodate a lower-rigor use case; add or select a profile instead.

## Core Contract

Follow these rules for every OKF bundle:

- Represent each concept as one UTF-8 Markdown file.
- Put parseable YAML frontmatter on concept files and require only a non-empty string `type` for core conformance.
- Treat the concept path without `.md` as its OKF v0.1 identity. Avoid moving stable pages casually.
- Use standard Markdown links. Prefer file-relative links for GitHub and generic Markdown portability; accept bundle-relative `/...` links when consuming bundles.
- Reserve `index.md` for progressive-disclosure indexes and `log.md` for chronological update history.
- Do not put frontmatter on directory `index.md` files. The bundle-root `index.md` may declare `okf_version: "0.1"`.
- Treat missing indexes, broken links, and optional frontmatter fields permissively only when checking core conformance.
- Preserve unknown frontmatter fields when round-tripping.
- Keep secrets, raw archives, scratch notes, transient task streams, and generated search indexes outside the durable concept set.

Read `references/official-okf-patterns.md` before checking official conformance or doing data-catalog work.

## Select A Profile

Choose the narrowest profile that preserves the required rigor:

| Need | CLI profile | Required reference |
|---|---|---|
| Official interchange or conformance only | `okf-v0.1` | `references/official-okf-patterns.md` |
| General work, research, creative, or mixed project | `knowledge-workspace` | `references/knowledge-workspace.md` |
| Software, data, architecture, or high-assurance project truth | `project-fact-base` | `references/project-fact-base.md` |

Keep `project-fact-base` as the default CLI profile for backward compatibility and strict project behavior. Select `knowledge-workspace` explicitly for broader domains.

Read `references/page-templates.md` for engineering, data, fact, assumption, decision, and runbook pages. Read `references/workspace-templates.md` for goals, deliverables, research, work outcomes, briefs, creative concepts, style directions, feedback, and selections.

For hybrid projects, combine relevant object types in one workspace. Do not duplicate the same object across profiles.

## Preserve Meaning

Separate these axes:

- `type`: what the object is.
- `status`: lifecycle, such as `active`, `deprecated`, `superseded`, or `archived`.
- `stage`: optional domain workflow maturity, such as `idea`, `draft`, `review`, `selected`, or `delivered`.
- `verification`: support for truth-apt content, such as `confirmed`, `assumed`, or `unknown`.
- `timestamp`: last meaningful content change.
- `last_verified`: last evidence check.
- `valid_from` and `valid_until`: optional real-world validity window.

Do not put `verification` on goals, intentions, preferences, themes, or creative directions merely to fill a template. Attribute preferences and feedback. Distinguish interpretation from source claims. Allow competing creative alternatives to coexist without treating unselected work as false.

## Admission Rule

Create a concept page when the object is durable, independently linkable, and likely to guide future action or prevent repeated discovery. Keep short-lived tasks, chat streams, raw transcripts, autosaves, and minor draft iterations outside the durable bundle.

Prefer a few well-formed objects over one giant page or hundreds of fragments.

## Workflow

1. Define the bundle boundary, intended consumers, and durability horizon.
2. Select `okf-v0.1`, `knowledge-workspace`, or `project-fact-base`.
3. Read the relevant reference named in the profile table.
4. Choose only directories justified by stable object types. Do not create empty taxonomy.
5. Initialize when needed:

   ```bash
   scripts/okf_bundle.py init <bundle-dir> --title "<title>" \
     --profile knowledge-workspace
   ```

   Existing engineering behavior remains:

   ```bash
   scripts/okf_bundle.py init <bundle-dir> --title "<title>" \
     --profile project-fact-base
   ```

6. Inspect authoritative inputs: code, schemas, docs, sources, research, briefs, artifacts, decisions, feedback, and user instructions.
7. Convert only durable, reusable outcomes into concept pages.
8. Use the relevant templates and remove irrelevant fields or sections.
9. Link related concepts and place attribution close to consequential content.
10. Generate or refresh concise indexes after concept changes.
11. Lint core conformance, then the selected strict profile:

    ```bash
    scripts/okf_bundle.py lint <bundle-dir> --profile okf-v0.1
    scripts/okf_bundle.py lint <bundle-dir> --profile knowledge-workspace
    scripts/okf_bundle.py lint <bundle-dir> --profile project-fact-base
    ```

12. Inspect high-impact pages manually. Passing lint does not prove factual quality, creative quality, or decision authority.

## Frontmatter

Use official fields first:

```yaml
---
type: Creative Brief
title: Product Reveal Film
description: Governing objective, audience, message, and constraints for the film.
resource: repo://briefs/product-reveal.md
tags:
  - launch
timestamp: 2026-07-16T10:30:00+08:00
---
```

Add profile extensions only when they have defined semantics and a real consumer:

```yaml
status: active
stage: approved
```

For a truth-apt page, add evidence semantics:

```yaml
verification: confirmed
last_verified: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/audience-study.md
```

Require `title`, `description`, and timezone-aware `timestamp` in both strict profiles. Keep the Markdown body sufficient for consumers that ignore extensions.

## Maintenance

At the start of work:

- Read the root index and the governing Goal, Brief, Research Question, or active Decision.
- Read relevant constraints and current artifacts before broad project inspection.
- Check `status` and `stage` before treating a page as current guidance.
- Verify assumptions, stale claims, and unattributed feedback before risky use.

After meaningful work:

- Update durable outcomes, decisions, findings, artifacts, feedback, and selections rather than copying the activity stream.
- Preserve superseded guidance and rejected directions when their rationale prevents repeated work.
- Update `timestamp` for meaningful content changes and `last_verified` for evidence checks.
- Keep indexes, backlinks, graph views, embeddings, and search stores derived and reproducible.
- Run the selected strict profile without replacing the core conformance check.

Community proposals such as identity independent of paths, typed relationship registries, reliability objects, durability hints, and confidence scoring remain optional experiments until adopted by the official specification. Define any experiment as bundle-local policy and do not make it silently mandatory.
