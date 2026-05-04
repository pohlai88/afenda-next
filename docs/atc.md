# ATC — Architecture & Technical Context (Afenda Next)

> ATC Snapshot: `2026-05-04`  
> Scope: App Router baseline + shared UI manifests + runtime boundaries

This ATC captures the non-negotiable context that keeps the repo in a stable state while still allowing fast ERP slicing.

## A) System Context

- **Product tier:** ERP-first operational workspace platform (not a generic CRM/demo).
- **Runtime:** Next.js 16 App Router + React 19.
- **Data path:** Prisma-like direct Drizzle usage through server-only runtime, not business logic in client modules.
- **Auth:** Better Auth with explicit `BETTER_AUTH_URL` policy.
- **Delivery gates:** `pnpm check`, `pnpm typecheck`, `pnpm lint`, `pnpm test`.

## B) Hard Invariants

1. `src/app` owns route boundaries.
2. Feature and domain UI are kept out of `src/client-runtime` unless global bootstrap scope justifies placement.
3. Server-only runtime modules do not cross into client module graphs.
4. Workbench files (`*.workbench.ts*`) are visual contract surfaces and must not import privileged runtime.
5. Shared UI primitives must be rendered from `src/components`, with governed `App*` primitives housed under `src/components/ui-governance`, described in manifests, and covered by shared control tests.
6. The canonical governed shared UI tree is `src/components/ui-governance/app-*/` plus approved root metadata files. Do not introduce nested `use-client` or `use-server` directory taxonomies inside `src/components/ui-governance`.
7. Shared React Aria wrappers remain `.client.tsx` leaves. `use server` is reserved for ERP mutation boundaries, not shared UI primitives.
8. Raw palette tokens are only defined in CSS globals and applied through semantic aliases.
9. Test/runtime imports are one-way:
   - `@/test-runtime/**` is test-only usage.
   - Production source must not import test runtime helpers.
10. Governed shared UI manifests are imported in `src/components/ui-governance/governance.ui.registry.shared.ts` and discovered under `src/components/ui-governance/app-*` by automation (no parallel JSON inventory).

## C) Architecture Acceptance

- **Route boundary check**
  - `pnpm check:architecture` must pass.
  - Route-private folders remain constrained to `_components`, `_actions`, `_queries`.
- **UI governance check**
  - `pnpm check:ui-governance` must pass.
  - The canonical `src/components/ui-governance/app-*/` boundary retains the explicit three-file contract: `.control.primitive.client.tsx`, `.contract.primitive.shared.ts`, and `.ui.manifest.shared.ts`.
  - Every shared `App*` export remains declared in a co-located manifest under `src/components/ui-governance/app-*/`.
- **Execution model**
  - ERP routes and reads stay server-first.
  - Shared `App*` controls stay client leaves.
  - ERP writes use `use server` actions in route-local `_actions/*` or approved server modules.
- **Type/runtime strictness**
  - `pnpm typecheck` clean.
  - tRPC boundary and Better Auth contracts compile without schema drift.
- **Behavioral coverage**
  - Component interaction tests for controls and workbench surfaces run in Vitest.
  - tRPC/Session-dependent home workflow test coverage remains stable.

## D) Current Feature Boundary (Explicit)

- **In scope**
  - Shared control surface
  - Shared UI manifests + Contracts proof surface
  - tRPC health/read path (`hello`, `getLatest`, authorization checks)
  - Better Auth session plumbing
  - Design token and style baseline
- **Out of scope for this slice**
  - Procurement backend domain schema expansion
  - Finance posting/audit ledger implementation
  - Automated workflow approval engine
  - Runtime registry engine
  - Marketplace-style component catalog
  - Ledger authoring UI
  - Variant compiler
  - Public registry API

## E) Release/Verification Checklist

- Before marking a slice complete:
  1. Confirm `pnpm check` passes.
  2. Confirm architecture script invariants align with changed files.
  3. Confirm no new raw tokens are introduced outside `src/styles/globals.css`.
  4. Confirm any changed boundaries preserve `@afenda-*` annotation requirements.
