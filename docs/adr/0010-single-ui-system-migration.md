# ADR 0010: Canonical Shared UI Primitive Contract

- **Date:** 2026-05-04
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** canonical-shared-ui-contract
- **Artifact:** ADR
- **Boundary:** doc

## Context

Afenda needs one canonical shared UI boundary that frontend code can consume safely and predictably.

That boundary lives under `src/components`.

Today, the governed `App*` primitives are authored under `src/components/ui-governance/app-*`, but the important rule is broader than the folder name:

- `src/components` is the canonical primitive and design boundary
- governed `App*` primitives are the approved shared controls inside that boundary
- manifests must describe the same explicit contract that the TSX primitive actually exposes

The older migration story was still too scaffold-oriented and still carried workbench-era naming. It also tolerated primitives that remained broader and less explicit than their manifests.

That is no longer acceptable for ERP UI.

## Decision

Adopt the following doctrine for governed shared UI primitives.

### 1. Canonical shared UI boundary

- `src/components` is the canonical shared UI boundary for frontend consumption.
- The current governed primitive system lives under `src/components/ui-governance/app-*`.
- Do not build a second shared primitive system elsewhere in the repo.

### 2. Three-file explicit contract per governed primitive

Each governed primitive owns exactly these files:

- `app-<name>.control.primitive.client.tsx`
- `app-<name>.contract.primitive.shared.ts`
- `app-<name>.ui.manifest.shared.ts`

The responsibility split is fixed:

- the `.client.tsx` file owns runtime interaction behavior
- the `.contract.primitive.shared.ts` file owns explicit shared contract facts reused by runtime and governance
- the `.ui.manifest.shared.ts` file declares approval, usage, composition, and token governance from the same shared contract

### 3. TSX primitives must be explicit

Governed TSX primitives must expose an explicit prop surface.

- Do not export a broad pass-through API by inheriting an entire third-party prop bag when the primitive only intends to support a smaller contract.
- Name the supported props explicitly in the primitive type.
- Forward only the supported runtime props intentionally.
- Keep the wrapper thin, but do not keep it vague.

### 4. TS manifests must be explicit

Governed manifests must explicitly declare:

- canonical source path
- style sources and CVA variants
- required and optional prop names
- child composition requirements
- React Aria primitive dependencies
- semantic token usage that can be checked against the CSS snapshot
- usage guidance and constraints

Approved manifests are not allowed to rely on implication for these facts.

### 5. Governance remains TypeScript-first

- Keep manifest aggregation in `governance.ui.registry.shared.ts`.
- Keep manifest law in `governance.ui.manifest.shared.ts`.
- Keep validation in `governance.ui.guard.shared.ts`.
- Do not introduce generated JSON inventory or a second registry engine.

### 6. Automation and verification

The canonical verification command is:

- `pnpm check:ui-governance`

That check must validate:

- canonical folder shape
- explicit contract file presence
- registry wiring
- manifest/client alignment at the file-contract level
- retirement of the old flat boundary import

`pnpm check:workbench-contract` remains only as a deprecated compatibility alias while references are cleaned up.

## Consequences

- Shared UI primitives become safer to consume from frontend code because their surface is explicit.
- Manifest data becomes materially useful for validation instead of descriptive-only metadata.
- CSS snapshot evidence becomes actionable through explicit token declarations.
- Drift between TSX runtime and governance metadata becomes easier to detect.
- Workbench-era naming loses architectural authority.

## Non-Goals

- Do not move shared ERP reads or mutations into client primitives.
- Do not replace App Router server-first route ownership.
- Do not turn the governed shared UI boundary into a component marketplace or plugin framework.

## Alternatives Considered

- Keep manifests as metadata-only proof declarations.
  - Rejected: too weak for a canonical frontend consumption boundary.

- Keep broad third-party prop inheritance in shared primitives.
  - Rejected: this hides the real supported contract and weakens traceability.

- Reintroduce workbench-era proof surfaces as the source of truth.
  - Rejected: the canonical source of truth is the governed primitive contract under `src/components`.
