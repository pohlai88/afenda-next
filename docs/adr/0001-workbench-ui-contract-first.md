# ADR 0001: Workbench as UI Contract Boundary First

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** workbench
- **Artifact:** ADR
- **Boundary:** doc

## Context

Afenda is ERP-first, but this repository section is currently a platform slice intended to stabilize shared UX contracts before domain modules are implemented in full. The workbench currently includes controls, patterns, and a procurement approval **UI scene**, but procurement business services, workflows, and database policy routes are not yet implemented as the next committed domain slice.

## Decision

This slice will keep the procurement approval scene as a **contractual UI preview** inside the workbench and not commit backend procurement workflow logic as product domain behavior.

- Maintain and evolve shared UI controls (`components/ui`) as the canonical foundation.
- Keep workbench scenes demonstrative and operator-centric for interaction shape discovery.
- Treat scenes as design and interaction contracts for future domain development.

## Rationale

- Reduces coupling while the DAL/domain model is still in flux.
- Preserves velocity for infra and component correctness work.
- Aligns with `pnpm check:workbench-contract` by keeping registry, controls, and scenes consistent and tested.

## Consequences

- Procurement approval slice should be implemented as a separate domain ADR when backend APIs, tables, and policy logic are introduced.
- Home and route code should keep this scene explicit as UI proof, not as authorization or workflow truth.
- Future domain additions should reuse the workbench contracts where possible to keep interaction consistency.

## Alternatives Considered

- Implement procurement domain workflows now with backend DB and API expansions.
  - Rejected: scope drift relative to current stabilization target and boundary audit focus.

- Remove all procurement scene preview UI until backend is in place.
  - Rejected: this would lose immediate operator-level interaction contract and weaken transition planning.
