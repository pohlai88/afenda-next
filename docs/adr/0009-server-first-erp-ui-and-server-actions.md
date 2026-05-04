# ADR 0009: Server-First ERP UI with Client React Aria Leaves and Server Actions

- **Date:** 2026-05-04
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** server-first-erp-ui
- **Artifact:** ADR
- **Boundary:** doc

## Context

Afenda is building ERP product UI on the Next.js App Router with React Aria-based shared controls. The canonical shared UI boundary is `src/components`, with governed `App*` primitives currently authored under `src/components/ui-governance`. The execution model must be explicit so contributors do not keep re-deciding where server code, client code, and mutations belong.

The desired outcome is not a client-first UI kit and not a server-only component kit. The desired outcome is:

- server-first route ownership for ERP reads and composition
- narrow client boundaries for interactive React Aria controls
- explicit `use server` boundaries for ERP mutations

This aligns with the official Next.js App Router model and the React Aria component model:

- Next.js pages and layouts are Server Components by default.
- `use server` is for Server Functions / Server Actions.
- React Aria interactive components such as `Button` and `Form` are client-side interaction boundaries.

## Decision

Adopt the following execution model as standing architecture doctrine for ERP UI work:

### 1. Route, layout, and read ownership stays server-first

- `page.tsx` and `layout.tsx` remain Server Components by default.
- Auth checks, authorization gates, database reads, tRPC reads, and serializable ERP view-model assembly happen on the server.
- Server routes pass only the data the UI needs into client leaves.

### 2. Shared React Aria control primitives stay client

- Shared `App*` primitives under `src/components/ui-governance/app-*/` use the enforced client leaf name `app-*.control.primitive.client.tsx` and co-located explicit contract file `app-*.contract.primitive.shared.ts`.
- These files own browser interaction concerns such as focus, keyboard handling, overlays, local selection state, and press behavior.
- The shared control boundary must not import server-only runtime code, secrets, database clients, or privileged auth logic.

### 3. `use server` is for ERP mutations, not for UI primitives

- ERP writes must be implemented as Server Actions or Server Functions using `use server` when they fit App Router form and action flows.
- Typical examples include:
  - approve purchase request
  - reject purchase request
  - create supplier
  - update invoice state
  - post inventory adjustment
- `AppButton`, `AppDialog`, `AppTabs`, `AppSelectField`, and similar shared controls must not be rewritten as `use server` files.

### 4. Form submission prefers App Router action flows

- Route-owned ERP forms should prefer `<form action={serverAction}>` or equivalent React Aria form composition when the interaction is an in-app mutation.
- Server Actions must validate input, authenticate, authorize, perform the mutation, and revalidate affected UI.
- Return values must stay constrained to the minimum serializable data the UI needs.

### 5. Client islands stay narrow

- Mark only the smallest interactive leaf or route-local island with `use client`.
- Do not promote route shells, dense ERP tables, or whole record pages to the client when only a child control or local interaction needs browser behavior.
- Shared metadata modules such as schemas, manifests, and proof builders stay runtime-neutral shared files.

## Consequences

- The shared UI system remains a client-side interaction boundary without turning the application into a client-first architecture.
- ERP routes keep server-first data ownership and reduce unnecessary client JavaScript.
- Mutations become explicit, auditable server boundaries rather than ad hoc client-side behavior.
- Contributors have one stable rule:
  - reads and route composition on the server
  - interactive primitives on the client
  - business mutations in `use server`

## Non-Goals

- Do not convert the shared `App*` control primitives into server files.
- Do not move database or auth logic into client modules.
- Do not introduce a generic client mutation orchestration layer when a Server Action fits the workflow cleanly.
- Do not treat `use server` as the server-side equivalent of every `use client` file.

## Implementation Guidance

- Shared controls:
  - `src/components/ui-governance/app-*/app-*.control.primitive.client.tsx`
  - `src/components/ui-governance/app-*/app-*.contract.primitive.shared.ts`
- Shared metadata:
  - `src/components/ui-governance/governance.ui.manifest.shared.ts`
  - `src/components/ui-governance/governance.ui.registry.shared.ts`
- ERP mutation boundaries:
  - route-local `_actions/*` or approved server modules using `use server`
- ERP routes:
  - server `page.tsx` and `layout.tsx` files that fetch data and pass serializable props to client leaves

## Alternatives Considered

- Make the shared UI kit server-only.
  - Rejected: React Aria interactive behavior requires client execution.

- Make route shells client-first and perform reads/mutations from the browser by default.
  - Rejected: this weakens App Router server-first behavior and pushes ERP correctness-sensitive logic away from the server boundary.

- Continue leaving the server/client/mutation split implicit.
  - Rejected: contributors would keep re-litigating the same architectural intent.
