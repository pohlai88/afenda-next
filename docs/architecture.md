# Afenda Next Architecture

> Snapshot: `2026-05-04`  
> Workspace: `C:\JackProject\afenda-next`  
> Stack: Next.js 16 App Router, React 19, TypeScript, tRPC, Drizzle, PostgreSQL, Better Auth, Tailwind CSS v4

This document reflects the code that is live in the repository today, not the earlier workbench prototype layout.

## 1) Product/Platform Positioning

Afenda is an ERP-oriented Next.js application with:

- Server-first route composition under `src/app`.
- Shared React Aria primitives under `src/components/ui`.
- Route-local ERP preview surfaces under `src/app/(app)/erp-workbench/_components`.
- Privileged auth, API, and database runtime under `src/server`.
- tRPC for structured server/client query boundaries.

Current scope is a hardened auth boundary plus a route-local ERP runtime workbench that proves the shared UI contract with fixture data.

## 2) Topology

```txt
src
├── app
│   ├── (app)
│   │   ├── _components
│   │   ├── erp-workbench
│   │   │   ├── _components
│   │   │   └── page.tsx
│   │   ├── sign-in
│   │   │   ├── _components
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api
│       ├── auth/[...all]/route.ts
│       └── trpc/[trpc]/route.ts
├── client-runtime
├── components
│   └── ui
├── server
│   ├── api
│   ├── better-auth
│   └── db
├── styles
├── test-runtime
└── trpc
```

## 3) Route and Runtime Boundaries

### App Router (`src/app`)

- `src/app/(app)/page.tsx`
  - Server Component.
  - Reads session state with `getSession()`.
  - Prefetches `workspaceNote.getLatest` for authenticated users.
  - Uses a server action for sign-out through Better Auth.
- `src/app/(app)/sign-in/page.tsx`
  - Server route wrapper for sign-in.
  - Redirects authenticated users away from the sign-in screen.
  - Normalizes `callbackUrl` to same-origin relative paths only.
- `src/app/(app)/erp-workbench/page.tsx`
  - Server gate for the runtime workbench.
  - Redirects unauthenticated users to `/sign-in?callbackUrl=/erp-workbench`.
  - Passes fixture-only data into a narrow client island.

### Shared UI (`src/components/ui`)

- `app.controls.primitive.client.tsx`
  - Canonical React Aria wrapper layer for buttons, fields, tabs, tables, grid lists, dialogs, toolbar, and status UI.
  - This is the only approved direct React Aria import boundary in product source.
- `src/styles/globals.css`
  - Semantic tokens and shared visual utilities for the ERP surface.

### ERP Runtime Workbench (`src/app/(app)/erp-workbench/_components`)

- `erp-runtime-workbench.route.surface.client.tsx`
  - Main client island for mode switching and selection state.
- `erp-workbench.runtime.scenes.client.tsx`
  - Overview, contract, method, procurement, and inspector scenes.
- `erp-workbench.runtime.contract.shared.ts`
  - Serializable route-local workbench contract types.
- `erp-workbench.runtime.data.fixture.ts`
  - Fixture-only preview data and source-path evidence strings.

The old `src/features/workbench` prototype is no longer part of the active architecture.

### Server Runtime (`src/server`)

- `src/server/better-auth`
  - Better Auth configuration, session query, and enabled-OAuth-provider discovery.
  - `BETTER_AUTH_URL` is the canonical auth origin in production.
  - Session reads bypass Better Auth cookie cache for immediate revocation behavior.
- `src/server/api`
  - tRPC context, procedures, and router composition.
- `src/server/db`
  - PostgreSQL connection and Drizzle schema/runtime setup.

### Client Runtime (`src/client-runtime`)

- App-wide browser providers, local runtime state, and Better Auth browser client wiring.
- No privileged auth config, DB access, or server runtime logic lives here.

## 4) Request and Data Flow

### Home Route

1. `src/app/(app)/page.tsx` renders on the server.
2. It resolves the current Better Auth session.
3. It prefetches the latest workspace note only when a user session exists.
4. It hydrates the client runtime only for interactive home-route widgets.

### Sign-In Route

1. `src/app/(app)/sign-in/page.tsx` resolves the current session on the server.
2. If a session exists, the route redirects to `/`.
3. Otherwise it passes a safe callback path and enabled OAuth provider ids into the client sign-in surface.

### ERP Runtime Workbench

1. `src/app/(app)/erp-workbench/page.tsx` resolves the server session.
2. Unauthenticated requests redirect to `/sign-in` with a callback path.
3. Authenticated requests render the route-local workbench client island with fixture-only data.
4. Queue selection, filters, evidence, and decision previews stay local to the client island and do not mutate backend state.

### API Surface

- `GET/POST /api/auth/[...all]`
  - Better Auth transport adapter.
- `GET/POST /api/trpc/[trpc]`
  - tRPC handler for application procedures.

## 5) Auth and Data Contract

- Better Auth configuration is server-owned under `src/server/better-auth/auth.config.adapter.server.ts`.
- The browser client uses same-origin auth requests with credentials included.
- OAuth providers are enabled only when the canonical `BETTER_AUTH_*` credentials are present.
- Session reads use `disableCookieCache: true` in request context and server session helpers.
- Database access remains server-only through `DATABASE_URL`.

## 6) Verification Gates

- `pnpm check:architecture`
- `pnpm check:workbench-contract`
- `pnpm check:docs`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## 7) Design Intent Notes

- Keep auth configuration, callback origin, and session resolution inside the explicit Better Auth server boundary.
- Keep workbench code route-local until a real ERP feature module justifies a separate domain-owned source area.
- Treat the runtime workbench as a contract proof for dense ERP interaction patterns, not as business workflow implementation.
