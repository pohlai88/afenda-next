/**
 * @afenda-owner repo
 * @afenda-subject docs-contract
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Automation check for docs contract structure
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, "docs");
const adrRoot = path.join(docsRoot, "adr");
const atcPath = path.join(docsRoot, "atc.md");

const allowedAdrStatuses = new Set([
  "Accepted",
  "Proposed",
  "Deprecated",
  "Superseded",
]);
const requiredAdrMetadata = [
  "Date",
  "Status",
  "Owner",
  "Subject",
  "Artifact",
  "Boundary",
];
const requiredAdrSections = [
  "Context",
  "Decision",
  "Consequences",
  "Alternatives Considered",
];
const requiredAtcSections = [
  "A) System Context",
  "B) Hard Invariants",
  "C) Architecture Acceptance",
  "D) Current Feature Boundary (Explicit)",
  "E) Release/Verification Checklist",
];

const errors = [];

function read(filePath) {
  return readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

function listAdrFiles() {
  if (!existsSync(adrRoot)) {
    errors.push("docs/adr directory is required.");
    return [];
  }

  return readdirSync(adrRoot, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        entry.name !== "README.md",
    )
    .map((entry) => path.join(adrRoot, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
}

function parseAdrMetadata(markdown) {
  const metadata = new Map();

  for (const match of markdown.matchAll(/^- \*\*(.+?):\*\*\s+(.+)$/gm)) {
    metadata.set(match[1], match[2].trim());
  }

  return metadata;
}

function hasSection(markdown, section) {
  return new RegExp(`^## ${section.replace(/[()]/g, "\\$&")}$`, "m").test(
    markdown,
  );
}

function checkAdr(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = relative(filePath);
  const filenameMatch = fileName.match(
    /^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/,
  );

  if (!filenameMatch) {
    errors.push(
      `${relativePath} must follow NNNN-kebab-case-title.md ADR naming.`,
    );
    return;
  }

  const adrNumber = filenameMatch[1];
  const markdown = read(filePath);
  const h1Match = markdown.match(/^# ADR (\d{4}): (.+)$/m);

  if (!h1Match) {
    errors.push(
      `${relativePath} must start with "# ADR ${adrNumber}: <title>".`,
    );
  } else if (h1Match[1] !== adrNumber) {
    errors.push(
      `${relativePath} filename number ${adrNumber} must match heading ADR ${h1Match[1]}.`,
    );
  }

  const metadata = parseAdrMetadata(markdown);
  for (const key of requiredAdrMetadata) {
    if (!metadata.has(key)) {
      errors.push(`${relativePath} missing ADR metadata field "${key}".`);
    }
  }

  const date = metadata.get("Date");
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.push(`${relativePath} ADR Date must use YYYY-MM-DD.`);
  }

  const status = metadata.get("Status");
  if (status && !allowedAdrStatuses.has(status)) {
    errors.push(
      `${relativePath} ADR Status "${status}" must be one of ${[...allowedAdrStatuses].join(", ")}.`,
    );
  }

  if (metadata.get("Artifact") && metadata.get("Artifact") !== "ADR") {
    errors.push(`${relativePath} ADR Artifact metadata must be "ADR".`);
  }

  if (metadata.get("Boundary") && metadata.get("Boundary") !== "doc") {
    errors.push(`${relativePath} ADR Boundary metadata must be "doc".`);
  }

  for (const section of requiredAdrSections) {
    if (!hasSection(markdown, section)) {
      errors.push(
        `${relativePath} missing required ADR section "## ${section}".`,
      );
    }
  }
}

function checkAdrSequence(files) {
  const numbers = files
    .map((filePath) => path.basename(filePath).match(/^(\d{4})-/)?.[1])
    .filter(Boolean)
    .map(Number)
    .sort((a, b) => a - b);

  for (let index = 0; index < numbers.length; index += 1) {
    const expected = index + 1;
    if (numbers[index] !== expected) {
      errors.push(
        `ADR records must be contiguous from 0001. Expected ${String(expected).padStart(4, "0")} but found ${String(numbers[index]).padStart(4, "0")}.`,
      );
      return;
    }
  }
}

function checkAtc() {
  if (!existsSync(atcPath)) {
    errors.push("docs/atc.md is required.");
    return;
  }

  const markdown = read(atcPath);

  if (
    !/^# ATC — Architecture & Technical Context \(Afenda Next\)$/m.test(
      markdown,
    )
  ) {
    errors.push(
      "docs/atc.md must start with the Afenda ATC level-one heading.",
    );
  }

  if (!/^> ATC Snapshot: `\d{4}-\d{2}-\d{2}`/m.test(markdown)) {
    errors.push("docs/atc.md must include an ATC Snapshot date in YYYY-MM-DD.");
  }

  if (!/^> Scope: .+/m.test(markdown)) {
    errors.push("docs/atc.md must include a Scope line.");
  }

  for (const section of requiredAtcSections) {
    if (!hasSection(markdown, section)) {
      errors.push(`docs/atc.md missing required ATC section "## ${section}".`);
    }
  }
}

const adrFiles = listAdrFiles();
for (const filePath of adrFiles) {
  checkAdr(filePath);
}
checkAdrSequence(adrFiles);
checkAtc();

if (errors.length > 0) {
  console.error("Documentation contract check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Documentation contract check passed.");
