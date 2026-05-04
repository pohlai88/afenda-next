# Interface Lab

## Purpose

**Interface Lab** is the reference environment for Afenda’s ERP interface system.

It is used to:

- validate UI/UX decisions
- preview approved patterns
- document interaction standards
- provide a stable reference for developers

---

## What This Is

Interface Lab is:

- a **preview environment**
- a **reference system**
- a **documentation surface**
- a **guardrail for ERP UI consistency**

---

## What This Is NOT

Interface Lab is NOT:

- an ERP module
- a backend system
- a component library
- a design system replacement
- a place to build primitives

---

## Source of Truth

Interface Lab uses the application’s live shared components and route-owned UI.
It does not maintain a parallel component registry or governance layer.

---

## Directory Structure

```
src/app/(app)/interface-lab/
  README.md
  page.tsx
  interface-lab.config.ts
  interface-lab.types.ts

  blocks/
    [slug]/
      page.tsx

  landing/
    [slug]/
      page.tsx

  components/
    [slug]/
      page.tsx

  dashboard/
    [slug]/
      page.tsx

  erp-patterns/
    [slug]/
      page.tsx
```

The `(app)` segment is a Next.js route group (shared layout); URLs are still rooted at `/interface-lab/...`.

**Preview and E2E fixtures** live in the repo-root `.mock/` package and are imported as `@mock` (see `tsconfig.json` paths). Do not add a parallel `interface-lab.data.ts`.

---

## Sections Explained

### 1. `blocks/`

High-level UI compositions.

Examples:

- dashboard layout
- analytics panel
- summary header

These show how multiple components work together.

---

### 2. `components/`

Focused UI references.

Examples:

- table
- form
- dialog
- filter bar

These are **usage examples**, not implementations.

---

### 3. `erp-patterns/`

ERP-specific interface patterns.

Examples:

- approval workflow
- procurement flow
- contract lifecycle view
- audit/evidence panel

These define **how ERP behaves**, not just how it looks.

### 4. `landing/`

Landing references for operator orientation and entry.

Examples:

- workflow handoff landing
- high-priority decision strip
- role-based onboarding orientation

These keep first-screen state and intent explicit before deep workflow interaction.

### 5. `dashboard/`

Operational dashboards where dense summaries and exception lanes are the primary surface.

Examples:

- command center view
- KPI rollup and risk strip
- pending backlog health

---

## Config (Single Source of Truth)

```
interface-lab.config.ts
```

Controls:

- navigation
- page registry
- labels
- descriptions
- grouping

### Rule

Do NOT duplicate config anywhere else.

---

## Preview & mock data (`.mock`)

Static, **non-authoritative** datasets for Interface Lab previews, demos, and Playwright live under:

```
.mock/
```

Import in lab routes or Server Components:

```ts
import { MOCK_PROCUREMENT_APPROVALS } from "@mock";
```

### Rules

- **No** API calls, database access, auth, or Server Actions inside fixtures.
- **No** secrets — only fictional IDs and obvious mock copy (see `.mock/README.md`).
- Extend **`.mock/`** and the `@mock` barrel when you need new preview rows; keep lab pages thin.

---

## Types

```
interface-lab.types.ts
```

- shared types for `interface-lab.config.ts` and lab-only shapes
- reuse or mirror `@mock` DTO types when a preview must stay aligned with E2E fixtures
- keep minimal; avoid over-abstraction

---

## Core Rules (Guardrails)

### 1. No Primitive Duplication

Do NOT create:

```
interface-lab/primitives/
interface-lab/ui/
```

Shared controls should live under `src/components/` when they are actually reused.

---

### 2. No Business Logic

Do NOT include:

- API calls
- database access
- auth logic
- server actions

---

### 3. No Over-Engineering

Avoid:

- plugin systems
- schema engines
- variant registries
- dynamic loaders

---

### 4. One Pattern = One Route

Each preview is served by the dynamic segment, e.g. `/interface-lab/erp-patterns/procurement` backed by `erp-patterns/[slug]/page.tsx`, `interface-lab.config.ts`, and fixtures from `@mock` when sample rows are needed.

Keep it simple and readable.

---

### 5. DRY Config

Do NOT repeat:

- labels
- slugs
- descriptions

Always use:

```
interface-lab.config.ts
```

---

### 6. Use Real UI Components

Do not recreate shared controls inside Interface Lab just to support previews.

---

### 7. Patterns Must Represent Reality

Every page must reflect:

- a real ERP use case
- a real interaction pattern
- a real business flow

---

## How to Add a New Pattern

### Step 1 — Build UI

Create or extend shared UI under `src/components/` only when the reuse is real.

---

### Step 2 — Register

Update `interface-lab.config.ts`.

---

### Step 3 — Create Preview Page

Use the existing section routes:

```
blocks/[slug]/page.tsx
components/[slug]/page.tsx
erp-patterns/[slug]/page.tsx
landing/[slug]/page.tsx
dashboard/[slug]/page.tsx
```

Wire the new slug through `interface-lab.config.ts` and import any preview rows from `@mock` (add fixtures under `.mock/` first if missing).

Section expansion rules:

- add the section id and label in `interface-lab.types.ts`
- register the section in `interface-lab.config.ts`
- add the section index route and `[slug]` page under `src/app/(app)/interface-lab/<section>/`

---

## Philosophy

Interface Lab follows:

- **KISS** — simple structure, minimal layers
- **DRY** — single source of truth
- **Explicit over abstract**
- **Reference over framework**

---

## Final Principle

> Interface Lab does not create the system.
> It reflects the system.

---

## Outcome

If maintained correctly, Interface Lab becomes:

- onboarding system for developers
- UI contract reference
- ERP interaction standard
- long-term architectural guardrail

---

**Keep it small.
Keep it real.
Keep it strict.**
