# Afenda Next Architecture

> Snapshot: `2026-05-03`  
> Workspace: `C:\JackProject\afenda-next`  
> Stack: Next.js 16 App Router, React 19, TypeScript, tRPC, Drizzle, PostgreSQL, Better Auth, Tailwind CSS v4

This document describes the current implemented architecture and the operational flow used by the repository today.

## 1) Product/Platform Positioning

Afenda is an ERP-oriented Next.js application with:

- Server-first route composition under `src/app`.
- A shared, production-focused control surface in `src/components/ui`.
- A workbench-driven UI standards layer in `src/features/workbench`.
- Privileged server runtime for auth, API, and database access under `src/server`.
- tRPC for structured route-to-route call boundaries and client hydration.

Current focus is **contracted UI foundation** for operational workflows, not broad ERP domain implementation.

## 2) Topology

```txt
src
├── app                      # App Router ownership (pages, routes, root layout)
│   ├── layout.tsx           # Root layout + app-wide providers
│   ├── page.tsx             # Home route (server-owned session + initial tRPC query)
│   └── erp-workbench/page.tsx # Workbench host route
├── app/api
│   ├── auth/[...all]/route.ts
│   └── trpc/[trpc]/route.ts # tRPC endpoint
├── components               # Shared app primitives
├── features/workbench       # Workbench surfaces + registry + fixtures
├── client-runtime           # Browser startup wiring and app-wide providers
├── server                   # Auth, tRPC, and DB runtime
│   ├── better-auth
│   ├── api
│   └── db
├── trpc                     # Shared tRPC client/server hydration helpers
├── styles                   # Tailwind + semantic token definitions
└── test-runtime            # Shared render helpers and test harness
```

## 3) Server and UI Boundaries

### App Router Route Layer (`src/app`)

- `src/app/layout.tsx`
  - Applies global font and shell.
  - Injects `ClientProviders` for browser runtime wiring.
- `src/app/page.tsx`
  - Default page is a Server Component.
  - Reads `api.post.hello` via tRPC server hydration.
  - Reads session state from `getSession()` and gates authenticated UI.
  - Defers preference and composer interactions through Client Components.
- `src/app/erp-workbench/page.tsx`
  - Minimal route shell that renders the workbench client page.

### Shared UI (`src/components`)

- `src/components/ui/app.controls.primitive.client.tsx`
  - React Aria-based, shared control primitives (Button, TextField, Select, Dialog, Table, etc.).
  - Canonical touchpoint checked by `pnpm check:workbench-contract`.
- `src/styles/globals.css`
  - Source of design tokens and utilities used by shared primitives.

### Workbench Contract (`src/features/workbench`)

- `client/erp-workbench.page.surface.client.tsx`: route-mounted interactive page client.
- `components/erp-workbench.surfaces.catalog.client.tsx`: visual surfaces and scene/demo renderers.
- `components/erp-workbench.inspector.panel.client.tsx`: metadata inspector for approved contracts.
- `erp-workbench.catalog.registry.workbench.ts`: catalog rows and scene/primitive registry.
- `types/erp-workbench.catalog.contract.shared.ts`: contract types.
- `data/erp-workbench.procurement-approval.rows.fixture.ts`: deterministic fixture rows.

### Runtime and Infra (`src/server`)

- `src/server/better-auth`
  - Auth config + session query.
  - `baseURL` is resolved from `BETTER_AUTH_URL` first, then non-prod fallbacks.
- `src/server/api`
  - `createTRPCContext`, procedures, root router.
- `src/server/db`
  - `db.postgres.adapter.server.ts`: PostgreSQL connection, Drizzle client setup.
  - `db.database.schema.shared.ts`: schema used by Drizzle operations.

### Client Runtime (`src/client-runtime`) and App State

- `client-runtime.providers.provider.client.tsx`
  - Aggregates app-wide I18n, TRPC provider, and app-state provider.
- `client-runtime.state*`
  - Simple local state container for home workflow UI preferences.
- `client-runtime.auth.adapter.client.ts`
  - Better Auth browser client adapter.

### tRPC (`src/trpc`)

- Client side:
  - `trpc.query-client.factory.shared.ts` (shared query config)
  - `trpc.react.provider.client.tsx` (`TRPCReactProvider`, batching + logger links)
- Server side:
  - `trpc.server.hydration.server.ts` (`HydrateClient`/`api` for Server Components)

## 4) Request and Data Flow

### Home Page (Server-first)

1. `src/app/page.tsx` executes on the server.
2. Loads tRPC greeting (`api.post.hello`) and session (`getSession`).
3. Optionally prefetches latest post for authenticated sessions.
4. Returns Server Component UI with `HydrateClient` wrapper for downstream usage.

### Workbench Flow

1. Route `GET /erp-workbench` serves from `src/app/erp-workbench/page.tsx`.
2. Client page binds to shared workbench state and registry for catalog preview.
3. Scene and control previews render without mutating backend state in this slice.

### API Surface

- `POST /api/trpc`
  - Standard tRPC request handler (`fetchRequestHandler`).
- `GET /api/auth/*` and `POST /api/auth/*`
  - Better Auth request passthrough (`toNextJsHandler`).

## 5) Data and Auth Contract

- Auth/session is server-owned and not cached into client-only modules.
- `BETTER_AUTH_URL` is expected in production and resolves the auth callback/base origin.
- GitHub OAuth is optional and only configured when both client id/secret are present.
- DB connectivity is server-side only via `DATABASE_URL`.

## 6) Testing and Verification

### Unit + Component

- `vitest` + Testing Library + React Aria test utils
- Client-only components and controls tests in `src/components/ui/__tests__` and `src/app/**/__tests__`

### End-to-End

- Playwright browser runtime specs under `e2e/`
- Naming and boundaries enforced by `pnpm check`/automation scripts

### Static Gates

- `pnpm check:architecture`
- `pnpm check:workbench-contract`
- `pnpm check`

## 7) Design Intent Notes

- Keep boundary suffixes and `@afenda-*` annotations aligned with current convention checks.
- Keep the workbench as a standards proof:
  - approved primitives
  - approved patterns
  - approved scenes for operational UI exploration
- Extend toward domain logic only with explicit ADR updates and a matching backend contract.
