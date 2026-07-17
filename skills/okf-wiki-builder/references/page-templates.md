# Page Templates

Use these as starting points. Remove sections and fields that do not help the concept.

## Contents

- [Bundle Root Index](#bundle-root-index)
- [Directory Index](#directory-index)
- [Concept](#concept)
- [Fact](#fact)
- [Decision](#decision)
- [Assumption](#assumption)
- [Runbook](#runbook)
- [Data Table](#data-table)
- [Reference](#reference)

## Bundle Root Index

```markdown
---
okf_version: "0.1"
---

# Project Knowledge

## Overview

One paragraph defining the bundle boundary and intended consumers.

## Object Indexes

- [Concepts](concepts/index.md)
- [Decisions](decisions/index.md)
- [Runbooks](runbooks/index.md)
- [References](references/index.md)
```

## Directory Index

Directory indexes have no frontmatter.

```markdown
# Concepts

- [Example Concept](example-concept.md) - One-sentence description.
```

## Concept

```markdown
---
type: Concept
title: Example Concept
description: One concise sentence.
status: active
verification: confirmed
tags:
  - domain
timestamp: 2026-07-16T10:30:00+08:00
last_verified: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/source.md
---

# Overview

Explain the concept in plain language.

# Key Points

- Point one.
- Point two.

# Usage

Describe when this concept should guide work.

# Related Objects

- [Related Playbook](../playbooks/example.md)

# Citations

- [Authoritative source](../references/source.md)
```

## Fact

```markdown
---
type: Fact
title: Example Fact
description: One concise statement of the fact.
status: active
verification: confirmed
timestamp: 2026-07-16T10:30:00+08:00
last_verified: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/evidence.md
---

# Statement

State the fact plainly.

# Evidence

- [Evidence](../references/evidence.md) and what it proves.

# Implications

- What future work should do differently because this is true.

# Related Objects

- [Related Decision](../decisions/example.md)
```

## Decision

```markdown
---
type: Decision
title: Example Decision
description: One concise sentence describing the choice.
status: active
verification: confirmed
timestamp: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/source.md
---

# Decision

State the choice that guides future work.

# Context

Explain the forces and constraints.

# Alternatives Considered

- Alternative and why it was not selected.

# Consequences

- Expected benefit, cost, or constraint.

# Revisit When

- A concrete condition that should trigger reconsideration.
```

## Assumption

```markdown
---
type: Assumption
title: Example Assumption
description: One concise sentence describing the working belief.
status: active
verification: assumed
timestamp: 2026-07-16T10:30:00+08:00
---

# Assumption

State the working belief.

# Why It Is Plausible

- Supporting observation or partial evidence.

# Validation Plan

- How and when to check it.

# Risk If Wrong

- What could fail or be misdirected.
```

## Runbook

```markdown
---
type: Runbook
title: Example Runbook
description: Repeatable procedure for a specific operational condition.
status: active
verification: confirmed
timestamp: 2026-07-16T10:30:00+08:00
---

# When To Use

Describe the trigger.

# Preconditions

- Required access, state, or input.

# Steps

1. Perform the first action.
2. Perform the next action.

# Verification

- Observable success condition.

# Rollback

- How to return to the prior safe state.
```

## Data Table

````markdown
---
type: BigQuery Table
title: Example Table
description: One row per example entity.
resource: bigquery://project.dataset.table
status: active
verification: confirmed
tags:
  - data
timestamp: 2026-07-16T10:30:00+08:00
last_verified: 2026-07-16T10:30:00+08:00
---

# Overview

Explain what the table represents and who owns it.

# Grain

One row per ...

# Schema

| Field | Type | Meaning |
|---|---|---|
| `id` | STRING | Primary identifier. |

# Relationships

Join to [Other Table](other-table.md) on `id`.

# Usage Notes

- Important limitation or validity condition.

# Examples

```sql
SELECT COUNT(*) FROM `project.dataset.table`;
```

# Citations

- [Schema source](../references/schema-source.md)
````

## Reference

```markdown
---
type: Reference
title: Source Name
description: What this source covers and why it is authoritative.
resource: https://example.com/source
status: active
verification: confirmed
timestamp: 2026-07-16T10:30:00+08:00
last_verified: 2026-07-16T10:30:00+08:00
---

# Scope

Describe what the source covers.

# Useful Claims

- Claim, context, and limitation.

# Used By

- [Dependent Concept](../concepts/object.md)
```
