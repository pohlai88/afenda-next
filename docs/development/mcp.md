# Afenda MCP Setup Notes

These notes support `AGENTS.md`. Keep the repo constitution concise; put operational MCP setup details here.

## Codex MCP Workflow

- For **Codex**, configure MCP servers in the global Codex config at `~/.codex/config.toml` or by using `codex mcp add ...`. Do **not** assume `.cursor/mcp.json` configures Codex.
- After adding or changing a Codex MCP server, verify the config with `codex mcp list` when possible.
- Codex does **not** reliably hot-load newly added MCP servers into an already running desktop session or existing thread. After MCP config changes, restart Codex Desktop and start a new thread before assuming the tools are available.
- Keep MCP server names short and descriptive so Codex can select them more reliably.
- If an MCP tool is not visible in the current session, do not pretend it is available. State that the server may be configured correctly but not yet loaded by the current Codex session.

## Config Locations

- **Codex global config:** `~/.codex/config.toml`
- **Cursor project/local config:** `.cursor/mcp.json`

## Server Selection

- `vercel` for Vercel projects, deployments, domains, docs, and platform operations exposed through the official Vercel MCP.
- `next-devtools` for Next.js diagnostics, docs, route inspection, dev-server state, and runtime error analysis.
- `playwright` for browser automation and page inspection.
- `chrome-devtools` for Chrome debugging, network inspection, performance analysis, and live browser control through DevTools.
- `react-aria` for React Aria docs and component guidance.
- `context7` for current library and framework documentation.

When starting work on this Next.js project, call the `init` tool from `next-devtools` first when that MCP is available. Use it to establish Next.js context before relying on ad hoc framework knowledge.

## Windows Codex Examples

On this Windows setup, prefer the same direct `npx.cmd` pattern used by other working local MCP servers instead of mixing launch styles unless a server proves it requires something different.

Do not force remote MCP servers into a local `npx` shape when the upstream server is meant to be connected by URL.

```toml
[mcp_servers.vercel]
url = "https://mcp.vercel.com"

[mcp_servers.next-devtools]
command = "C:\\Program Files\\nodejs\\npx.cmd"
args = ["-y", "next-devtools-mcp@latest"]
env = { SystemRoot="C:\\Windows", PROGRAMFILES="C:\\Program Files" }
startup_timeout_ms = 120000

[mcp_servers.playwright]
command = "C:\\Program Files\\nodejs\\npx.cmd"
args = ["-y", "@playwright/mcp@latest"]
startup_timeout_ms = 120000

[mcp_servers.chrome-devtools]
command = "C:\\Program Files\\nodejs\\npx.cmd"
args = ["-y", "chrome-devtools-mcp@latest"]
startup_timeout_ms = 120000
```
