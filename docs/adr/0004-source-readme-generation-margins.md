# ADR 0004: Source README Generation Margins

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** source-readme-generation
- **Artifact:** ADR
- **Boundary:** doc

## Context

ADR 0003 established generated README ownership for documentation margins under `docs/` and `.guideline/`. Source-code folders now also need lightweight navigation indexes, but source README automation should not recursively scan the whole repository or compete with architecture-boundary enforcement.

The current source-code margins with stable directory meaning are `src/components` and `src/components/ui-governance`.

## Decision

Slice D2 declares source-code README generation for explicit source margins only.

Slice D2 declares these generated README outputs:

- `src/components/README.md`
- `src/components/ui-governance/README.md`

The generator must use a fixed matrix for D2. It must not recursively create README files under arbitrary source directories.

Manual source documentation remains outside generated README files. Source behavior should continue to be governed by architecture-boundary checks, file annotations, and named source files.

Root `README.md`, package README files, and unconfigured module README files remain deferred.

## Consequences

- README files in the declared D2 source margin are owned by `pnpm docs:generate`.
- Manual edits to generated source README files should be replaced by changes to source code, source annotations, or the generator matrix.
- D2 source indexes are non-recursive: source root indexes list immediate child source groups, and source module indexes list immediate child source groups plus immediate source files.
- Future source README margins require a new ADR or explicit follow-up slice.
- The docs generator must fail if the matrix tries to write root `README.md`.

## Alternatives Considered

- Recursively generate README files for every source folder.
  - Rejected: too broad and likely to produce low-signal churn.

- Drive source README generation from annotation envelopes.
  - Rejected for D2: useful later, but too coupled to annotation enforcement maturity.

- Keep source-code README files manual.
  - Rejected: source navigation indexes would drift from folder shape and ownership rules.

