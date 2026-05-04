/**
 * @afenda-owner repo
 * @afenda-subject ui-governance
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Automation check for canonical shared UI primitives and explicit governance contracts
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");
const uiRoot = path.join(srcRoot, "components", "ui-governance");
const registryPath = path.join(uiRoot, "governance.ui.registry.shared.ts");
const guardPath = path.join(uiRoot, "governance.ui.guard.shared.ts");
const manifestSchemaPath = path.join(uiRoot, "governance.ui.manifest.shared.ts");
const sourceFilePattern = /\.(ts|tsx)$/;

const errors = [];
const warnings = [];

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function read(filePath) {
  return readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

function parseExportedControlName(content) {
  return content.match(/export function (App[A-Z][A-Za-z0-9]+)/)?.[1];
}

function parseManifestMetadata(content) {
  return {
    id: content.match(/id:\s*"([^"]+)"/)?.[1],
    exportName: content.match(/exportName:\s*"([^"]+)"/)?.[1],
    status: content.match(/status:\s*"([^"]+)"/)?.[1],
  };
}

function discoverAppFolders() {
  if (!existsSync(uiRoot)) return [];

  return readdirSync(uiRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("app-"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

for (const requiredPath of [manifestSchemaPath, registryPath, guardPath]) {
  if (!existsSync(requiredPath)) {
    errors.push(`Missing required governance file "${relative(requiredPath)}".`);
  }
}

const uiSourceFiles = walk(uiRoot).filter((filePath) => sourceFilePattern.test(filePath));
for (const filePath of uiSourceFiles) {
  const content = read(filePath);

  if (content.includes("@/components/ui-governance/app.controls.primitive.client")) {
    errors.push(
      `${relative(filePath)} still imports the retired flat shared UI boundary "@/components/ui-governance/app.controls.primitive.client".`,
    );
  }
}

const registrySource = existsSync(registryPath) ? read(registryPath) : "";

for (const appFolder of discoverAppFolders()) {
  const folderPath = path.join(uiRoot, appFolder);
  const clientFileName = `${appFolder}.control.primitive.client.tsx`;
  const contractFileName = `${appFolder}.contract.primitive.shared.ts`;
  const manifestFileName = `${appFolder}.ui.manifest.shared.ts`;
  const clientPath = path.join(folderPath, clientFileName);
  const contractPath = path.join(folderPath, contractFileName);
  const manifestPath = path.join(folderPath, manifestFileName);

  for (const expectedPath of [clientPath, contractPath, manifestPath]) {
    if (!existsSync(expectedPath)) {
      errors.push(
        `Canonical shared UI folder "${appFolder}" is missing "${path.basename(expectedPath)}".`,
      );
    }
  }

  const actualEntries = readdirSync(folderPath, { withFileTypes: true });
  for (const entry of actualEntries) {
    if (entry.isDirectory()) {
      errors.push(
        `Shared UI folder "${appFolder}" must stay shallow, but contains nested directory "${entry.name}".`,
      );
      continue;
    }

    if (
      entry.name !== clientFileName &&
      entry.name !== contractFileName &&
      entry.name !== manifestFileName
    ) {
      errors.push(
        `Shared UI folder "${appFolder}" contains unsupported file "${entry.name}".`,
      );
    }
  }

  if (!existsSync(clientPath) || !existsSync(contractPath) || !existsSync(manifestPath)) {
    continue;
  }

  const clientSource = read(clientPath);
  const contractSource = read(contractPath);
  const manifestSource = read(manifestPath);
  const exportedControlName = parseExportedControlName(clientSource);
  const manifestMetadata = parseManifestMetadata(manifestSource);

  if (!exportedControlName) {
    errors.push(
      `${relative(clientPath)} must export one canonical App* function.`,
    );
  }

  if (exportedControlName && !clientSource.includes(`export type ${exportedControlName}Props`)) {
    errors.push(
      `${relative(clientPath)} must export explicit ${exportedControlName}Props.`,
    );
  }

    if (
    !clientSource.includes(
      `from "@/components/ui-governance/${appFolder}/${appFolder}.contract.primitive.shared"`,
    )
  ) {
    errors.push(
      `${relative(clientPath)} must import its explicit shared contract file.`,
    );
  }

  if (
    !manifestSource.includes(`from "./${appFolder}.contract.primitive.shared"`)
  ) {
    errors.push(
      `${relative(manifestPath)} must import its explicit shared contract file.`,
    );
  }

  if (!contractSource.includes("RequiredPropNames")) {
    warnings.push(
      `${relative(contractPath)} does not declare explicit prop-name evidence yet.`,
    );
  }

  if (manifestMetadata.id !== appFolder) {
    errors.push(
      `${relative(manifestPath)} must use manifest id "${appFolder}".`,
    );
  }

  if (exportedControlName && manifestMetadata.exportName !== exportedControlName) {
    errors.push(
      `${relative(manifestPath)} exportName "${manifestMetadata.exportName ?? "unknown"}" does not match client export "${exportedControlName}".`,
    );
  }

  if (!manifestSource.includes("composition:")) {
    errors.push(
      `${relative(manifestPath)} must declare explicit composition contract data.`,
    );
  }

  if (!manifestSource.includes("tokens:")) {
    errors.push(
      `${relative(manifestPath)} must declare explicit CSS token contract data.`,
    );
  }

  const expectedRegistryPathSegment = `${appFolder}/${appFolder}.ui.manifest.shared`;
  if (!registrySource.includes(expectedRegistryPathSegment)) {
    errors.push(
      `${relative(registryPath)} must import "${expectedRegistryPathSegment}".`,
    );
  }
}

const packageJson = JSON.parse(read(path.join(repoRoot, "package.json")));
const checkScript = packageJson.scripts?.check ?? "";

if (!packageJson.scripts?.["check:ui-governance"]) {
  errors.push('package.json must define "check:ui-governance".');
}

if (!checkScript.includes("pnpm check:ui-governance")) {
  errors.push('package.json "check" script must include "pnpm check:ui-governance".');
}

if (errors.length > 0) {
  console.error("UI governance check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("UI governance check warnings:\n");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn("");
}

console.log("UI governance check passed.");
