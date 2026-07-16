# Skill Selection Guidelines

This repository prioritizes skills that are useful to public Codex App users and can be installed with low friction.

## Prefer

- Skills that work in Codex App or a generic agent environment.
- Skills with clear user-facing value and simple first-run setup.
- Skills that rely on common local tools, small scripts, or optional API keys.
- Skills whose instructions can be adapted from upstream wording without changing their core workflow.
- Skills with concrete public metadata, including Chinese description and explicit prerequisites.

## Remove

- Skills that only work inside the Hermes Agent ecosystem.
- Skills that require a specific agent CLI/runtime, unless that tool is the explicit subject of the skill and still makes sense for Codex users.
- Heavy local AI/ML/GPU workflows, including model training, LLM serving, CUDA stacks, multi-GB checkpoints, or complex Torch environments.
- Skills that require complex enterprise accounts, paid service setup, OAuth apps, webhooks, or admin permissions before a normal user can benefit.
- Security, red-team, OSINT, pentest, jailbreak, privacy-invasive, or gray-area automation skills unless their safe public value is very clear.
- Very niche operational skills with high maintenance cost and low broad user value.
- Skills that hard-code private paths, raw credentials, real `.env` files, or internal deployment details.

## Needs Review

- Skills with API keys or paid services when the user value is high but setup may be confusing.
- Skills with moderate local dependencies that can still run on a typical user machine.
- Skills imported from another agent ecosystem where only wording is agent-specific.
- Skills with bundled scripts that touch external accounts, local browsers, desktop apps, or cloud resources.
- Skills that mention Hermes in body text but are not structurally tied to Hermes.

## Hermes Wording

Keep provenance fields such as `sourceUrl`, `homepage`, and factual attribution intact.

Rewrite user-facing and agent-facing execution wording when it implies the skill must run in Hermes but the workflow is actually generic. Prefer "current agent", "Codex", or "available tools" depending on context.

Do not rewrite a Hermes-specific command or config path into a fake Codex equivalent. If the workflow truly requires Hermes CLI, Hermes config, Hermes MCP wiring, or Hermes-only tools, remove the skill.

## Heavy Dependency Signals

Flag the skill for user review when prerequisites or instructions mention:

- CUDA, GPU, VRAM, multi-GPU, model checkpoints, model serving, or LLM inference servers.
- Torch, Transformers, vLLM, FSDP, Axolotl, TRL, PEFT, Unsloth, TensorRT, or similar ML stacks.
- Local databases, vector stores, browser automation stacks, Docker services, or long-running daemons.
- OAuth apps, Microsoft Graph, Stripe, Google Workspace, Shopify admin, or other account-level integrations.

## Decision Output

During review, classify each skill as:

- `keep`: safe enough and useful as-is or after light wording edits.
- `remove`: Hermes-only, too heavy, too risky, too niche, or too complex for the public catalog.
- `needs-user-decision`: potentially useful but has heavy dependencies, paid/API setup, or unclear public fit.

