/**
 * @afenda-owner trust-surface
 * @afenda-subject check
 * @afenda-artifact automation
 * @afenda-boundary test
 * @afenda-description Test coverage for the repo trust-surface automation guard
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

describe("trust-surface automation guard", () => {
  it("passes for the current public trust surface", () => {
    const repoRoot = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../..",
    );
    const output = execFileSync(
      process.execPath,
      ["scripts/repo.trust-surface.check.automation.mjs"],
      {
        cwd: repoRoot,
        encoding: "utf8",
      },
    );

    expect(output).toContain("Trust surface check passed.");
  });
});
