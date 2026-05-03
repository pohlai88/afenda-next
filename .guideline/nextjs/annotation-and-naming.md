# Afenda Annotation And Naming

Use this guideline for source boundary naming and file-name intent. It is an anti-drift contract, not a broad refactor mandate.

## Core Distinction

`"use client"` is the React and Next.js client module graph marker.

`src/client-runtime` is Afenda's global browser runtime wiring boundary.

These are not the same thing. Feature-owned Client Components remain inside the feature that owns the workflow.

## Source Roots

Approved `src` roots:

```txt
src/app
src/client-runtime
src/components
src/features
src/server
src/styles
src/test-runtime
src/trpc
```

`src/client-runtime` is limited to global browser runtime integration:

```txt
global providers
browser runtime state
client auth binding
theme/provider wiring
analytics/bootstrap wiring, if approved later
```

Do not place these in `src/client-runtime`:

```txt
feature screens
feature Client Components
workflow widgets
forms
tables
dialogs
route-specific client UI
shared UI primitives
generic helpers
```

Feature-owned Client Components belong under `src/features/**` or route-local `src/app/**/_components/**`, depending on ownership.

## Naming Doctrine

Preferred file naming formula:

```txt
<owner>.<subject>.<artifact>.<boundary>.<ext>
```

Examples:

```txt
app.controls.primitive.client.tsx
erp-runtime-workbench.route.surface.client.tsx
erp-workbench.runtime.contract.shared.ts
auth.oauth.provider.shared.ts
procurement.purchase-request.policy.server.ts
procurement.approval-queue.table.client.tsx
```

Boundary suffixes:

```txt
.server.ts
.server.tsx
.client.ts
.client.tsx
.shared.ts
.shared.tsx
.workbench.ts
.workbench.tsx
.fixture.ts
.test.ts
.test.tsx
```

Avoid vague names:

```txt
utils
helpers
common
data
types
service
manager
index
```

Use role-specific names instead, such as `contract.shared.ts`, `fixture.ts`, `query.server.ts`, or `table.client.tsx`.

## Annotation Doctrine

Annotation must be executable or enforceable. Do not add decorative boundary comments that drift from behavior.

Use these annotations:

```ts
/**
 * @afenda-owner procurement
 * @afenda-subject purchase-request
 * @afenda-artifact policy
 * @afenda-boundary server
 * @afenda-description Server policy for procurement purchase requests
 */
```

```txt
"use client"              React/Next.js Client Component or browser module boundary.
import "server-only"      privileged server runtime boundary.
.client.ts/.client.tsx    browser or Client Component source file.
.server.ts                server runtime source file.
.server.tsx               Server Component source file; add server-only only when it touches privileged runtime APIs.
.shared.ts/.shared.tsx    runtime-neutral contract, type, schema, or pure helper.
.workbench.ts/.tsx        workbench-only visual contract or registry source.
.fixture.ts               deterministic test/demo data.
.test.ts/.test.tsx        test-only source.
runtime                  Playwright browser runtime boundary under e2e.
automation               Root repo automation boundary under scripts.
```

Every non-route source file under `src` must include the five `@afenda-*` annotations near the top of the file. Official App Router convention files such as `page.tsx`, `layout.tsx`, and `route.ts` are exempt because the framework filename is the annotation.

Every TypeScript file under `e2e` must also include the five `@afenda-*` annotations and use one of these explicit Playwright runtime filename shapes:

```txt
<owner>.<subject>.<artifact>.runtime.spec.ts
<owner>.<subject>.<artifact>.runtime.ts
```

Every automation file under `scripts` must include the five `@afenda-*` annotations and use this filename shape:

```txt
repo.<subject>.<artifact>.automation.mjs
```

Description rules:

```txt
@afenda-description is for short HITL scanning.
Use one line only.
Use 24-120 characters.
Do not end with sentence punctuation.
Mention the boundary word, such as client, server, shared, fixture, workbench, test, runtime, or automation.
Mention at least one subject or artifact token so the checker can catch obvious drift.
```

Client annotations:

```txt
Every .client.ts or .client.tsx file must start with "use client".
Client files must not import @/server/**.
Client files must not import server-only.
```

Server annotations:

```txt
Every .server.ts file must import "server-only".
Server runtime modules that touch env, DB, auth, cookies, headers, secrets, or tRPC context must import "server-only".
Do not use .server.ts for pure contracts or type-only files; use .shared.ts instead.
```

Shared annotations:

```txt
Shared files must stay runtime-neutral.
Shared files must not contain "use client", import "server-only", import @/server/**, import @/client-runtime/**, or import tRPC client/server runtime bindings.
```

Fixture annotations:

```txt
Fixture files are deterministic test/demo data.
Fixture files must stay runtime-neutral like shared files.
Fixture files may be imported by workbench or tests, but not by privileged server runtime as production seed truth.
```

Workbench annotations:

```txt
Workbench files are visual-contract and registry sources only.
Workbench files must not import @/server/**, @/client-runtime/**, tRPC runtime bindings, Better Auth runtime bindings, next/headers, or process.env.
Workbench files may import approved UI primitives, workbench client surfaces, fixture data, and shared contracts.
```

Test annotations:

```txt
Test files and src/test-runtime helpers are test-only.
Production source must not import @/test-runtime/**.
Only files under __tests__ or src/test-runtime may import @/test-runtime/**.
```

Runtime annotations:

```txt
Runtime files live under e2e and execute through Playwright in a real browser.
Runtime specs must end with .runtime.spec.ts.
Runtime helpers must end with .runtime.ts.
Runtime files must not be imported by production src code.
```

Automation annotations:

```txt
Automation files live under scripts and operate on repo structure, generated artifacts, or validation gates.
Automation files must end with .automation.mjs.
Automation files must not contain product runtime logic, ERP domain behavior, or feature implementation.
```

Route files are the exception to boundary suffix naming. Keep official App Router convention files as `page.tsx`, `layout.tsx`, `route.ts`, and related framework names.

## Enforcement Status

Current enforcement covers:

```txt
src/client-runtime is the only global browser runtime root.
src/client is rejected.
better-auth/react is limited to the approved client runtime boundary.
"use client" files must not import runtime server modules.
strict file naming formula
banned vague filenames
boundary suffix coverage
client files require "use client"
server runtime files require import "server-only"
shared files remain runtime-neutral
fixture files remain runtime-neutral
workbench files stay out of privileged runtime bindings
@/test imports stay inside tests and test helpers
non-route source files include @afenda owner, subject, artifact, boundary, and description headers
@afenda-boundary must match the filename boundary suffix
@afenda-description is required, length-limited, and checked against boundary and intent metadata
e2e files use the runtime boundary and explicit Playwright runtime filenames
scripts files use the automation boundary and explicit repo automation filenames
```

Keep future enforcement changes focused. Do not mix naming hardening with feature work, domain migrations, or TypeScript strictness changes.
