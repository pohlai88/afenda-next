# Afenda Engineering Agent Instructions

## Non-Negotiable Decision Filter

Before making a recommendation or change, ask:

1. Does this help an ERP operator complete work faster or more safely?
2. Does this preserve domain correctness and traceability?
3. Does this follow the App Router server-first model cleanly?
4. Is this simple enough to satisfy KISS?
5. If I am abstracting, is the duplication real enough to justify DRY?
6. Will the next contributor understand why this exists?

If the answer is no, revise the approach.

## Operating Doctrine

- Afenda is ERP product code, not demo code and not generic SaaS scaffolding.
- Operators matter: optimize dense workflows for safety, throughput, and traceability.
- Default to App Router server-first patterns and narrow client islands.
- Apply KISS before DRY; abstract only when reuse is real, stable, and helpful.
- Shared UI is governed by approved primitives and patterns.
- `globals.css` is the runtime visual authority.
- Traceability beats cleverness.

## Overview

This repository is building an ERP on a Vercel-aligned Next.js 16 stack:

- Next.js 16 App Router
- React 19
- TypeScript
- tRPC
- Drizzle ORM
- PostgreSQL
- Better Auth
- Tailwind CSS v4
- pnpm 10+

All guidance in this repo must be filtered through three constraints:

1. ERP-first product thinking
2. Vibe-coding-friendly delivery
3. Vercel / Next.js App Router best practices

If generic SaaS advice conflicts with ERP needs, prefer ERP needs.
If abstract architecture conflicts with momentum and clarity, prefer the simpler design that remains legible.
If a pattern conflicts with App Router server-first guidance, prefer the App Router pattern unless there is a concrete repo reason not to.

Do not over-engineer this file. Keep it as a repo constitution: non-negotiable doctrine first, operational defaults second, tooling references last.

## Core Engineering Principles

### KISS

- Keep solutions simple and legible.
- Prefer the simplest implementation that correctly serves the ERP workflow.
- Do not introduce architectural layers, generic frameworks, or abstraction-heavy patterns before they are justified by repeated use.
- In App Router code, simple usually means server-first reads, narrow client islands, and clear mutation paths.
- Simplicity is not an excuse to skip domain correctness, validation, or traceability.

### DRY

- Remove duplication when the repeated pattern is real, stable, and costly to maintain in multiple places.
- Do not force early abstraction from one or two similar call sites.
- Prefer explicit duplication over the wrong shared abstraction.
- When deduplicating, extract around stable ERP concepts, repeated workflow behavior, or repeated UI primitives.
- Keep DRY compatible with Vibe Coding: shared code should reduce maintenance cost without making the next change harder to understand.

## Product Context

- This is an ERP, not a landing page and not a generic SaaS starter.
- The primary user experience is operational work: dense data, repeatable workflows, approvals, exception handling, auditability, and low-friction task completion.
- Screens should help operators process records safely and quickly.
- Correctness, traceability, and throughput matter more than novelty.

## Vercel / Next.js Operating Model

- Default to App Router patterns.
- Default to Server Components for pages, layouts, and read-heavy UI.
- Push `"use client"` as far down the tree as possible.
- Keep secrets, database access, and privileged logic on the server.
- Prefer direct server-side data reads in Server Components over unnecessary client fetch layers.
- Use Client Components only for interactivity, browser APIs, local state, or client-only hooks.

### Reads

- Prefer fetching ERP data in Server Components.
- Read close to the route segment that owns the data.
- Pass serialized data down to Client Components instead of promoting whole routes to the client.
- Avoid turning dashboards and record pages into client-rendered shells unless interactivity truly demands it.

### Mutations

- Prefer Server Actions for in-app form submissions and internal ERP mutations when they fit the interaction cleanly.
- Use Route Handlers for webhooks, external API surfaces, streaming, or upload flows.
- If the existing repo surface already uses tRPC for a workflow, extend the established pattern instead of mixing abstractions casually.
- Do not introduce tRPC, Server Actions, or Route Handlers based on preference alone; choose based on route ownership, transport boundary, and existing repo pattern.
- Do not add an extra HTTP hop between server-rendered routes and server-only logic without a concrete reason.

### Caching and Revalidation

- ERP data is correctness-sensitive. Do not cache blindly.
- Prefer explicit caching decisions over implicit assumptions.
- For mutable operational data, bias toward fresh reads unless there is a proven performance need.
- When cached data backs workflow-critical UI, pair mutations with explicit invalidation such as `revalidatePath`, `revalidateTag(tag, profile)`, or `updateTag` where appropriate.
- Use caching to accelerate reference data, slow-changing summaries, and expensive shared reads, not to hide stale workflow state.

### Proxy

- In Next.js 16, prefer `proxy.ts` / `src/proxy.ts` naming and behavior over legacy middleware naming.
- Keep proxy logic thin: rewrites, redirects, header shaping, coarse traffic control.
- Do not bury business authorization rules in proxy if they belong in server-side domain logic.

## ERP-First Guidance

- Optimize for workflows such as orders, inventory, purchasing, invoicing, customers, vendors, approvals, reconciliation, and reporting.
- Favor predictable screens, stable layouts, explicit states, and strong data integrity over decorative UI.
- Make tables, filters, forms, bulk actions, timelines, statuses, and audit views easy to scan and hard to misuse.
- Preserve business meaning in code. Name modules and types after domain concepts, not vague UI metaphors.
- Treat every mutation as business data. Consider validation, permissions, audit implications, and recovery paths.
- Prefer explicit workflow states over ad hoc booleans scattered across the UI.
- Handle money, quantities, units, dates, and taxes explicitly and consistently.

## Vibe Coding Guidance

- Build in small, shippable slices.
- Prefer visible progress over broad speculative refactors.
- Keep feedback loops tight: implement, run, inspect, adjust.
- Apply KISS first. Abstract only after a pattern is real.
- Choose code shapes that the next contributor can extend quickly.
- Prefer local consistency over framework invention.
- Solve the current ERP workflow cleanly before designing for hypothetical scale.
- Use DRY deliberately. If the abstraction is harder to read than the duplication, keep the duplication for now.

## UI and UX Rules

- Assume ERP usage: compact, utilitarian, information-dense, workflow-oriented.
- Avoid marketing composition, oversized hero layouts, decorative card grids, and ornamental UI.
- Prioritize filters, tables, forms, drawers, dialogs, tabs, status badges, summaries, and history views.
- Optimize for rapid scanning, repeated actions, and keyboard-friendly interaction.
- Each screen should make record identity, current state, recent change, and next available actions obvious.
- Use visual emphasis to clarify importance and status, not to decorate.

## Architecture Guidance

- Keep business logic near the domain boundary and out of presentation code.
- Separate route UI, domain rules, and persistence concerns.
- Prefer feature or domain-oriented modules over generic utility dumping grounds.
- Shared abstractions should exist because multiple ERP workflows need them, not because they look cleaner in isolation.
- Keep server-only code clearly server-only.
- Avoid module-scope initialization for infrastructure clients when lazy initialization is safer for build and runtime behavior.
- Prefer explicit variant components or composition over boolean-prop sprawl when UI reuse becomes real.
- Do not collapse unrelated workflows into one reusable module just to satisfy DRY.

## React and Component Rules

- Keep client boundaries small.
- Do not promote parent layouts or pages to Client Components just to support one interactive child.
- Prefer semantic HTML and accessible primitives.
- This app uses **react-aria-components**. Prefer React Aria patterns (components, slots, collections) over one-off ARIA when building interactive UI.

### React Aria + AI (see `.guideline/react-aria/9.working-with-ai.md`)

- **MCP:** Project Cursor config includes the official React Aria MCP (`.cursor/mcp.json`: `npx @react-aria/mcp@latest`). Requires Node.js; first run may download the package via `npx`.
- **Offline docs:** `.guideline/react-aria/` holds markdown aligned with React Aria docs for repo-local reference.
- **Agent skill (optional):** `npx skills add https://react-aria.adobe.com` installs the upstream skill; upstream also publishes [llms.txt](https://react-aria.adobe.com/llms.txt) for a full doc index.
- Keep props narrow and explicit.
- Prefer explicit variants or composition over many boolean mode props.
- Avoid large ad hoc style strings repeated across the app when a real reusable primitive is emerging.
- When component variants become real across multiple ERP primitives, standardize them deliberately instead of improvising per file.

## Approved UI Registry

Shared UI primitives and reusable product patterns must be registered before broad product use.

- React Aria Components remain behind the approved UI boundary.
- Product code should consume `App*` primitives and approved patterns instead of importing React Aria directly.
- The ERP Runtime Workbench demonstrates approved primitives, patterns, states, and constraints.
- Feature-local JSX is allowed when it is not a shared primitive or reusable pattern.
- Do not create a shadcn/Radix clone; the registry is a governance registry, not a component marketplace.

## Visual System Authority

`globals.css` is the runtime visual authority.

- Legacy palette files are reference only unless explicitly reactivated.
- Raw `--palette-*` tokens are foundation colors.
- Product UI should consume semantic `--color-*`, `--text-*`, `--radius-*`, and utility tokens.
- Do not reintroduce competing token vocabularies such as `primary`, `secondary`, `card`, `muted`, or `destructive` in Afenda-owned CSS unless they are compatibility aliases for imported primitives.
- Signal color is used to guide attention, not decorate.

## MCP Usage

Use the MCP that matches the task directly:

- `vercel` for Vercel projects, deployments, domains, docs, and platform operations exposed through the official Vercel MCP.
- `next-devtools` for Next.js diagnostics, docs, route inspection, dev-server state, and runtime error analysis.
- `playwright` for browser automation and page inspection.
- `chrome-devtools` for Chrome debugging, network inspection, performance analysis, and live browser control through DevTools.
- `react-aria` for React Aria docs and component guidance.
- `context7` for current library and framework documentation. For **Tailwind CSS v4** (deterministic builds, `@source` / `@source inline`, CLI vs PostCSS, browser requirements, `@apply` in CSS modules), query library **`/tailwindlabs/tailwindcss.com`** via Context7 instead of relying on memory alone; pair with `docs/development/tailwind-css.md` and `pnpm run check:css-artifact` when verifying compiled CSS.

Detailed Codex/Cursor setup, Windows `npx.cmd` examples, and hot-loading notes live in `docs/development/mcp.md`.

## Data and Domain Rules

- Schema design must reflect ERP domain constraints first.
- Prefer explicit status enums or constrained workflow fields.
- Track created-at and updated-at metadata consistently.
- Be conservative with destructive actions. Prefer status transitions, archival, or soft delete where domain-appropriate.
- Model relationships so records can be traced across workflows and reports.
- Do not leave critical validation in the client if the server is the real authority.

## Type Strictness

- `foo?: T` — key may be **omitted**. Use for filters, patch payloads, search params, and sparse objects where presence itself carries meaning.
- `foo: T | undefined` — key always exists, but the value is **unresolved**. Use for form state, wizards, and controlled UI drafts.
- `foo: T | null` — value is **intentionally cleared / empty**. Use for persisted records, API responses, and audited domain state.

Use `null` for "explicitly no value" in domain records, and `undefined` for "not provided / not loaded yet". Optional (`?:`) is reserved for keys whose presence itself carries meaning.

`exactOptionalPropertyTypes` is enabled; new code must follow this rule.

## Environment

- `BETTER_AUTH_URL` is the canonical external base URL for Better Auth. It controls callback URLs, session redirects, and OAuth provider `redirectURI`.
- Local development should use `http://localhost:3000` unless the dev server runs on a different port.
- Production deployments must set `BETTER_AUTH_URL` to the public application origin. Auth resolution throws on startup if it is missing in production.
- Do not rely on inferred deployment URLs (`VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`) for auth callbacks when an explicit canonical URL is available.
- Auth and base-URL changes should land as focused correctness slices and should not be mixed with feature PRs.
- Probe traffic to `/.well-known/oauth-authorization-server` from external MCP or OAuth-discovery clients is expected and harmless. Do not add a stub route to silence those 404s. Implement the metadata endpoint only when an Afenda-owned OAuth flow actually requires it.

## Working Rules for Agents

- Assume the target output is ERP product code, not demo code.
- Prefer server-first App Router solutions before reaching for client-side orchestration.
- When proposing UI patterns, explain them in terms of operator workflow, error prevention, and throughput.
- When proposing data changes, explain them in terms of domain integrity and traceability.
- When proposing Next.js architecture changes, explain the server/client boundary and cache behavior clearly.
- Keep edits scoped and incremental.
- Extend existing patterns when they are coherent; replace them only when there is a concrete problem.
- Apply KISS before inventing new abstractions.
- Apply DRY only when reuse is proven and the extracted shape remains easy to reason about.
- TypeScript hardening should land as its own focused slice. Do not mix stricter compiler flags with feature work, UI refactors, or domain changes unless the change is explicitly scoped that way.

## Testing

- Vitest + Testing Library + jsdom (`vitest.config.ts`, `vitest.setup.ts`).
- Place specs in a local `__tests__` folder next to the code under test: `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`.
- Shared test helpers (for example custom `render`) live under `src/test/`.

## Repo Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm check
pnpm test
pnpm test:watch
pnpm db:generate
pnpm db:migrate
pnpm db:push
pnpm db:studio
pnpm format:check
pnpm format:write
```

## Source Guidance

This file is intentionally aligned with current Vercel / Next.js App Router guidance:

- Server Components by default
- Client boundaries kept narrow
- Server Actions for internal mutations where appropriate
- Route Handlers for external-facing or special transport cases
- Explicit cache and revalidation choices
- Proxy naming and usage aligned with Next.js 16
