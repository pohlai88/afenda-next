# Afenda Next.js Standard Working Prompt

Use this prompt when starting a new feature, audit, fix, refactor, or configuration task in this repo.

Short invocation:

```text
Use the Afenda Next.js Standard Working Prompt for this task: <describe the task>.
```

Full prompt:

```text
You are working in C:\JackProject\afenda-next.

Follow AGENTS.md, .guideline/nextjs/nextjs-best-practices.md, and .guideline/nextjs/annotation-and-naming.md as the working contract.

Project context:
- ERP-first product code, not demo code.
- Next.js 16 App Router, React 19, TypeScript, tRPC, Drizzle ORM, PostgreSQL, Better Auth, Tailwind CSS v4, pnpm 10+.
- Optimize for operational correctness, traceability, dense workflow UI, and low-friction operator throughput.
- Respect KISS, DRY, clear boundaries, no unnecessary abstraction, and no speculative refactors.

Mandatory Next.js MCP workflow:
- If the Next.js MCP is available, call `init` before doing Next.js work.
- Read `nextjs-docs://llms-index` before fetching official docs paths.
- Use `nextjs_docs` for any Next.js API, config, feature, or pattern instead of relying on memory.
- If a dev server is running, use `nextjs_index` before runtime-sensitive changes.
- Use `nextjs_call` for errors, routes, logs, project metadata, page metadata, and Server Action lookup when useful.
- Use browser automation for rendered behavior, hydration, console errors, and workflow verification when UI changes are made.

Before editing, classify the task into one or more boundaries:
- Route UI
- Client island
- Server Component read
- Server Action mutation
- Route Handler
- Data Access Layer
- Auth or authorization
- Cache or revalidation
- Proxy
- next.config
- Test or verification
- Styling or accessibility
- Deployment or Vercel platform

Working method:
1. Inspect the existing repo shape before proposing changes.
2. Identify the smallest shippable slice.
3. Preserve existing coherent patterns.
4. Keep route UI thin and domain names explicit.
5. Keep database access, secrets, Better Auth, privileged logic, and permissions server-only.
6. Prefer Server Components for reads and pass serialized DTOs into Client Components.
7. Push `"use client"` as far down the tree as possible.
8. Prefer Server Actions for internal ERP form mutations when they fit.
9. Prefer Route Handlers for webhooks, public APIs, uploads, streaming, and external clients.
10. Do not add an internal HTTP hop from Server Components to Route Handlers without a concrete reason.
11. Treat every mutation as business data: validate input, check auth, check authorization, consider auditability, and revalidate explicitly.
12. Cache only with a documented freshness and invalidation policy. Mutable ERP workflow data should default to fresh reads.
13. Do not enable Cache Components unless the task explicitly chooses that migration and the route impact is audited.
14. Use React Aria Components for interactive accessible UI where applicable.
15. Avoid broad refactors, compiler hardening, dependency upgrades, or style rewrites unless the task is scoped to them.

Type and data rules:
- Optional property `foo?: T` means the key may be omitted.
- `foo: T | undefined` means the key exists but is unresolved.
- `foo: T | null` means explicitly empty or cleared persisted state.
- Client-bound props must be serializable and minimal.
- Server Action return values must be filtered to what the UI needs.
- Route params, search params, headers, cookies, and form data are untrusted input.

ERP UI rules:
- Prefer compact, predictable, information-dense screens.
- Prioritize tables, filters, forms, drawers, dialogs, tabs, status badges, summaries, timelines, and audit/history views.
- Avoid marketing layouts, oversized heroes, decorative card grids, and ornamental motion.
- Every workflow screen should make record identity, state, recent change, and next action clear.

Validation requirements:
- Run the smallest relevant checks after the slice.
- Prefer `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` depending on scope.
- Use `pnpm check` when the change touches multiple boundaries or before a stabilization closeout.
- If a check cannot run, state why and list residual risk.

Documentation automation requirements:
- Treat `docs/automation-contract.md` as the docs automation contract.
- Run `pnpm docs:generate` when ADR files change, guideline docs change, generated docs indexes become stale, or core docs discovery changes.
- README files inside declared docs/source automation margins are generated and must not be edited manually.
- Root README prose belongs in `docs/source/root-readme.md`; root `README.md` is generated from that template.
- Package README files and unconfigured module README files remain out of scope until a later ADR or explicit follow-up slice.
- Use `AFENDA_DOCS_SNAPSHOT_DATE=YYYY-MM-DD pnpm docs:generate` only when an explicit dated snapshot is needed.
- After docs automation changes, run `node --check scripts/repo.docs-index.generator.automation.mjs`, `node --check scripts/repo.docs-contract.check.automation.mjs`, `pnpm docs:generate`, `pnpm check:docs`, and `pnpm check:architecture`.

Stop and ask before proceeding if:
- The change requires destructive data operations.
- The change requires overwriting unrelated user edits.
- The task scope implies a major architecture migration.
- Cache Components, auth model changes, database schema changes, or production environment changes are needed but not explicitly approved.

Final response format:
- State what changed.
- State which checks ran and their result.
- State any remaining risks or next recommended slice.
- Keep the response concise and avoid file-by-file changelog noise unless requested.
```

## Usage Examples

```text
Use the Afenda Next.js Standard Working Prompt for this task: audit server/client boundaries in the ERP workbench.
```

```text
Use the Afenda Next.js Standard Working Prompt for this task: add a purchase order approval form with server-side validation.
```

```text
Use the Afenda Next.js Standard Working Prompt for this task: review next.config and recommend only low-risk production hardening.
```

## Related Guidelines

- `C:\JackProject\afenda-next\AGENTS.md`
- `C:\JackProject\afenda-next\.guideline\nextjs\nextjs-best-practices.md`
