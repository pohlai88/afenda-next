# Tailwind CSS v4 (Afenda)

## Browser floor

Tailwind CSS v4 targets modern browsers only. Plan operator and support expectations around at least:

- **Chrome** 111+
- **Safari** 16.4+
- **Firefox** 128+

v4 relies on modern CSS (for example `@property`, `color-mix()`, and theme colors often expressed as `oklch()`). Older browsers are out of scope unless the product explicitly stays on Tailwind v3.4 or adds separate fallback styling.

Official reference: [Tailwind CSS — Compatibility](https://tailwindcss.com/docs/compatibility) and [Upgrade guide — browser requirements](https://tailwindcss.com/docs/upgrade-guide).

## How Afenda builds CSS

- **Normal dev and production:** Next.js compiles `src/styles/globals.css` through PostCSS (`@tailwindcss/postcss`). Use `pnpm dev` and `pnpm build`.
- **Optional CLI artifact:** `pnpm run build:css` runs `pnpm exec tailwindcss` (from `@tailwindcss/cli`) to emit `dist/output.css` for grep, snapshots, or CI. The `dist/` directory is gitignored.

## Deterministic check (repo)

```bash
pnpm run check:css-artifact
```

This runs `build:css` then asserts that key substrings exist in `dist/output.css`: signal panel, animation utility, RAC focus ring, and ring theme utilities (see `scripts/repo.css-artifact.check.automation.mjs` for the exact list).

## Determinism & Context7 (Tailwind v4)

**Agent workflow:** When validating Tailwind **v4** behavior (class detection, `@source`, `@source inline`, `@import … source()`, CLI, browser support, `@apply` in CSS modules with `@reference`, important modifier placement, etc.), use the **Context7** MCP before treating answers as authoritative:

1. `resolve-library-id` with `libraryName: "Tailwind CSS"` and a concrete `query`.
2. `query-docs` with `libraryId: "/tailwindlabs/tailwindcss.com"` (official docs index).

Pair Context7 with this doc and `pnpm run check:css-artifact` / `pnpm run build:css` so **documentation** and **compiled output** both agree.

**What official v4 docs emphasize for stable output (Context7 summary):**

- **Automatic content detection** uses heuristics and respects `.gitignore` so dependencies and generated trees are not scanned by mistake ([Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files)).
- **`@source`** adds explicit scan roots when auto-detection misses a path (e.g. UI packages under `node_modules`, extra templates) ([Functions & directives — `@source`](https://tailwindcss.com/docs/functions-and-directives#source-directive)).
- **`@import "tailwindcss" source("../src")`** sets the base path for detection when the build CWD is not the project root ([Detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)).
- **`@import "tailwindcss" source(none)`** plus explicit `@source` lines gives fully manual control when you need strict per-stylesheet isolation.
- **`@source inline("…")`** safelists utilities that are built dynamically or never appear as plain strings in scanned files ([Detecting classes — safelist](https://tailwindcss.com/docs/detecting-classes-in-source-files)). Afenda uses it for `animate-fade-in` / `animate-pop` so `pnpm run check:css-artifact` and greps against `dist/output.css` stay stable even when those classes are not yet referenced from TSX.

## Dark mode variant

Class and `data-theme` toggles on the document root are documented in `globals.css`. The `@custom-variant dark` rule intentionally follows (and extends) the selector-based pattern from [Tailwind — Dark mode](https://tailwindcss.com/docs/dark-mode) so `dark:` utilities apply to descendants, not only the root node.

## Form controls: `field-control` vs explicit `@apply`

- **Current Afenda choice:** use **explicit** theme-backed utilities on inputs, for example  
  `@apply w-full rounded-control px-3 py-2 text-body-sm;` plus `background` / `border` / `color` from CSS variables. This avoids a second abstraction and stays aligned with `@theme inline` tokens.
- **Optional pattern:** if you want `@apply field-control` site-wide, define a single **`@utility field-control { ... }`** in `globals.css` using only tokens that exist in `@theme` (do not reference undefined `--control-padding-*` variables). Then `@apply field-control` is valid.

## Plugin debugging

If generated utilities look wrong after a Tailwind upgrade, temporarily comment `@plugin "tailwindcss-react-aria-components";` in `globals.css`, rebuild, and compare. Re-enable once the cause is identified.

## VS Code / Cursor

Workspace settings live under `.vscode/settings.json`. They associate `*.css` with the Tailwind language mode, set `tailwindCSS.includeLanguages` and `tailwindCSS.emmetCompletions`, and turn **format on save off for `css` and `tailwindcss`** so large `@theme` / `@utility` regions in `globals.css` do not pick up noisy whitespace-only Prettier diffs. JS/TS still use the default formatter with format on save.
