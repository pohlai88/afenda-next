# `.mock`

Central **non-production** fixtures for:

- Playwright **E2E** (deterministic labels, `toHaveText` targets)
- **Interface Lab** in-app previews (`import { … } from "@mock"` in lab routes)
- **Demos** and local UI reviews

## Rules

1. **No secrets** — only fictional IDs, `.invalid` emails, and obvious mock copy.
2. **Not authoritative** — server validation, auth, and DB rows still own truth.
3. **Serializable** — prefer ISO date strings and plain objects for easy JSON reuse.
4. **Stable slugs** — avoid changing exported constants without updating dependent tests.

## Import

```ts
import { MOCK_WORKSPACE_NOTE_LATEST } from "@mock";
```

## Layout

| Path | Role |
|------|------|
| `mock.types.shared.ts` | Shared mock DTO types |
| `fixtures/*.fixture.shared.ts` | Concrete datasets |
| `index.ts` | Barrel (`@mock`) |

## Next.js + Playwright

Run the app (e.g. `webServer` in Playwright config or `pnpm dev`) and assert against UI fed by these values where routes are wired to mocks. See [Next.js: Playwright](https://nextjs.org/docs/app/guides/testing/playwright).
