# Better Auth — repo guidance

## Offline index

- **`llmx.txt`** — Better Auth doc index (paths mirror upstream `llms.txt`). Use for quick lookup locally; live docs: [better-auth.com](https://www.better-auth.com/docs/introduction).

## Cursor — documentation MCP (validated)

The **Better Auth MCP** (`https://mcp.better-auth.com/mcp`) is listed in [`.cursor/mcp.json`](../../.cursor/mcp.json). Some agent sessions cannot load MCP servers; use [Better Auth docs](https://www.better-auth.com/docs/introduction) and this repo’s **`src/server/better-auth/auth.config.adapter.server.ts`** + **`/sign-in`** route as the source of truth.

This repo wires the **remote docs MCP** (search, examples, setup help). It is **not** the [Better Auth MCP *plugin*](https://www.better-auth.com/docs/plugins/mcp) for OAuth into your app.

**Config file (canonical for Cursor):** [`.cursor/mcp.json`](../../.cursor/mcp.json)

Required shape:

```json
{
  "mcpServers": {
    "better-auth": {
      "url": "https://mcp.better-auth.com/mcp"
    }
  }
}
```

**Checks:**

1. JSON parses; `mcpServers.better-auth.url` is exactly `https://mcp.better-auth.com/mcp`.
2. After edits: **Cursor Settings → MCP → reload**, or restart Cursor (MCP may not hot-load).

## Better Auth CLI — MCP targets

From repo root (or anywhere), using Node / npx:

```bash
npx auth@latest mcp
```

- **`--cursor`** — opens Cursor with a deeplink to add the MCP server (still verify `.cursor/mcp.json` matches the shape above).
- **`--manual`** — writes or merges a **`mcp.json` in the current working directory** with a **flat** `{ "better-auth": { "url": "..." } }` shape. That file is **not** what Cursor reads; do not replace `.cursor/mcp.json` with it.
- Other flags (upstream): `--claude-code`, `--open-code`.

## In-app auth surface (this repo)

- **Server config:** [`src/server/better-auth/auth.config.adapter.server.ts`](../../src/server/better-auth/auth.config.adapter.server.ts) — Drizzle, `nextCookies()`, email/password, GitHub / Google / LinkedIn when canonical `BETTER_AUTH_*` credentials exist.
- **HTTP handler:** [`src/app/api/auth/[...all]/route.ts`](../../src/app/api/auth/[...all]/route.ts).
- **Sign-in / register UI:** [`src/app/(app)/sign-in/`](../../src/app/(app)/sign-in/) — `authClient.signIn.email`, `signUp.email`, `signIn.social` ([basic usage](https://www.better-auth.com/docs/basic-usage)). Optional `?callbackUrl=` (same-origin path only; see `safeInternalPath`).
- **ERP workbench:** session required. Playwright coverage must authenticate through the real Better Auth sign-in flow.

## Init (wizard vs this repo)

The app is already wired: [`src/server/better-auth/auth.config.adapter.server.ts`](../../src/server/better-auth/auth.config.adapter.server.ts) (Drizzle + OAuth + **`nextCookies()`**), [`src/app/api/auth/[...all]/route.ts`](../../src/app/api/auth/[...all]/route.ts), and the client in [`src/client-runtime/auth/client-runtime.auth.adapter.client.ts`](../../src/client-runtime/auth/client-runtime.auth.adapter.client.ts).

**Interactive plugin wizard** (add 2FA, admin, etc.):

```bash
pnpm auth:init
```

Use **Yes → database → Drizzle/Postgres** when prompted so it aligns with this stack. The CLI may not resolve config while `import "server-only"` is present in imported modules; temporarily remove it from `src/server/better-auth/auth.config.adapter.server.ts` (and any direct import that pulls it in) only if the wizard fails to load.

**Schema:** `pnpm dlx auth@latest generate -y --config ./src/server/better-auth/auth.config.adapter.server.ts` (see upstream [CLI](https://www.better-auth.com/docs/concepts/cli)).

## Runtime contract in this app

Validated secrets and URLs for the Next.js app are defined in **`src/env.js`** (e.g. `BETTER_AUTH_URL`, `DATABASE_URL`). See **[`AGENTS.md`](../../AGENTS.md)** and [`docs/adr/0002-better-auth-url-canonical-origin.md`](../../docs/adr/0002-better-auth-url-canonical-origin.md).
