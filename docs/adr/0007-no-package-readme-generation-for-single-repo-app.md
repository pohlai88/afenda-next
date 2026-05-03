# ADR 0007: No Package README Generation for Single-Repo App

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** package-readme-generation
- **Artifact:** ADR
- **Boundary:** doc

## Context

D1 through D4 established generated README ownership for real documentation, source navigation, root README, and ADR/ATC validation boundaries.

The remaining previously deferred idea was package/module README generation. Afenda Next is currently a single application repository, not a package workspace, and there are no explicit `packages/*` roots.

## Decision

Package/module README generation is not applicable for the current repository shape.

Generated README automation remains limited to the declared D1-D3 README margins and D4 documentation validation. `pnpm docs:generate` must not emit package README files, arbitrary module README files, or recursively generated source README files unless the repository later adopts explicit package roots through a separate ADR.

## Consequences

- D5 closes as policy only, with no generator expansion.
- Ordinary source folders do not become package/module documentation boundaries.
- Future package README generation requires explicit package roots and a new ADR.

## Alternatives Considered

- Generate README files for `packages/*`.
  - Rejected: no package workspace exists.

- Generate README files for ordinary source modules.
  - Rejected: this would create false authority and low-signal maintenance churn.

- Leave the deferred package/module question undocumented.
  - Rejected: a short policy ADR prevents future accidental scope expansion.
