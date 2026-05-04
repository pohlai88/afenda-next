/**
 * @afenda-owner repo
 * @afenda-subject css-artifact
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Build globals.css via Tailwind CLI and assert critical selectors exist in dist/output.css.
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outputPath = path.join(repoRoot, "dist", "output.css");

const NEEDLES = [
  "afenda-signal-panel",
  "animate-fade-in",
  "rac-focus-ring",
  "ring-accent-ring",
  "ring-offset-background",
];

execSync("pnpm run build:css", { stdio: "inherit", cwd: repoRoot, shell: true });

if (!existsSync(outputPath)) {
  console.error(`Missing output file: ${outputPath}`);
  process.exit(1);
}

const css = readFileSync(outputPath, "utf8");
const missing = NEEDLES.filter((n) => !css.includes(n));

if (missing.length > 0) {
  console.error(`CSS artifact missing expected substrings: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`CSS artifact OK (${NEEDLES.length} checks): dist/output.css`);
