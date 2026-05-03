# ADR 0005: Root README Generation Template

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** root-readme-generation
- **Artifact:** ADR
- **Boundary:** doc

## Context

ADR 0003 established generated README ownership for documentation margins. ADR 0004 extended the same approach to explicit source-code navigation margins.

The root `README.md` has a different role from index README files: it is the repository entry point for humans and should preserve project identity, setup orientation, and root ownership rules. Generating it directly from folder scans would make it too sterile and too easy to drift from the intended repo narrative.

## Decision

Slice D3 makes root `README.md` a generated artifact backed by a manual source template.

The manual source of truth for root README prose is:

- `docs/source/root-readme.md`

The generated output is:

- `README.md`

The docs generator must preserve the source template content, add the generated README ownership marker, and add a generated navigation section for the current docs/source indexes.

D3 does not authorize package README generation, arbitrary module README generation, or recursive README generation.

## Consequences

- Manual edits to root `README.md` should be replaced by edits to `docs/source/root-readme.md` or the generator.
- Root README content remains intentionally human-authored while still becoming idempotent automation output.
- Future root README structure changes should update the source template first.
- Package README files and unconfigured module README files remain deferred.

## Alternatives Considered

- Keep root `README.md` manual.
  - Rejected for D3: root documentation ownership would remain inconsistent with the generated README contract.

- Generate root `README.md` entirely from scans.
  - Rejected: root README is a human entry point, not just an index.

- Add a separate root README generator.
  - Rejected: one docs generator should own generated README surfaces.
