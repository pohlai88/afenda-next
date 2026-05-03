# ATC — Architecture & Technical Context (Afenda Next)

> ATC Snapshot: `2026-05-03`  
> Scope: App Router baseline + UI control contract + runtime boundaries

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
5. Shared UI primitives must be rendered from `src/components/ui` and covered by shared control tests.
6. Raw palette tokens are only defined in CSS globals and applied through semantic aliases.
7. Test/runtime imports are one-way:
   - `@/test-runtime/**` is test-only usage.
   - Production source must not import test runtime helpers.
8. The workbench contract includes `Primitives`, `Patterns`, `Scenes`, and `Contract` categories.

## C) Architecture Acceptance

- **Route boundary check**
  - `pnpm check:architecture` must pass.
  - Route-private folders remain constrained to `_components`, `_actions`, `_queries`.
- **Workbench contract check**
  - `pnpm check:workbench-contract` must pass.
  - `app.controls.primitive.client.tsx` retains required exports and React Aria error/description semantics.
- **Type/runtime strictness**
  - `pnpm typecheck` clean.
  - tRPC boundary and Better Auth contracts compile without schema drift.
- **Behavioral coverage**
  - Component interaction tests for controls and workbench surfaces run in Vitest.
  - tRPC/Session-dependent home workflow test coverage remains stable.

## D) Current Feature Boundary (Explicit)

- **In scope**
  - Shared control surface
  - Workbench catalog + contract registry
  - tRPC health/read path (`hello`, `getLatest`, authorization checks)
  - Better Auth session plumbing
  - Design token and style baseline
- **Out of scope for this slice**
  - Procurement backend domain schema expansion
  - Finance posting/audit ledger implementation
  - Automated workflow approval engine

## E) Release/Verification Checklist

- Before marking a slice complete:
  1. Confirm `pnpm check` passes.
  2. Confirm architecture script invariants align with changed files.
  3. Confirm no new raw tokens are introduced outside `src/styles/globals.css`.
  4. Confirm any changed boundaries preserve `@afenda-*` annotation requirements.
