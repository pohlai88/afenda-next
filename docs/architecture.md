# Afenda Next Architecture

> Snapshot: `2026-05-04`  
> Workspace: `C:\JackProject\afenda-next`  
> Stack: Next.js 16 App Router, React 19, TypeScript, tRPC, Drizzle, PostgreSQL, Better Auth, Tailwind CSS v4

This document reflects the code that is live in the repository today.

## 1) Product/Platform Positioning

Afenda is an ERP-oriented Next.js application with:

- Server-first route composition under `src/app`.
- Shared UI primitives under `src/components`, with governed `App*` primitives currently authored in `src/components/ui-governance` (`app-*` folders with co-located `*.control.primitive.client.tsx`, `*.contract.primitive.shared.ts`, and `*.ui.manifest.shared.ts` files).
- **Interface Lab** (`/interface-lab`) as the route-local, fixture-backed preview and registry surface (no parallel legacy preview route).
- Privileged auth, API, and database runtime under `src/server`.
- tRPC for structured server/client query boundaries.

Current scope is a hardened auth boundary plus Interface Lab for ERP UI references and mock-backed previews.

**Public marketing landing** (when implemented) is governed by [**ADR 0011: Afenda Marketing Landing — Business Truth Engine**](./adr/0011-afenda-marketing-landing-business-truth.md): the “business truth engine” thesis, one-page section spine, ontology alignment, fixture plausibility rules, and phased delivery expectations.

## 2) Topology

```txt
src
├── app
│   ├── (app)
│   │   ├── _components
│   │   ├── interface-lab
│   │   │   ├── blocks/[slug]/page.tsx
│   │   │   ├── components/[slug]/page.tsx
│   │   │   ├── erp-patterns/[slug]/page.tsx
│   │   │   ├── interface-lab.config.ts
│   │   │   ├── interface-lab.types.ts
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
│   ├── ui-governance
│   │   ├── governance.ui.*.shared.ts
│   │   └── app-*
│   └── …
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
- `src/app/(app)/interface-lab/page.tsx`
  - Server-first Interface Lab root: registry navigation, fixture digest, and links to `[slug]` preview leaves.
  - No database reads and no server mutations; preview context comes from `@mock` where needed.

### Shared UI (`src/components/ui-governance`)

- **Folders:** only `app-*` (for example `app-search-autocomplete`). Each folder is shallow and holds exactly one explicit contract trio: `app-<name>.control.primitive.client.tsx`, `app-<name>.contract.primitive.shared.ts`, and `app-<name>.ui.manifest.shared.ts`.
- **Governance modules (repo root of `ui-governance/`):** `governance.ui.manifest.shared.ts` (Zod manifest law), `governance.ui.registry.shared.ts` (single manifest aggregate), `governance.ui.guard.shared.ts` (guard), `governance.ui.types.shared.ts` (type-only re-exports), `governance.ui.css-snapshot.shared.ts` (generated from `globals.css` via `scripts/extract-ui-css-snapshot.mjs`). No `components.json` and no second aggregate outside this tree.
- **Registry:** `governance.ui.registry.shared.ts` imports each `app-*/*.ui.manifest.shared.ts` and exports the manifest list and lookup maps.
- **Schema:** `governance.ui.manifest.shared.ts` validates manifest objects, including explicit composition and token contracts.
- `src/styles/globals.css` — semantic tokens and shared visual utilities.

### Interface Lab (`src/app/(app)/interface-lab`)

- `interface-lab.config.ts` — single source of truth for sections, registry entries, and featured previews.
- Dynamic leaves under `blocks/`, `components/`, and `erp-patterns/` keep each preview a dedicated URL under `/interface-lab/...`.

Preview fixtures live in repo-root `.mock/` and are imported as `@mock`.

### Server Runtime (`src/server`)

- `src/server/better-auth` — Better Auth configuration, session query, and OAuth discovery.
- `src/server/api` — tRPC context, procedures, and router composition.
- `src/server/db` — PostgreSQL and Drizzle schema/runtime setup.

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

### Interface Lab

1. Lab routes render as Server Components unless a preview explicitly introduces a client island.
2. Registry and copy are owned by `interface-lab.config.ts` so navigation does not drift.
3. Procurement and other ERP-shaped previews use deterministic mock rows only.

### API Surface

- `GET/POST /api/auth/[...all]` — Better Auth transport adapter.
- `GET/POST /api/trpc/[trpc]` — tRPC handler for application procedures.

## 5) Auth and Data Contract

- Better Auth configuration is server-owned under `src/server/better-auth/auth.config.adapter.server.ts`.
- The browser client uses same-origin auth requests with credentials included.
- OAuth providers are enabled only when the canonical `BETTER_AUTH_*` credentials are present.
- Session reads use `disableCookieCache: true` in request context and server session helpers.
- Database access remains server-only through `DATABASE_URL`.

## 6) Verification Gates

- `pnpm check:architecture`
- `pnpm check:ui-governance` (shared UI + contract automation)
- `pnpm check:docs`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## 7) Design Intent Notes

- Keep auth configuration, callback origin, and session resolution inside the explicit Better Auth server boundary.
- Keep Interface Lab thin: config-owned registry, server-first shells, and `@mock` for rows — not a second product backend.
- Treat Interface Lab as the operator-facing reference for dense ERP UI patterns, not as committed business workflow implementation.
- Treat governed shared UI primitives as canonical frontend-consumable contracts, not as loosely typed wrappers.
