> See [`image-generator.md`](./image-generator.md) and [`image-searcher.md`](./image-searcher.md) for path-specific behavior.

# Image Acquisition Common Reference

Shared baseline for both acquisition paths. Path-specific behavior lives in the path's own reference.

---

## 1. Trigger Condition

Active when at least one resource list row has `Acquire Via: ai` / `web` / `slice`. Rows with `user` / `formula` / `placeholder` are skipped.

| Mode | Trigger |
|---|---|
| In-pipeline | `generate-ppt` workflow, image rows present |
| Standalone | Direct request against an existing project |

---

## 2. Image Resource List Format

Defined in `design_spec.md §VIII`. Status enum: see [`svg-image-embedding.md`](svg-image-embedding.md).

| Filename | Dimensions | Purpose | Type | Acquire Via | Status | Reference |
|---|---|---|---|---|---|---|
| cover.png | 1280x720 | Cover background | Background | `ai` | Pending | Modern tech abstract, deep blue gradient #0A2540 |
| team.jpg | 800x600 | Team photo | Photography | `web` | Pending | Diverse engineering team in modern office |
| formula_001.png | 736x168 | Block equation on P03 | Latex Formula | `formula` | Rendered | `E = mc^2` |
| spot_team.png | TBD after slicing | Team spot illustration | Illustration | `slice` | Pending | From `spot_sheet.png` cell 1,1 |

**Required per non-skipped row**: `Acquire Via` and `Status`. `Reference` is required for every `web` / `slice` row and every newly authored `ai` row. An existing `ai` row whose `Reference` is omitted or blank may continue only through the declared inference in [`image-generator.md`](./image-generator.md) §8; no other path may infer it.

---

## 3. Path Dispatch

For each row with `Status: Pending`:

| Acquire Via | Load reference | Run | Success status |
|---|---|---|---|
| `ai` | [`image-generator.md`](./image-generator.md) | current agent image tool or installed image Skill | `Generated` |
| `web` | [`image-searcher.md`](./image-searcher.md) | `image_search.py` | `Sourced` |
| `slice` | [`image-generator.md`](./image-generator.md) §4.3 | `slice_images.py` after parent AI sheet is `Generated` | `Generated` |
| `user` | — | — | (already `Existing`) |
| `formula` | — | — | (already `Rendered`) |
| `placeholder` | — | — | (already `Placeholder`) |

> Lazy load: an all-`web` deck never reads `image-generator.md`, and vice versa.

---

## 4. Analysis Phase

Before processing any row:

1. `read_file <project_path>/design_spec.md` — extract color scheme, canvas format, target audience
2. Group resource list rows by `Acquire Via`
3. Confirm `project/images/` exists

---

## 5. Verification Phase

After all rows reach terminal status:

- Every required non-skipped row has a file at `project/images/<filename>`.
- Every required `slice` row has a generated element file.
- No required `Pending` or `Failed` rows remain before Executor starts.
- `image_prompts.json` exists when ≥1 ai row is processed; every successfully generated entry has `status: Generated`.
- `image_sources.json` exists when ≥1 web row processed; every entry has `license_tier ∈ {no-attribution, attribution-required, manual}` (`manual` = a user-supplied `--from-url` replacement)

> When no image-generation capability is available, keep affected AI rows `Pending`, report the missing files, and stop before Executor. Do not silently choose another acquisition mode.

---

## 6. Failure Handling

1. Retry a failed acquisition once using the same confirmed mode.
2. For AI rows, stop and report the missing filenames when the current agent has no usable image capability or the retry fails.
3. For web rows, follow `image-searcher.md`; do not enter web search as a fallback from AI generation.
4. For slice rows, wait for the parent sheet and resume slicing only after it exists.

---

## 7. Credits — Single Source of Truth

License / attribution data lives **only** in `project/images/image_sources.json`.

**Forbidden — credits anywhere else**:

- `notes/*.md` (TTS would speak them in the audio export)
- `total.md` (gets split, then overwritten)
- SVG `<title>` / `<desc>` (stripped by `svg_to_pptx.py`)
- A separate "Image Credits" appendix slide (lost on single-page sharing)

Executor reads the manifest per slide and renders inline credits when needed — see [`executor-web-image.md`](./executor-web-image.md) §1 and [`image-searcher.md`](./image-searcher.md) §7.

---

## 8. Handoff with Strategist

The `Reference` field is **intent**, not a query. Strategist writes free-form intent; the receiving role translates.

| ✅ Intent | ❌ Pre-processed |
|---|---|
| `"Diverse engineering team in modern office, natural light"` | `"team office light"` |
| `"Abstract digital waves, deep navy gradient #0A2540"` | `"use openverse, search 'waves'"` |

---

## 9. Handoff with Executor

Executor consumes the resource list plus:

| Artifact | Path | Purpose |
|---|---|---|
| Image files | `project/images/*.{jpg,png,webp}` | `<image>` references |
| Manifest | `project/images/image_sources.json` | `license_tier` per Sourced image |

Executor does NOT invoke an image-generation tool, `image_search.py`, or `slice_images.py`.

---

## 10. Task Completion Checkpoint

```markdown
## ✅ Image Acquisition Phase Complete
- [x] {N} rows processed (`ai`: {a} / `web`: {b} / `slice`: {s})
- [x] {a} `Generated`, {b} `Sourced`, {s} sliced `Generated`
- [x] image_prompts.json / image_sources.json written
- [ ] **Next**: Auto-proceed to Executor phase
```
