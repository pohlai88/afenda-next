# ADR 0008: Shared UI Approval Ledger Doctrine

- **Date:** 2026-05-04
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** shared-ui-approval-ledger
- **Artifact:** ADR
- **Boundary:** doc

## Context

The workbench already acts as the visible proof surface for shared UI decisions, but the proof facts have been hand-authored inside route fixture data. That makes approval ownership harder to trace, and it leaves CI without a small inventory contract for the current `App*` boundary.

Afenda needs a ledger that is simple enough to stay legible, explicit enough to enforce ownership, and narrow enough to avoid inventing a runtime registry product inside an ERP codebase.

## Decision

Adopt a small shared UI approval ledger with five fixed parts:

- A flat TypeScript schema in `src/components/ui/components.schema.ts`.
- One local manifest file per shared `App*` export under `src/components/ui/manifests`.
- A thin `src/components/ui/components.json` inventory for CI only.
- A direct-import manifest set in `src/components/ui/manifests.approved.ts`.
- A manifest-driven Contracts proof builder for `/erp-workbench`.

The manifests are the single source of approval facts.

`components.json` exists only for inventory and structural checks. Runtime and workbench code must not read it.

The workbench Contracts mode is the sole approval proof surface in v1. It derives serializable proof items from direct TypeScript imports, not from JSON lookup, runtime path resolution, or a second registry engine.

## Consequences

- Every current shared `App*` export must stay ledgered even if its status is `draft` or `deprecated`.
- CI can now enforce manifest coverage, inventory coverage, and proof wiring for approved controls.
- Contracts mode can show approval status, category, variants, React Aria primitives, constraints, usage guidance, accessibility notes, and demo state without maintaining a hand-authored duplicate registry.
- Runtime code stays simple: manifest imports in, serializable proof data out.
- `components.json` drift becomes a check failure instead of an invisible runtime hazard.

## Alternatives Considered

- Read `components.json` at runtime and build the proof surface from path lookups.
  - Rejected: this adds unnecessary runtime indirection and turns CI inventory into product infrastructure.

- Keep the workbench contract entries hand-authored in route fixture data.
  - Rejected: approval facts would remain duplicated and easier to drift.

- Build a richer registry engine with authoring UI, marketplace semantics, or public APIs.
  - Rejected: this repo needs enforceable ownership, not a component platform product.
