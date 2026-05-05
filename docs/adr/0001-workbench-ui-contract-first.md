# ADR 0001: Workbench as UI Contract Boundary First (Deprecated)

- **Date:** 2026-05-03
- **Status:** Deprecated
- **Deprecated:** 2026-05-04
- **Owner:** afenda-next architecture
- **Subject:** workbench
- **Artifact:** ADR
- **Boundary:** doc

## Context

This ADR is **fully deprecated**.

The “ERP Runtime Workbench” as the primary UI contract boundary, procurement preview scene, and `pnpm check:ui-governance`-driven proof surface described below is **retired**. Do not use this document for new decisions.

**Use instead**

- Shared UI shape and manifests: [0008-shared-ui-manifest-doctrine.md](./0008-shared-ui-manifest-doctrine.md), [0010-single-ui-system-migration.md](./0010-single-ui-system-migration.md), `src/components/ui-governance/README.md`.
- Operator-facing UI reference: **Interface Studio** (`/interface-studio`) and route-local previews, not a separate workbench product slice.

## Decision

The decision is to deprecate this ADR completely and remove its authority over current architecture decisions.

The historical record is preserved below only as archive context for commits predating this deprecation.

### Historical decision

This slice will keep the procurement approval scene as a **contractual UI preview** inside the workbench and not commit backend procurement workflow logic as product domain behavior.

- Maintain and evolve shared UI controls under `src/components/ui-governance/app-*` as the canonical foundation.
- Keep workbench scenes demonstrative and operator-centric for interaction shape discovery.
- Treat scenes as design and interaction contracts for future domain development.

## Consequences

- Current contributors should ignore this ADR for new decisions.
- Historical workbench reasoning remains archived for traceability only.
- Shared UI doctrine now lives in the current `src/components`-oriented ADR set.

### Historical consequences

- Procurement approval slice should be implemented as a separate domain ADR when backend APIs, tables, and policy logic are introduced.
- Home and route code should keep this scene explicit as UI proof, not as authorization or workflow truth.
- Future domain additions should reuse the workbench contracts where possible to keep interaction consistency.

## Alternatives Considered

- Keep this ADR active.
  - Rejected: it describes a retired workbench-first contract boundary.

- Delete the ADR entirely.
  - Rejected: historical architecture traceability still matters in ERP code.

### Historical alternatives considered

- Implement procurement domain workflows now with backend DB and API expansions.
  - Rejected: scope drift relative to current stabilization target and boundary audit focus.

- Remove all procurement scene preview UI until backend is in place.
  - Rejected: this would lose immediate operator-level interaction contract and weaken transition planning.
