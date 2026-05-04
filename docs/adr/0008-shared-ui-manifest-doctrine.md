# ADR 0008: Shared UI Manifest Doctrine

- **Date:** 2026-05-04
- **Status:** Deprecated
- **Owner:** afenda-next architecture
- **Subject:** shared-ui-manifest
- **Artifact:** ADR
- **Boundary:** doc

## Context

This ADR described manifests too narrowly as approval and proof metadata around the shared UI boundary.

That doctrine is no longer sufficient.

Afenda now treats the canonical shared UI boundary under `src/components` as an explicit frontend consumption surface. For governed `App*` primitives, the runtime control, the shared per-component contract, and the manifest must move together as one explicit contract.

Use [ADR 0010](./0010-single-ui-system-migration.md) for current doctrine.

## Decision

Deprecate this ADR and replace its metadata-only framing with the explicit shared primitive contract doctrine in [ADR 0010](./0010-single-ui-system-migration.md).

## Consequences

- It over-emphasized proof assembly and under-specified the runtime primitive contract.
- It allowed manifests to stay explicit while TSX primitives stayed too implicit.
- It did not require a shared per-component contract file that both the manifest and the client primitive consume.
- It left CSS snapshot governance underused by not requiring explicit token declarations in manifests.

## Alternatives Considered

- Keep this ADR active and patch it incrementally.
  - Rejected: the framing itself is wrong, not just a few details.

- Remove the ADR entirely.
  - Rejected: the historical transition from proof-only manifests remains useful context.

## Historical Value Retained

The following ideas remain valid and are carried forward by newer doctrine:

- manifests stay TypeScript, not generated JSON
- registry aggregation stays explicit
- approval facts stay co-located with the governed primitive

The deprecated part is the **metadata-only framing**, not the existence of manifests themselves.
