# Codex++ plugin snapshot import

This directory records the provenance and conversion decisions for skills imported from
[BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus).

- Snapshot commit: `285f40e4d19ba90c6571f56afc1caefe19798eac`
- Snapshot file: `assets/plugin-marketplaces/openai-curated-remote.zip`
- Imported: 109 standalone skills
- Excluded: 1 skill
- Import date: 2026-07-18

The source package is plugin-oriented, while this repository distributes one skill per folder.
Duplicate skill names were prefixed with `codexpp-<plugin>-`; plugin-level resources needed by
an individual skill were copied into that skill's `plugin-support/` directory so packaged ZIPs
remain self-contained. Repository-native `skill.json` files were added without replacing the
upstream workflow instructions.

## Imported plugins

| Plugin | Imported skills | License used |
| --- | ---: | --- |
| Catalyst by Zoho | 1 | MIT |
| Chronograph GP | 1 | MIT |
| Chronograph LP | 3 | MIT |
| Creative Production | 9 | MIT |
| Data Analytics | 17 | MIT |
| Investment Banking | 23 | AGPL-3.0 |
| Metabase | 1 | MIT |
| Product Design | 11 | MIT |
| Public Equity Investing | 22 | MIT |
| Sales | 21 | MIT |

## Excluded source content

- `public-equity-investing/earnings-preview`: 目录内 LICENSE.txt 标明 Proprietary - Internal Use Only，禁止未经许可再分发.

The excluded skill is intentionally not mirrored in this public repository.
