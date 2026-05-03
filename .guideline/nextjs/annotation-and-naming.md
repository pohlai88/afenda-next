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
src/test
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
app.controls.client.tsx
erp-workbench.registry.workbench.ts
erp-workbench.page.client.tsx
erp-workbench.contract.shared.ts
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
```

Keep future enforcement changes focused. Do not mix naming hardening with feature work, domain migrations, or TypeScript strictness changes.
