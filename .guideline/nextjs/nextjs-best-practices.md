# Next.js Best Practices for Afenda

Source scope: Next.js DevTools MCP official docs index for Next.js 16.2.4, Next.js MCP resources, and the local Vercel `nextjs` skill.

This guide is the repo-local checklist for auditing and configuring Afenda's Next.js usage. It is intentionally ERP-first: correctness, traceability, operator throughput, and stable workflows outrank decorative UI and speculative abstractions.

## Decision Rules

- Prefer App Router patterns over legacy Pages Router patterns unless the repo has an explicit Pages Router surface that must be preserved.
- Prefer Server Components for pages, layouts, and read-heavy route UI.
- Add `"use client"` only at the smallest interactive boundary.
- Keep privileged data, database access, secrets, authorization, and business mutations on the server.
- Prefer direct server-side reads from Server Components over unnecessary internal HTTP calls.
- Prefer Server Actions for in-app ERP form mutations when the interaction fits.
- Prefer Route Handlers for webhooks, public APIs, external clients, uploads, streaming, or special transport needs.
- Do not call Route Handlers from Server Components just to reach server code. Share server-only functions directly.
- Cache deliberately. Mutable ERP workflow data should be fresh unless there is an explicit domain-safe caching policy.
- Apply KISS first. Extract shared abstractions only when repetition is real, stable, and easier to maintain than duplication.

## App Router Structure

- Use `src/app` consistently when the project uses a `src` directory.
- Keep route files focused on route ownership: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `template.tsx`, and `default.tsx`.
- Use `page.tsx` only where the route should be publicly addressable.
- Use `route.ts` only for API endpoints. A route segment cannot have both `page.tsx` and `route.ts` at the same level.
- Use route groups such as `(app)`, `(admin)`, or `(auth)` to organize layouts without changing URLs.
- Use private folders such as `_components`, `_lib`, `_actions`, and `_queries` to mark route-local implementation details that are not routable.
- Keep route UI, domain rules, and persistence concerns separated. Do not bury business rules in presentation components.
- Use parallel routes and intercepting routes only for clear UI needs such as modal details over a list or independent layout slots.
- Keep root layouts stable. Move request-time data and interactive state below root layout where possible.

## Server and Client Components

- Treat all App Router components as Server Components by default.
- Use Client Components only for state, event handlers, effects, browser APIs, custom client hooks, or client-only third-party libraries.
- Remember that `"use client"` creates a transitive client module boundary. Every import below that boundary becomes part of the client graph.
- Move `"use client"` down the tree to reduce shipped JavaScript.
- Pass only serializable values from Server Components to Client Components.
- Convert `Date` values to strings before crossing the server/client boundary.
- Do not pass ORM clients, database records with private fields, class instances, functions, symbols, DOM nodes, or SDK objects to Client Components.
- Pass Server Components as `children` or slots into Client Components when an interactive wrapper needs server-rendered content.
- Wrap third-party client-only components in narrow Client Component wrappers.
- Render providers as deep as practical. Do not turn `html`, root layout, or large route shells into Client Components for one provider.
- Mark server-only modules with `import "server-only"` when they touch secrets, databases, privileged auth, or internal business logic.
- Use `client-only` for modules that must never run in the server graph.

## Data Fetching

- Fetch ERP data in Server Components when rendering server-owned pages.
- Fetch close to the route segment or component that owns the data instead of prop-drilling through unrelated layers.
- Use database or ORM reads directly in server-only modules. Keep credentials and query logic out of the client bundle.
- Prefer a Data Access Layer for production ERP data. It should be server-only, perform authorization, and return minimal DTOs.
- Avoid mixing incompatible data access models in the same workflow. Pick DAL, external HTTP APIs, or route-local prototype access deliberately.
- Use `React.cache` only for request-scoped memoization. It does not share results across requests.
- Start independent reads before awaiting them, then use `Promise.all` to avoid waterfalls.
- Use `Promise.allSettled` where partial failure can still produce useful ERP UI.
- Stream slow or fresh data with `Suspense` so stable page chrome appears quickly.
- Use `loading.tsx` for route-segment loading states and `Suspense` for granular dynamic sections.
- Design loading states as meaningful ERP skeletons, not generic spinners.

## Runtime Request APIs

- Treat `cookies()`, `headers()`, `searchParams`, `params`, and `connection()` as dynamic/request-time signals.
- In Next.js 16, async request APIs must be awaited where required by the API surface.
- Avoid reading request-time APIs in root layouts unless the whole app intentionally depends on request-specific rendering.
- Wrap request-time or uncached sections in `Suspense` when using Cache Components or when granular streaming improves the route.
- Do not call `headers()` or `cookies()` only to force dynamic rendering. Use `connection()` when intentional request-time rendering is needed.
- Validate all route params and search params. Treat bracket folders such as `[id]` as user input.

## Mutations and Forms

- Use Server Actions for in-app forms and internal ERP mutations when the UI is form-driven or action-driven.
- Keep Server Actions async and explicitly server-owned with `"use server"` where needed.
- Treat every Server Action as externally reachable by POST. Verify authentication and authorization inside the action or delegated DAL function.
- Check ownership and workflow permission, not only logged-in state.
- Validate all client-controlled input with server-side validation. Client validation is only UX assistance.
- Model expected validation errors as return values for `useActionState`; reserve thrown errors for unexpected failures.
- Use `useActionState`, `useFormStatus`, and accessible `aria-live` regions for pending states and validation feedback.
- Prefer `bind` for additional action arguments when progressive enhancement matters. Hidden inputs are visible in HTML and must not be trusted.
- Return only the data the client needs from Server Actions. Do not return raw database records.
- Revalidate before `redirect()` because `redirect()` exits control flow.
- Never perform mutations as side effects during render. Use Server Actions or Route Handlers.
- For expensive mutations, add rate limiting or abuse controls at the server boundary.

## Route Handlers

- Use Route Handlers for public APIs, webhooks, large uploads, streaming, external integrations, or client-only surfaces that need a server endpoint.
- Support only the HTTP methods the route actually needs.
- Remember that non-GET Route Handler methods are not cached.
- Without Cache Components, `GET` Route Handlers are not cached by default but can opt into caching with route config.
- With Cache Components enabled, `GET` Route Handlers follow the same prerendering model as UI routes.
- Do not place `route.ts` beside `page.tsx` at the same segment.
- Prefer `RouteContext<"/path/[id]">` typing for dynamic Route Handler params.
- Keep webhook handlers explicit about auth, signatures, idempotency, and replay safety.

## Proxy

- In Next.js 16, use `proxy.ts` or `src/proxy.ts`, not legacy `middleware.ts`, unless a deployment adapter explicitly requires legacy behavior.
- Place `proxy.ts` at the same level as `app` or `pages`.
- Keep exactly one Proxy entry point and split helper logic into imported modules if needed.
- Use Proxy for rewrites, redirects, coarse traffic shaping, and header changes.
- Do not use Proxy for slow data fetching, detailed authorization, or full session management.
- Do not rely on Proxy as the only authorization layer. Server Components, Server Actions, Route Handlers, and DAL code must enforce real authorization.
- Use `next.config` redirects before Proxy when a static redirect is enough.
- `fetch` caching options have no effect in Proxy.

## Data Security

- Prefer a server-only DAL for ERP reads and writes.
- The DAL should own `process.env`, database clients, auth checks, permission checks, and DTO shaping.
- Return minimal DTOs from the DAL. Do not expose raw records to route UI or Client Components.
- Use classes, private shapes, or tainting where appropriate to make accidental client leakage harder.
- Mark DAL modules with `import "server-only"`.
- Never trust form data, headers, cookies, search params, route params, or client state.
- Re-authorize inside every mutation entry point.
- Filter Server Action return values.
- Avoid closure capture of sensitive values in Server Actions. Encryption is defense-in-depth, not a reason to capture secrets.
- Consider `serverActions.allowedOrigins` only when reverse proxies or layered architecture require explicit safe origins.
- Keep `.env*` secrets out of source control. Only variables prefixed with `NEXT_PUBLIC_` are intended for browser exposure.
- Treat `NEXT_PUBLIC_*` values as build-time public constants, not runtime secrets.

## Environment Variables

- Keep `.env`, `.env.local`, `.env.development`, and `.env.production` in the project root, not under `src`.
- Do not commit local or production secret files.
- Use `@next/env` only when code outside Next.js runtime needs env loading, such as ORM config or test setup.
- Use `.env.test` for committed test defaults and `.env.test.local` for ignored local overrides.
- Understand env load order: `process.env`, `.env.$NODE_ENV.local`, `.env.local` except test, `.env.$NODE_ENV`, `.env`.
- Use `connection()` or another request-time API when server-side runtime env evaluation is required in a promoted Docker image.
- For this repo, keep `BETTER_AUTH_URL` as the canonical auth origin and do not infer auth callback origins from Vercel deployment variables when an explicit origin is available.

## Caching and Revalidation

- Default mutable ERP workflow data to fresh reads.
- Cache only when the data category allows staleness, such as reference data, public metadata, slow-changing summaries, or expensive shared computations.
- Document every cache decision with ownership, staleness tolerance, invalidation trigger, and user impact.
- Prefer tag-based invalidation over broad path invalidation when possible.
- Use `updateTag(tag)` inside Server Actions when users must immediately see their own writes.
- Use `revalidateTag(tag, "max")` for stale-while-revalidate flows where slight delay is acceptable.
- Use `revalidateTag(tag, { expire: 0 })` from Route Handlers when an external webhook must immediately expire tagged data.
- Use `revalidatePath(path)` when the route is the safest invalidation unit or tags are not available.
- `refresh()` refreshes the client router from a Server Action but does not revalidate tagged data.
- Avoid caching user-specific or permission-sensitive data unless the cache key and scope are explicitly safe.

## Cache Components

- Do not enable Cache Components casually. Audit route behavior first.
- If enabling, set `cacheComponents: true` in `next.config.ts` and use the Next.js MCP `enable_cache_components` workflow.
- With Cache Components, use `"use cache"` for cacheable async functions or components.
- Use `cacheLife` to declare cache lifetime and `cacheTag` for on-demand invalidation.
- Use `"use cache: private"` only for per-request/private cache scopes and pair it with required `Suspense` boundaries.
- Do not access `cookies()`, `headers()`, or other request APIs inside a public `"use cache"` scope.
- Do not call `connection()` inside any cache scope.
- Do not use incompatible segment configs with Cache Components, including `dynamic`, `fetchCache`, `revalidate`, and `dynamicParams`.
- Do not use single-argument `revalidateTag(tag)` in Next.js 16. Always pass a profile or expiration object.
- Cached function arguments and closed-over values participate in cache keys. Ensure values are serializable and intentional.
- Short-lived caches may be excluded from prerendering and behave as dynamic holes.

## Rendering and Navigation

- Use layouts to preserve shared UI and support partial rendering during navigation.
- Use `next/link` for internal navigation so client-side transitions and prefetching work.
- Be deliberate with prefetch behavior on dense ERP screens with many links.
- Use streaming to avoid blocking full routes on slow data.
- Use static rendering only for content that is safe to prerender.
- Use dynamic rendering for user-specific, permission-sensitive, or always-fresh workflow state.
- Use route groups to scope loading states and layouts without changing URLs.
- Consider view transitions only when they clarify state changes. Avoid decorative motion in operational ERP screens.

## Images, Fonts, Scripts, Metadata

- Use `next/image` for application images where optimization, dimensions, and layout stability matter.
- Always provide meaningful `alt` text or empty `alt` for decorative images.
- Use `next/font` to reduce external font requests and layout shift.
- Use `next/script` for third-party scripts and choose the loading strategy deliberately.
- Use the Metadata API for titles, descriptions, robots, canonical behavior, and route metadata.
- Use file conventions for `favicon`, `icon`, `apple-icon`, `opengraph-image`, `twitter-image`, `robots`, and `sitemap` when relevant.
- Use generated OG images only when the route benefits from share previews or external previews. ERP internal routes usually do not.

## Error and Not Found Handling

- Separate expected errors from uncaught exceptions.
- Return expected form and validation errors as state. Do not throw for normal validation failure.
- Use `notFound()` and `not-found.tsx` for missing records or unavailable route resources.
- Add route-level `error.tsx` for recoverable segment failures. Error boundaries must be Client Components.
- Use `global-error.tsx` for root-level fallback only when needed. It must define its own `html` and `body`.
- Error boundaries do not catch event handler errors. Handle those in the Client Component or rethrow via `startTransition` when boundary handling is intended.
- Error UI should help operators recover safely, retry, navigate back, or report the affected record.

## UI and Accessibility

- ERP screens should be compact, information-dense, predictable, and keyboard-friendly.
- Prefer tables, filters, forms, drawers, dialogs, tabs, status badges, summaries, and history views.
- Avoid marketing hero layouts and decorative card grids for operational workflows.
- Use semantic HTML and accessible primitives.
- This repo uses React Aria Components. Prefer React Aria patterns for interactive UI.
- Use accessible loading, error, and validation states.
- Preserve record identity, current state, recent change, and next available action on each workflow screen.

## TypeScript and Config

- Keep `next.config.ts` minimal. Add configuration only for a concrete feature, platform requirement, or measured issue.
- Use `import type { NextConfig } from "next"` for typed config.
- Consider `typedRoutes` when route safety becomes useful for navigation-heavy ERP modules.
- Consider `poweredByHeader: false` for production header hardening.
- Configure `images`, `headers`, `redirects`, `rewrites`, `serverActions`, `serverExternalPackages`, `turbopack`, or `transpilePackages` only when the repo has a direct requirement.
- Do not disable TypeScript or ESLint build failures to ship around correctness problems.
- Keep `exactOptionalPropertyTypes` semantics consistent: optional means omitted, `undefined` means unresolved, `null` means intentionally empty.
- Use route-aware helpers such as `RouteContext` where available.

## Testing and Verification

- Use unit tests for pure domain functions, validation, mappers, and small UI behavior.
- Use component tests for interactive client islands and forms.
- Use integration tests for server actions, DAL behavior, and route-adjacent workflows where practical.
- Prefer E2E tests for async Server Components and operator workflows because unit tooling support is less complete.
- Use Playwright or browser MCP verification for rendered routes, hydration, console errors, and critical flows.
- Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` before considering a stabilization slice complete.
- Use Next.js DevTools MCP runtime tools when the dev server is running: route discovery, errors, logs, metadata, and Server Action inspection.

## Production Readiness

- Run `next build` locally before production deployment.
- Run `next start` or a Vercel preview to test production-like behavior.
- Check Core Web Vitals and real browser behavior, not only HTTP responses.
- Analyze bundles when client-side JavaScript grows unexpectedly.
- Lazy-load large client-only components and third-party libraries when they are not needed at first render.
- Add CSP and security headers when the app surface and deployment environment are ready for enforcement.
- Keep dependencies patched, especially Next.js, React, and React DOM on App Router security-sensitive releases.
- Use Vercel platform features for deployments, environment variables, previews, logs, and observability where applicable.

## Agent and MCP Workflow

- For Codex, configure MCP servers in `~/.codex/config.toml` or with `codex mcp add`; do not assume `.cursor/mcp.json` configures Codex.
- Start every Next.js work session by calling the Next.js MCP `init` tool when available.
- Read `nextjs-docs://llms-index` before fetching official docs paths.
- Use `nextjs_docs` for framework concepts and APIs rather than relying on memory.
- Use `nextjs_index` to discover running dev servers and their available runtime tools.
- Use `nextjs_call` for runtime diagnostics such as errors, logs, routes, page metadata, project metadata, and Server Action lookup.
- Use browser automation for rendered behavior and hydration checks.
- Restart Codex Desktop and start a new thread after changing MCP config if newly added tools are not visible.
- Prefer direct MCPs by task: `next-devtools` for Next.js runtime/docs, `vercel` for platform operations, `playwright` for browser automation, `chrome-devtools` for DevTools diagnostics, `react-aria` for React Aria docs, and `context7` for current library docs.

## Audit Checklist

- `App structure`: Route groups, private folders, route file placement, duplicate router surfaces, special files.
- `Server/client boundaries`: `"use client"` placement, provider depth, client bundle risk, serializable props.
- `Data access`: DAL presence, server-only boundaries, DTO shaping, direct DB imports outside allowed modules.
- `Security`: action auth/authz, param validation, search param validation, secret exposure, Server Action return values.
- `Mutations`: Server Actions vs Route Handlers, validation, revalidation, redirects, expected error modeling.
- `Caching`: stale data risk, tag strategy, path invalidation, mutable ERP data freshness.
- `Runtime APIs`: `headers`, `cookies`, `searchParams`, `params`, `connection`, root layout usage.
- `Proxy`: location, matcher scope, no business auth, no slow fetches.
- `Route Handlers`: method scope, webhooks, auth, idempotency, page/route conflicts.
- `Error UX`: `error.tsx`, `not-found.tsx`, global fallback, expected error state, operator recovery.
- `Config`: `next.config.ts` minimality, typed config, security headers, unnecessary flags.
- `Performance`: waterfalls, streaming, Suspense, heavy client components, images, fonts, scripts.
- `Testing`: unit/component/integration/E2E coverage for critical workflows.
- `MCP`: Next.js runtime discovery, docs references, browser verification, Vercel checks.

## Available Next.js MCP Documentation Surface

Use this map to ensure audits do not omit relevant Next.js areas.

### Getting Started

- Installation
- Project Structure
- Layouts and Pages
- Linking and Navigating
- Server and Client Components
- Fetching Data
- Mutating Data
- Caching
- Revalidating
- Error Handling
- CSS
- Image Optimization
- Font Optimization
- Metadata and OG images
- Route Handlers
- Proxy
- Deploying
- Upgrading

### Guides

- AI Coding Agents
- Analytics
- Authentication
- Backend for Frontend
- Caching Previous Model
- CDN Caching
- CI Build Caching
- Content Security Policy
- CSS-in-JS
- Custom Server
- Data Security
- Debugging
- Deploying to Platforms
- Draft Mode
- Environment Variables
- Forms
- How Revalidation Works
- Incremental Static Regeneration
- Instrumentation
- Internationalization
- JSON-LD
- Lazy Loading
- Local Development
- Next.js MCP Server
- MDX
- Memory Usage
- Migrating
- Migrating App Router
- Migrating from Create React App
- Migrating from Vite
- Migrating to Cache Components
- Multi-tenant
- Multi-zones
- OpenTelemetry
- Package Bundling
- PPR Platform Guide
- Prefetching
- Preserving UI State
- Production
- Progressive Web Apps
- Public Pages
- Redirecting
- Rendering Philosophy
- Sass
- Scripts
- Self-Hosting
- Single-Page Applications
- Static Exports
- Streaming
- Tailwind CSS v3
- Testing
- Testing with Cypress
- Testing with Jest
- Testing with Playwright
- Testing with Vitest
- Third Party Libraries
- Upgrading
- Upgrading Codemods
- Upgrading Version 14
- Upgrading Version 15
- Upgrading Version 16
- Videos
- View Transitions

### API Reference Areas

- Directives: `use cache`, `use cache: private`, `use cache: remote`, `use client`, `use server`
- Components: Font, Form, Image, Link, Script
- File conventions: `default`, dynamic routes, `error`, `forbidden`, `instrumentation`, `instrumentation-client`, intercepting routes, `layout`, `loading`, `mdx-components`, `not-found`, `page`, parallel routes, `proxy`, `public`, `route`, route groups, `src`, `template`, `unauthorized`, metadata files, route segment config
- Functions: `after`, `cacheLife`, `cacheTag`, `unstable_catchError`, `connection`, `cookies`, `draftMode`, `fetch`, `forbidden`, `generateImageMetadata`, `generateMetadata`, `generateSitemaps`, `generateStaticParams`, `generateViewport`, `headers`, `ImageResponse`, `NextRequest`, `NextResponse`, `notFound`, `permanentRedirect`, `redirect`, `refresh`, `revalidatePath`, `revalidateTag`, `unauthorized`, `unstable_cache`, `unstable_noStore`, `unstable_rethrow`, `updateTag`, `useLinkStatus`, `useParams`, `usePathname`, `useReportWebVitals`, `useRouter`, `useSearchParams`, `useSelectedLayoutSegment`, `useSelectedLayoutSegments`, `userAgent`
- Configuration: `next.config`, TypeScript, ESLint
- CLI: `create-next-app`, `next`
- Adapters
- Edge Runtime
- Turbopack

### `next.config` Option Index

- `adapterPath`
- `allowedDevOrigins`
- `appDir`
- `assetPrefix`
- `authInterrupts`
- `basePath`
- `cacheComponents`
- `cacheHandlers`
- `cacheLife`
- `compress`
- `crossOrigin`
- `cssChunking`
- `deploymentId`
- `devIndicators`
- `distDir`
- `env`
- `expireTime`
- `exportPathMap`
- `generateBuildId`
- `generateEtags`
- `headers`
- `htmlLimitedBots`
- `httpAgentOptions`
- `images`
- `cacheHandler`
- `inlineCss`
- `logging`
- `mdxRs`
- `onDemandEntries`
- `optimizePackageImports`
- `output`
- `pageExtensions`
- `poweredByHeader`
- `productionBrowserSourceMaps`
- `proxyClientMaxBodySize`
- `reactCompiler`
- `reactMaxHeadersLength`
- `reactStrictMode`
- `redirects`
- `rewrites`
- `sassOptions`
- `serverActions`
- `serverComponentsHmrCache`
- `serverExternalPackages`
- `staleTimes`
- `staticGeneration`
- `taint`
- `trailingSlash`
- `transpilePackages`
- `turbopack`
- `turbopackFileSystemCache`
- `turbopack.ignoreIssue`
- `typedRoutes`
- `typescript`
- `urlImports`
- `useLightningcss`
- `viewTransition`
- `webpack`
- `webVitalsAttribution`

## Source Links

- Next.js docs index: https://nextjs.org/docs/llms.txt
- Project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Fetching data: https://nextjs.org/docs/app/getting-started/fetching-data
- Mutating data: https://nextjs.org/docs/app/getting-started/mutating-data
- Caching: https://nextjs.org/docs/app/getting-started/caching
- Revalidating: https://nextjs.org/docs/app/getting-started/revalidating
- Error handling: https://nextjs.org/docs/app/getting-started/error-handling
- Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Proxy: https://nextjs.org/docs/app/getting-started/proxy
- Data security: https://nextjs.org/docs/app/guides/data-security
- Environment variables: https://nextjs.org/docs/app/guides/environment-variables
- Forms: https://nextjs.org/docs/app/guides/forms
- Production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Testing: https://nextjs.org/docs/app/guides/testing
- Next.js MCP: https://nextjs.org/docs/app/guides/mcp
- `next.config`: https://nextjs.org/docs/app/api-reference/config/next-config-js
