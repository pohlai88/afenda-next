# ADR 0006: ADR and ATC Structural Validation

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** docs-contract-validation
- **Artifact:** ADR
- **Boundary:** doc

## Context

ADR 0003, ADR 0004, and ADR 0005 made README ownership explicit and generated. The remaining documentation risk is structural drift in source decision documents: ADR records and the ATC can still lose required metadata or sections without failing repo checks.

The repo needs enough validation to keep documentation machine-checkable, but not a prose linter or documentation framework.

## Decision

Slice D4 adds a documentation contract check for ADR and ATC structure.

The check validates ADR records under `docs/adr` for:

- `NNNN-kebab-case-title.md` naming.
- Matching `# ADR NNNN: <title>` heading.
- Required metadata fields: `Date`, `Status`, `Owner`, `Subject`, `Artifact`, and `Boundary`.
- Accepted status vocabulary: `Accepted`, `Proposed`, `Deprecated`, and `Superseded`.
- `Artifact: ADR` and `Boundary: doc`.
- Required sections: `Context`, `Decision`, `Consequences`, and `Alternatives Considered`.
- Contiguous ADR numbering from `0001`.

The check validates `docs/atc.md` for:

- The Afenda ATC level-one heading.
- `ATC Snapshot` date.
- `Scope` line.
- Required A-E section headings.

The check is intentionally structural only. It does not validate prose quality, domain correctness, or semantic agreement between ADRs.

## Consequences

- New ADRs must follow the accepted ADR structure before merge.
- ATC edits must preserve the snapshot/scope header and required A-E sections.
- `pnpm check:docs` becomes the focused documentation-contract gate.
- `pnpm check` includes the documentation-contract gate.

## Alternatives Considered

- Validate ADR/ATC structure inside the docs generator.
  - Rejected: generation and validation are separate responsibilities.

- Add a full markdown linter or schema framework.
  - Rejected: too heavy for the current repo need.

- Leave ADR/ATC validation manual.
  - Rejected: generated README ownership is now machine-checkable, so source decision documents should have a lightweight gate too.
