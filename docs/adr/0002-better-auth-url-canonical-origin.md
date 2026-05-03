# ADR 0002: BETTER_AUTH_URL as Canonical Public Auth Origin

- **Date:** 2026-05-03
- **Status:** Accepted
- **Owner:** afenda-next platform
- **Subject:** auth
- **Artifact:** ADR
- **Boundary:** doc

## Context

Auth callback construction and redirect behavior must be deterministic across deployment targets. Inference from platform variables can be brittle in some environments, and ambiguous origin sources can produce broken OAuth return flows.

The auth config currently resolves:

1. `BETTER_AUTH_URL` when provided
2. fallback to Vercel URL in non-production contexts
3. local fallback (`http://localhost:3000`) for development

## Decision

`BETTER_AUTH_URL` is the required canonical origin in production and must be set explicitly in deployment environments that call `getAuth()`.

- Keep explicit origin behavior for production stability and predictable callback URLs.
- Keep local and preview fallbacks for development convenience.
- Keep strict runtime checks in config for production startup to catch misconfiguration early.

## Consequences

- Deployment pipelines must set `BETTER_AUTH_URL`.
- OAuth `redirectURI` and auth endpoint base origin are deterministic and auditable.
- Environment setup becomes explicit and reviewable rather than implicit.

## Alternatives Considered

- Rely solely on inferred `VERCEL_URL` or `VERCEL_PROJECT_PRODUCTION_URL`.
  - Rejected: weaker guarantees in multi-origin or custom-domain setups.

- Always require OAuth env variables and reject all non-prod values.
  - Rejected: reduced local dev ergonomics and unnecessary operational friction.
