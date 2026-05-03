/**
 * @afenda-owner repo
 * @afenda-subject artifacts
 * @afenda-artifact clean
 * @afenda-boundary automation
 * @afenda-description Automation clean command for generated artifacts
 */
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const dryRun = process.argv.includes("--dry-run");

const artifactPaths = [
  ".artifacts",
  ".next",
  ".playwright-mcp",
  ".eslintcache",
  ".prettiercache",
  "coverage",
  "playwright-report",
  "test-results",
  "tsconfig.tsbuildinfo",
];

function resolveInsideRepo(relativePath) {
  const target = path.resolve(repoRoot, relativePath);
  const relativeTarget = path.relative(repoRoot, target);

  if (
    relativeTarget.startsWith("..") ||
    path.isAbsolute(relativeTarget) ||
    relativeTarget === ""
  ) {
    throw new Error(`Refusing to clean unsafe path: ${relativePath}`);
  }

  return target;
}

const existingArtifacts = artifactPaths
  .map((relativePath) => ({
    relativePath,
    target: resolveInsideRepo(relativePath),
  }))
  .filter(({ target }) => existsSync(target));

if (existingArtifacts.length === 0) {
  console.log("No generated artifacts found.");
  process.exit(0);
}

for (const { relativePath, target } of existingArtifacts) {
  if (dryRun) {
    console.log(`[dry-run] ${relativePath}`);
    continue;
  }

  rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}
