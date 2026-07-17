# Knowledge Workspace Profile

Use this profile for durable project context that is broader than an engineering fact base: business work, operations, planning, research, writing, design, media, campaigns, and other creative production.

This profile extends OKF v0.1. It preserves rigor without treating every useful object as an objective fact.

## Contents

- [Purpose](#purpose)
- [Layering](#layering)
- [Admission Test](#admission-test)
- [Common Semantics](#common-semantics)
- [Knowledge Modes](#knowledge-modes)
- [Profile Router](#profile-router)
- [Domain Patterns](#domain-patterns)
- [Evidence And Attribution](#evidence-and-attribution)
- [Evolution And Conflict](#evolution-and-conflict)
- [Retrieval And Maintenance](#retrieval-and-maintenance)
- [Exclusions](#exclusions)

## Purpose

Create a shared, navigable workspace that lets a future person or agent recover:

- What the project is trying to achieve.
- Which constraints and decisions shape the work.
- What has been learned, observed, selected, or rejected.
- Which artifacts exist and where they live.
- Whose feedback matters and in what context.
- What remains uncertain or intentionally open.
- Which concepts should guide the next action.

Treat the bundle as durable context, not as a live task database or a dumping ground.

## Layering

Use three layers:

1. **OKF Core** for portable files, frontmatter, identity, indexes, and links.
2. **Knowledge Workspace** for shared lifecycle, time, provenance, and maintenance semantics.
3. **Domain Pattern** for work, research, creative, engineering, or a deliberate mix.

Keep common semantics stable. Add domain fields only when they improve retrieval, governance, or repeated work.

## Admission Test

Give an object its own concept page when most of these are true:

- It will matter beyond the current session.
- Another concept should link to it.
- It has an independent lifecycle, owner, source, or rationale.
- Losing it would cause repeated discovery, inconsistent work, or a bad decision.
- It can be summarized clearly enough to guide future action.

Keep information inside another page when it is meaningful only in that page's context. Keep temporary checklists, raw transcripts, scratch exploration, and disposable drafts outside the durable bundle.

Avoid both extremes: one giant project page and hundreds of fragments with no independent value.

## Common Semantics

Use these axes independently:

| Axis | Field | Typical values | Meaning |
|---|---|---|---|
| Object kind | `type` | `Goal`, `Claim`, `Creative Concept`, `Decision` | What the object is |
| Lifecycle | `status` | `active`, `deprecated`, `superseded`, `archived` | Whether it should guide current work |
| Work maturity | `stage` | `idea`, `draft`, `review`, `selected`, `delivered` | Where it is in a domain workflow |
| Epistemic state | `verification` | `confirmed`, `assumed`, `unknown` | How well a truth-apt claim is supported |
| Content time | `timestamp` | ISO 8601 datetime | Last meaningful content change |
| Evidence time | `last_verified` | ISO 8601 datetime | Last evidence check |
| Real-world validity | `valid_from`, `valid_until` | ISO date/datetime or domain version | When a claim or policy applies |

Require `type`, `title`, `description`, and timezone-aware `timestamp` for workspace concept pages. Treat all other fields as conditional.

Do not use `verification` on a goal, preference, theme, or creative direction merely to fill a template. Do not use `stage` as a substitute for lifecycle. A delivered artifact may remain `status: active`; a rejected draft may be `stage: rejected` and `status: archived`.

## Knowledge Modes

Classify content by how it should be interpreted, primarily through `type` and body wording:

- **Descriptive**: facts, observations, claims, measurements, source summaries. Require evidence proportional to impact.
- **Normative**: decisions, policies, constraints, acceptance criteria. Record authority and rationale.
- **Intentional**: goals, briefs, desired outcomes, positioning. Record owner and success conditions, not verification.
- **Interpretive**: synthesis, critique, analysis, themes. Link inputs and distinguish interpretation from source claims.
- **Preferential**: taste, style direction, stakeholder preference. Attribute whose preference it is and its scope.
- **Exploratory**: hypotheses, creative concepts, alternatives, experiments. Preserve uncertainty and evaluation criteria.
- **Artifact-bound**: deliverables, datasets, drafts, designs, media, reports. Use `resource` to point to the canonical artifact.

Do not rewrite one mode as another. A stakeholder preference is not a user fact; a creative concept is not an assumption awaiting factual confirmation; a research hypothesis is not a decision.

## Profile Router

Choose the narrowest useful pattern:

| Project shape | Primary pattern | Read next |
|---|---|---|
| Software, systems, data, high-assurance operations | Project Fact Base | `references/project-fact-base.md` and `references/page-templates.md` |
| Business execution, coordination, service delivery | Work | Work section below and `references/workspace-templates.md` |
| Investigation, literature review, analysis, discovery | Research | Research section below and `references/workspace-templates.md` |
| Writing, design, brand, campaign, video, editorial | Creative | Creative section below and `references/workspace-templates.md` |
| Cross-functional product or mixed project | Hybrid | Combine only the relevant object types from each pattern |

Do not create separate pages for the same object merely because multiple patterns use it. Give it one primary `type` and connect its other roles through prose and links.

## Domain Patterns

### Shared Foundation

Useful across domains:

- `Goal`: desired outcome and success conditions.
- `Constraint`: boundary the work must respect.
- `Decision`: chosen direction and rationale.
- `Artifact`: canonical output and where it lives.
- `Reference`: reusable source or inspiration with attribution.
- `Feedback`: attributed response in a known context.
- `Workflow`: repeatable flow, roles, inputs, and outputs.

### Work

Add only as needed:

- `Stakeholder`: role, authority, interests, and relevant relationships.
- `Requirement`: a traceable condition an output must satisfy, including its source and acceptance test.
- `Deliverable`: expected output, owner, acceptance criteria, and dependencies.
- `Milestone`: meaningful checkpoint, not every task.
- `Risk`: uncertain event, potential impact, signals, mitigation, and owner; do not present it as a predicted fact.
- `Opportunity`: plausible value worth evaluating, with supporting observations and next test.
- `Metric`: stable definition and interpretation of a measure; keep rapidly changing values in the source system.
- `Meeting Outcome`: durable decisions, commitments, and unresolved issues, not a transcript.
- `Playbook`: repeatable method for a recurring situation.

Keep day-to-day task state in the task system. Store only durable commitments, outcomes, and operating knowledge in OKF.

### Research

Add only as needed:

- `Research Question`: scoped question and why it matters.
- `Claim`: proposition linked to evidence and counterevidence.
- `Source`: provenance, authority, scope, and limitations.
- `Evidence`: observation, measurement, quotation, dataset, or result.
- `Method`: reproducible approach and validity limits.
- `Experiment`: hypothesis, setup, result, and interpretation.
- `Synthesis`: interpretation across multiple sources, clearly distinguished from them.

Preserve negative and contradictory evidence. Do not promote synthesis into fact without showing its basis.

### Creative

Add only as needed:

- `Creative Brief`: objective, audience, message, constraints, and success criteria.
- `Audience`: relevant needs, context, and evidence; avoid invented personas presented as facts.
- `Theme`: recurring conceptual direction and intended effect.
- `Inspiration`: external reference, the specific quality being learned from, and usage boundaries.
- `Creative Concept`: an explorable direction with rationale and evaluation criteria.
- `Style Direction`: visual, verbal, sonic, spatial, or interaction choices and exclusions.
- `Draft`: a meaningful version linked through `resource`, not every autosave.
- `Feedback`: attributed response separated from the decision made from it.
- `Selection`: chosen concept or variant, rationale, rejected alternatives, and revisit conditions.

Allow multiple alternatives to coexist during exploration. Do not mark unselected concepts false; change their stage or archive them with rationale.

### Engineering

Retain the existing high-rigor objects and rules from the Project Fact Base profile: facts, architecture, modules, APIs, datasets, metrics, decisions, assumptions, playbooks, runbooks, and evidence-backed references.

## Evidence And Attribution

Match evidence rules to the knowledge mode:

- For factual claims, cite authoritative and reproducible evidence.
- For observations, record observer, date, conditions, and scope.
- For feedback, record speaker or audience segment, artifact/version reviewed, and context.
- For preferences, state whose preference it is; do not generalize it into universal truth.
- For interpretations, link inputs and state the reasoning boundary.
- For creative inspiration, record the source and the specific transferable quality. Do not copy large source material into the bundle.
- For decisions and selections, record who or what had authority to choose.

Keep provenance close to consequential content. A page-level source list is not enough when different claims have different support.

## Evolution And Conflict

Handle disagreement according to mode:

- Conflicting facts: retain both claims and evidence until resolved.
- Competing interpretations: show their different premises or lenses.
- Conflicting preferences: attribute each preference and record the governing selection or decision.
- Creative alternatives: compare against the brief and criteria; do not force a truth ranking.
- Superseded policy or guidance: retain history, mark lifecycle, and link the successor.

Use separate pages for materially different versions only when each needs independent citation, comparison, or lifecycle. Otherwise update the current page and preserve rationale in the decision or selection record.

## Retrieval And Maintenance

At the start of work:

1. Read the root index and the governing Goal, Brief, or Research Question.
2. Read active Constraints and Decisions.
3. Follow only the relevant artifact, source, concept, and feedback links.
4. Check lifecycle and stage before using a page as current guidance.

After meaningful work:

1. Update durable outcomes, not the entire activity stream.
2. Link new artifacts, findings, feedback, and selections to what they affect.
3. Preserve rejected or superseded directions when their rationale prevents repeated work.
4. Refresh concise indexes and validate internal links.
5. Keep derived indexes, graph views, and search stores reproducible from concept files.

## Exclusions

Do not store:

- Credentials, secrets, or restricted personal information.
- Raw meeting transcripts when only outcomes matter.
- Entire copyrighted references or inspiration assets without a clear right and need.
- Every task, chat message, autosave, or minor draft iteration.
- Unattributed feedback or preferences presented as project truth.
- Generated embeddings, caches, or graph databases as the authoritative source.
- Decorative taxonomy that does not improve navigation or action.
