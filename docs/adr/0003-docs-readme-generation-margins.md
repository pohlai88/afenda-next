# ADR 0003: Documentation README Generation Margins

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** docs-readme-generation
- **Artifact:** ADR
- **Boundary:** doc

## Context

The repository already generates documentation indexes for `docs/README.md` and `docs/adr/README.md`. As documentation grows, manually maintained README index files can drift from the source documents they summarize.

The repository also has guideline documentation under `.guideline/`. These files are source guidance, but their navigation indexes should stay consistent with the same documentation automation used for architecture docs.

## Decision

Generated README files are allowed only inside declared automation margins.

Slice D1 declares these generated README outputs:

- `docs/README.md`
- `docs/adr/README.md`
- `.guideline/README.md`
- `.guideline/nextjs/README.md`
- `.guideline/react-aria/README.md`

Manual documentation remains in named source files such as `docs/architecture.md`, `docs/atc.md`, ADR records, and guideline markdown files.

Root `README.md`, source-code README files, package README files, and module README files are deferred.

## Consequences

- README files in the declared D1 margin are owned by `pnpm docs:generate`.
- Manual edits to generated README files should be replaced by changes to source docs or the generator matrix.
- Future generated README margins require a new ADR or explicit follow-up slice.
- The docs generator must fail if the D1 matrix tries to write root `README.md`.

## Alternatives Considered

- Generate all README files across the repository immediately.
  - Rejected: too broad for the first ownership slice and likely to compete with source naming and architecture-boundary checks.

- Keep only `docs/README.md` and `docs/adr/README.md` generated.
  - Rejected: guideline indexes have the same drift risk and are already documentation-zone artifacts.

- Generate root `README.md` in D1.
  - Rejected: root README remains a human entry point until a source-template approach is explicitly chosen.
