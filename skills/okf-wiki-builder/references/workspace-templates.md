# Knowledge Workspace Templates

Use these templates for work, research, and creative projects. Keep only useful fields and sections. Use the engineering templates in `references/page-templates.md` for facts, assumptions, runbooks, data tables, and high-assurance decisions.

## Contents

- [Goal](#goal)
- [Constraint](#constraint)
- [Artifact Or Deliverable](#artifact-or-deliverable)
- [Meeting Outcome](#meeting-outcome)
- [Research Question](#research-question)
- [Research Claim](#research-claim)
- [Synthesis](#synthesis)
- [Creative Brief](#creative-brief)
- [Creative Concept](#creative-concept)
- [Style Direction](#style-direction)
- [Feedback](#feedback)
- [Selection](#selection)

## Goal

```markdown
---
type: Goal
title: Example Goal
description: The durable outcome this project intends to create.
status: active
stage: committed
timestamp: 2026-07-16T10:30:00+08:00
---

# Outcome

Describe the desired change, not merely the activity.

# Success Conditions

- Observable condition one.

# Scope

State what is included and excluded.

# Constraints

- [Relevant Constraint](../constraints/example.md)

# Related Work

- [Deliverable](../artifacts/example.md)
```

## Constraint

```markdown
---
type: Constraint
title: Example Constraint
description: A boundary that current work must respect.
status: active
timestamp: 2026-07-16T10:30:00+08:00
---

# Constraint

State the boundary precisely.

# Source Or Authority

Explain whether it comes from law, platform capability, budget, user direction, brand, schedule, or a decision.

# Implications

- What this rules in or out.

# Revisit When

- Condition that could change the constraint.
```

## Artifact Or Deliverable

```markdown
---
type: Deliverable
title: Example Deliverable
description: Canonical output produced by the project.
resource: repo://outputs/example
status: active
stage: review
timestamp: 2026-07-16T10:30:00+08:00
---

# Purpose

Explain what this output is for and who uses it.

# Acceptance Criteria

- Criterion one.

# Dependencies

- [Governing Brief Or Goal](../goals/example.md)

# Current State

Summarize the meaningful current version and remaining issues.

# History

- Link only significant predecessor or successor versions.
```

## Meeting Outcome

```markdown
---
type: Meeting Outcome
title: Example Review Outcome
description: Durable decisions, commitments, and unresolved issues from a review.
status: active
timestamp: 2026-07-16T10:30:00+08:00
---

# Context

State the purpose, date, participants or represented roles, and artifact reviewed.

# Decisions

- Decision and authority.

# Commitments

- Owner, outcome, and meaningful due condition.

# Open Issues

- Consequential unresolved question.

# Related Objects

- [Reviewed Artifact](../artifacts/example.md)
```

## Research Question

```markdown
---
type: Research Question
title: Example Research Question
description: A scoped question the project is investigating.
status: active
stage: investigating
timestamp: 2026-07-16T10:30:00+08:00
---

# Question

State the question precisely.

# Why It Matters

Explain which decision or understanding depends on it.

# Scope

Define population, period, domain, and exclusions when relevant.

# Evaluation Criteria

- What would count as a useful answer.

# Related Claims And Sources

- [Claim](../claims/example.md)
```

## Research Claim

```markdown
---
type: Claim
title: Example Claim
description: A proposition evaluated against evidence.
status: active
verification: assumed
timestamp: 2026-07-16T10:30:00+08:00
last_verified: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/source.md
---

# Claim

State the proposition without hiding qualifiers.

# Supporting Evidence

- [Source](../references/source.md) and what it supports.

# Counterevidence And Limitations

- Conflicting result, missing population, or methodological limitation.

# Assessment

Explain why the current verification state is appropriate.

# Implications

- What changes if this claim is accepted or rejected.
```

## Synthesis

```markdown
---
type: Synthesis
title: Example Synthesis
description: Interpretation derived from multiple sources or observations.
status: active
stage: review
timestamp: 2026-07-16T10:30:00+08:00
source_refs:
  - ../references/source-a.md
  - ../references/source-b.md
---

# Inputs

- [Source A](../references/source-a.md)
- [Source B](../references/source-b.md)

# Synthesis

State the integrated interpretation.

# Reasoning

Show how the inputs support the interpretation.

# Tensions And Gaps

- What does not fit or remains unresolved.

# Implications

- Decision, experiment, or next question this informs.
```

## Creative Brief

```markdown
---
type: Creative Brief
title: Example Creative Brief
description: Governing intent, audience, message, and constraints for a creative project.
status: active
stage: approved
timestamp: 2026-07-16T10:30:00+08:00
---

# Objective

Describe the intended audience or business effect.

# Audience

Describe relevant context and needs. Link evidence-backed audience research when available.

# Core Message

State what the audience should understand, feel, or do.

# Required Elements

- Required content, format, channel, brand, accessibility, or legal element.

# Exclusions

- Direction or content that should not be used.

# Success Criteria

- Criteria appropriate to the medium and objective.

# References

- [Relevant Reference](../references/example.md)
```

## Creative Concept

```markdown
---
type: Creative Concept
title: Example Concept
description: An explorable creative direction responding to the brief.
status: active
stage: idea
timestamp: 2026-07-16T10:30:00+08:00
---

# Concept

Describe the central idea and intended audience effect.

# Rationale

Explain how it responds to the [Creative Brief](../briefs/example.md).

# Execution Possibilities

- Meaningful expression in copy, image, sound, motion, interaction, or space.

# Risks

- Misreading, feasibility issue, similarity concern, or audience risk.

# Evaluation Criteria

- How this direction should be compared with alternatives.

# Related Directions

- [Alternative Concept](alternative.md)
```

## Style Direction

```markdown
---
type: Style Direction
title: Example Style Direction
description: Coherent aesthetic and expressive rules for the project.
status: active
stage: selected
timestamp: 2026-07-16T10:30:00+08:00
---

# Intended Effect

Describe the experience this direction should create.

# Principles

- A concrete visual, verbal, sonic, spatial, or interaction principle.

# Avoid

- A specific pattern that conflicts with the intended effect.

# References

- [Inspiration](../references/example.md) - Name the transferable quality, not merely the source.

# Applications

- How the direction applies across relevant artifacts or channels.
```

## Feedback

```markdown
---
type: Feedback
title: Example Review Feedback
description: Attributed response to a specific artifact or concept in a known context.
status: active
timestamp: 2026-07-16T10:30:00+08:00
---

# Context

Identify who or which audience segment responded, when, under what conditions, and to which artifact version.

# Observations

- What was observed or said, without prematurely converting it into a decision.

# Interpretation

Explain what the feedback may indicate and what remains uncertain.

# Response

- Decision, experiment, or revision prompted by the feedback.

# Related Artifact

- [Reviewed Artifact](../artifacts/example.md)
```

## Selection

```markdown
---
type: Selection
title: Example Concept Selection
description: Chosen creative or work direction and the rationale for choosing it.
status: active
stage: selected
timestamp: 2026-07-16T10:30:00+08:00
---

# Selection

Name the selected concept, variant, or approach.

# Authority

Record who or what had authority to choose.

# Criteria And Rationale

- Criterion and how the selection performed.

# Alternatives Considered

- [Alternative](../concepts/alternative.md) and why it was not selected now.

# Consequences

- What downstream work this selection enables or constrains.

# Revisit When

- New evidence, feedback, or constraint that should reopen the choice.
```
