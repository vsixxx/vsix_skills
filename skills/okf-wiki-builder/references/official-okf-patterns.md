# Official OKF v0.1 Patterns

Use this reference when official conformance, interchange, data catalogs, or compatibility with third-party OKF consumers matters.

## Contents

- [Sources](#sources)
- [Conformance Boundary](#conformance-boundary)
- [Reserved Files](#reserved-files)
- [Concept Frontmatter](#concept-frontmatter)
- [Links And Identity](#links-and-identity)
- [Citations](#citations)
- [Sample Bundle Lessons](#sample-bundle-lessons)
- [Extension Discipline](#extension-discipline)

## Sources

- Specification: `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`
- Repository and sample bundles: `https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf`
- Google Cloud article: `https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing`

Recheck the specification before claiming a current version. The rules below describe v0.1 Draft.

## Conformance Boundary

An OKF v0.1 bundle is conformant when:

1. Every non-reserved `.md` concept file has parseable YAML frontmatter.
2. Every concept frontmatter mapping contains a non-empty `type`.
3. Reserved `index.md` and `log.md` files follow their special structures when present.

Consumers must remain permissive about:

- Missing optional fields.
- Unknown `type` values.
- Unknown extension fields.
- Broken cross-links.
- Missing `index.md` files.

Do not turn recommendations or local quality gates into core conformance errors.

## Reserved Files

`index.md` is an optional progressive-disclosure directory listing. It normally has no frontmatter. Only the bundle-root `index.md` may use frontmatter to declare:

```yaml
---
okf_version: "0.1"
---
```

Index entries should be standard Markdown links followed by concise descriptions. Producers may generate indexes; consumers may synthesize them.

`log.md` is an optional chronological update log. Use ISO `YYYY-MM-DD` headings, newest first. It has no concept frontmatter.

## Concept Frontmatter

Only `type` is required. The official recommended fields, in priority order, are:

```yaml
---
type: BigQuery Table
title: Orders
description: One row per completed customer order.
resource: https://console.cloud.google.com/bigquery/...
tags:
  - sales
timestamp: 2026-07-16T02:30:00Z
---
```

- Use descriptive, self-explanatory type strings.
- Use `resource` only when the concept describes an underlying asset with a canonical URI.
- Use a timezone-aware ISO 8601 `timestamp` for the last meaningful change.
- Preserve unknown producer-defined fields when rewriting frontmatter.

## Links And Identity

The concept ID is its bundle path without `.md`, such as `tables/orders`.

OKF supports:

- Bundle-relative links: `[Orders](/tables/orders.md)`
- File-relative links: `[Orders](../tables/orders.md)`

The specification recommends bundle-relative links, but the official sample bundles moved to file-relative links so they render correctly on GitHub and generic Markdown viewers. Prefer file-relative links for authored bundles unless a consumer specifically requires root-relative links. Consumers should resolve both.

Standard Markdown links are the interoperable graph edge. Wikilinks are not part of OKF v0.1. Relationship meaning comes from surrounding prose; typed relationship metadata is currently an extension.

## Citations

Use a `# Citations` section for external sources supporting claims. The official numbered-list example does not yet define a portable inline marker syntax. Until clarified:

- Put a descriptive inline Markdown link adjacent to a high-impact claim when practical.
- Keep a final `# Citations` section for the authoritative source list.
- Avoid ambiguous bare markers such as `[1][2]`.
- Use reference concept pages when a source supports many concepts or needs a durable summary.

## Sample Bundle Lessons

- GA4 demonstrates datasets, tables, metrics, join references, citations, and generated indexes.
- Stack Overflow demonstrates many related tables plus supporting reference concepts.
- Bitcoin demonstrates a small, usable bundle without unnecessary taxonomy.

Use these as examples, not as a required type registry. OKF deliberately does not define a fixed taxonomy or body schema.

## Extension Discipline

OKF permits arbitrary frontmatter extensions. For interoperability:

1. Add an extension only when a consumer or governance rule uses it.
2. Define its semantics once in the bundle profile.
3. Keep the Markdown body sufficient for consumers that ignore the extension.
4. Avoid adopting open community proposals as though they were part of v0.1.
5. Preserve unknown fields during automated edits.
