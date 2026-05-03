/**
 * @afenda-owner repo
 * @afenda-subject workbench-contract
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Automation check for the active ERP runtime workbench contract
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");
const globalsPath = path.join(srcRoot, "styles", "globals.css");
const appControlsPath = path.join(
  srcRoot,
  "components",
  "ui",
  "app.controls.primitive.client.tsx",
);
const componentsIndexPath = path.join(
  srcRoot,
  "components",
  "ui",
  "components.json",
);
const manifestsApprovedPath = path.join(
  srcRoot,
  "components",
  "ui",
  "app.approval-ledger.manifests.shared.ts",
);
const workbenchRoutePath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "page.tsx",
);
const workbenchSurfacePath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "_components",
  "erp-runtime-workbench.route.surface.client.tsx",
);
const workbenchScenesPath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "_components",
  "erp-workbench.runtime.scenes.client.tsx",
);
const workbenchContractPath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "_components",
  "erp-workbench.runtime.contract.shared.ts",
);
const workbenchDataPath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "_components",
  "erp-workbench.runtime.data.fixture.ts",
);
const workbenchProofBuilderPath = path.join(
  srcRoot,
  "app",
  "(app)",
  "erp-workbench",
  "_components",
  "erp-workbench.runtime.contract-proof.shared.ts",
);

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function read(filePath) {
  return readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function isAllowedReactAriaBoundary(filePath) {
  return (
    relative(filePath) === "src/components/ui/app.controls.primitive.client.tsx"
  );
}

function parseBoundaryExports(content) {
  return [...content.matchAll(/export function (App[A-Z][A-Za-z0-9]+)/g)].map(
    (match) => match[1],
  );
}

function parseImportList(content, moduleName) {
  const imports = [];
  const matches = content.matchAll(
    new RegExp(
      `import\\s*{([\\s\\S]*?)}\\s*from\\s*["']${moduleName.replaceAll("/", "\\/")}["']`,
      "g",
    ),
  );

  for (const match of matches) {
    imports.push(
      ...match[1]
        .split(",")
        .map((entry) => entry.replaceAll(/\s+/g, " ").trim())
        .filter(Boolean)
        .map((entry) => entry.replace(/^type\s+/, "").split(/\s+as\s+/)[0]?.trim()),
    );
  }

  return imports;
}

function parseManifestMetadata(filePath) {
  const content = read(filePath);
  const fields = {
    id: content.match(/id:\s*"([^"]+)"/)?.[1],
    exportName: content.match(/exportName:\s*"([^"]+)"/)?.[1],
    status: content.match(/status:\s*"([^"]+)"/)?.[1],
    demoState: content.match(/demoState:\s*"([^"]+)"/)?.[1],
  };

  return {
    ...fields,
    filePath,
    content,
    isValid:
      fields.id !== undefined &&
      fields.exportName !== undefined &&
      fields.status !== undefined &&
      fields.demoState !== undefined,
  };
}

const srcFiles = walk(srcRoot).filter((filePath) =>
  /\.(css|ts|tsx|js|jsx|mdx|json)$/.test(filePath),
);

const errors = [];
const warnings = [];

for (const filePath of srcFiles) {
  if (filePath === globalsPath) continue;
  const content = read(filePath);
  if (content.includes("--palette-")) {
    errors.push(
      `Raw palette token referenced outside globals.css in ${relative(filePath)}.`,
    );
  }
}

for (const requiredPath of [
  appControlsPath,
  componentsIndexPath,
  manifestsApprovedPath,
  workbenchRoutePath,
  workbenchSurfacePath,
  workbenchScenesPath,
  workbenchContractPath,
  workbenchDataPath,
  workbenchProofBuilderPath,
]) {
  if (!existsSync(requiredPath)) {
    errors.push(`Required workbench file "${relative(requiredPath)}" is missing.`);
  }
}

const appControls = read(appControlsPath);
const boundaryExports = parseBoundaryExports(appControls);

for (const exportedControlName of boundaryExports) {
  if (!appControls.includes(`export function ${exportedControlName}`)) {
    errors.push(`Shared control "${exportedControlName}" must remain exported.`);
  }
}

for (const racClass of ["rac-focus-ring", "rac-disabled", "rac-invalid"]) {
  if (!appControls.includes(racClass)) {
    errors.push(
      `React Aria Tailwind plugin hook "${racClass}" is not used in app.controls.primitive.client.tsx.`,
    );
  }
}

if (!appControls.includes("FieldError")) {
  errors.push(
    "Shared controls must use React Aria FieldError for field error semantics.",
  );
}

if (!appControls.includes('slot="description"')) {
  errors.push(
    'Shared controls must use React Aria Text slot="description" for field descriptions.',
  );
}

for (const fieldName of ["AppTextField", "AppSelectField"]) {
  if (!appControls.includes(`${fieldName}`) || !appControls.includes("ariaLabel")) {
    errors.push(
      `${fieldName} must support the ariaLabel accessible-name escape hatch.`,
    );
  }
}

if (!appControls.includes("export function AppForm")) {
  errors.push("Shared controls must export AppForm for approved form semantics.");
}

if (!appControls.includes("onPress")) {
  errors.push("Shared buttons must preserve the React Aria onPress interaction model.");
}

let indexedComponents = [];
if (!existsSync(componentsIndexPath)) {
  errors.push(`Shared UI inventory "${relative(componentsIndexPath)}" is missing.`);
} else {
  try {
    const parsedIndex = readJson(componentsIndexPath);
    indexedComponents = Array.isArray(parsedIndex.components)
      ? parsedIndex.components
      : [];

    if (parsedIndex.version !== 1) {
      errors.push(`Shared UI inventory "${relative(componentsIndexPath)}" must use version 1.`);
    }
  } catch (error) {
    errors.push(
      `Shared UI inventory "${relative(componentsIndexPath)}" failed to parse: ${String(error)}.`,
    );
  }
}

const manifestEntries = [];
const seenIndexIds = new Set();

for (const component of indexedComponents) {
  if (typeof component?.id !== "string" || typeof component?.manifest !== "string") {
    errors.push(
      `Shared UI inventory entry must include string id and manifest fields in "${relative(componentsIndexPath)}".`,
    );
    continue;
  }

  if (seenIndexIds.has(component.id)) {
    errors.push(`Shared UI inventory contains duplicate id "${component.id}".`);
    continue;
  }

  seenIndexIds.add(component.id);

  const manifestPath = path.resolve(path.dirname(componentsIndexPath), component.manifest);
  if (!existsSync(manifestPath)) {
    errors.push(
      `Shared UI inventory entry "${component.id}" points to missing manifest "${component.manifest}".`,
    );
    continue;
  }

  const manifestMetadata = parseManifestMetadata(manifestPath);
  if (!manifestMetadata.isValid) {
    errors.push(`Manifest "${relative(manifestPath)}" is missing required ledger fields.`);
    continue;
  }

  if (manifestMetadata.id !== component.id) {
    errors.push(
      `Shared UI inventory id "${component.id}" does not match manifest id "${manifestMetadata.id}" in "${relative(manifestPath)}".`,
    );
  }

  manifestEntries.push({
    component,
    manifestPath,
    manifestMetadata,
  });
}

const manifestExports = new Set(
  manifestEntries.map((entry) => entry.manifestMetadata.exportName),
);

for (const entry of manifestEntries) {
  if (!boundaryExports.includes(entry.manifestMetadata.exportName)) {
    errors.push(
      `Manifest "${relative(entry.manifestPath)}" references missing shared export "${entry.manifestMetadata.exportName}".`,
    );
  }
}

for (const exportedControlName of boundaryExports) {
  if (!manifestExports.has(exportedControlName)) {
    errors.push(
      `Shared control "${exportedControlName}" must have an approval manifest and inventory entry.`,
    );
  }
}

const manifestsApproved = existsSync(manifestsApprovedPath)
  ? read(manifestsApprovedPath)
  : "";

for (const entry of manifestEntries) {
  const manifestModulePath = entry.component.manifest.replace(/\.ts$/, "");
  const isWired = manifestsApproved.includes(manifestModulePath);

  if (entry.manifestMetadata.status === "approved" && !isWired) {
    errors.push(
      `Approved manifest "${entry.manifestMetadata.exportName}" is missing Contracts proof wiring in "${relative(manifestsApprovedPath)}".`,
    );
  }

  if (entry.manifestMetadata.demoState === "available" && !isWired) {
    warnings.push(
      `Available manifest "${entry.manifestMetadata.exportName}" is not wired into "${relative(manifestsApprovedPath)}".`,
    );
  }
}

const workbenchRoute = read(workbenchRoutePath);
for (const requiredPhrase of [
  "getSession",
  "redirect(",
  'callbackUrl: "/erp-workbench"',
  "getErpRuntimeWorkbenchData()",
]) {
  if (!workbenchRoute.includes(requiredPhrase)) {
    errors.push(`Workbench route is missing "${requiredPhrase}".`);
  }
}

const workbenchSurface = read(workbenchSurfacePath);
for (const requiredPhrase of [
  "ERP Runtime Workbench modes",
  "Afenda preview environment",
  "Overview",
  "Contracts",
  "Methods",
  "Procurement",
  "contractProofItems",
]) {
  if (!workbenchSurface.includes(requiredPhrase)) {
    errors.push(`Workbench surface is missing "${requiredPhrase}".`);
  }
}

const workbenchScenes = read(workbenchScenesPath);
for (const requiredPhrase of [
  "Runtime overview",
  "Shared UI approval ledger",
  "Operator method preview",
  "Procurement preview",
  "Current context",
  "Selected request",
  "Approve Request",
  "Reject Request",
  "Approval ledger details",
  "Accessibility notes",
  "Use when",
  "Avoid when",
]) {
  if (!workbenchScenes.includes(requiredPhrase)) {
    errors.push(`Workbench scenes are missing "${requiredPhrase}".`);
  }
}

const workbenchContract = read(workbenchContractPath);
for (const requiredType of [
  "WorkbenchModeId",
  "WorkbenchPreviewItem",
  "WorkbenchContractProofItem",
  "WorkbenchProcurementRow",
  "ErpRuntimeWorkbenchData",
]) {
  if (!workbenchContract.includes(`export type ${requiredType}`)) {
    errors.push(`Workbench contract is missing "${requiredType}".`);
  }
}

const workbenchData = read(workbenchDataPath);
for (const requiredPhrase of [
  "ERP Runtime Workbench",
  "buildContractsWorkbenchPreviewItems",
  "buildContractsWorkbenchProofItems",
  "contractProofItems",
  "app-tabs",
  "Ledger entries",
  "Queue review method",
  "Inspector method",
  "Evidence method",
  "Decision method",
  "pending-review-lane",
  "policy-hold-lane",
  "full-queue-lane",
]) {
  if (!workbenchData.includes(requiredPhrase)) {
    errors.push(`Workbench data fixture is missing "${requiredPhrase}".`);
  }
}

const workbenchProofBuilder = read(workbenchProofBuilderPath);
for (const requiredPhrase of [
  "sharedUiComponentManifests",
  "buildContractsWorkbenchPreviewItems",
  "buildContractsWorkbenchProofItems",
  'modeId: "contracts"',
  "Approved component",
]) {
  if (!workbenchProofBuilder.includes(requiredPhrase)) {
    errors.push(`Workbench proof builder is missing "${requiredPhrase}".`);
  }
}

for (const filePath of srcFiles) {
  const content = read(filePath);
  if (
    content.includes("/ui-preview") ||
    content.includes("UI preview") ||
    content.includes("Preview index") ||
    content.includes(".preview.tsx") ||
    content.includes("preview-contract") ||
    content.includes("src/features/workbench") ||
    content.includes("erp-workbench.page.surface.client") ||
    content.includes("erp-workbench.catalog.registry.workbench") ||
    content.includes("erp-workbench.inspector.panel.client")
  ) {
    errors.push(
      `Legacy preview naming remains in ${relative(filePath)} and must be retired.`,
    );
  }
}

for (const filePath of srcFiles.filter((candidate) =>
  /\.(ts|tsx)$/.test(candidate),
)) {
  if (isAllowedReactAriaBoundary(filePath)) {
    continue;
  }

  const content = read(filePath);

  if (content.includes('from "react-aria-components"')) {
    const importedNames = parseImportList(content, "react-aria-components");
    warnings.push(
      `${relative(filePath)} imports react-aria-components directly outside the shared boundary: ${importedNames.join(", ") || "unknown symbols"}.`,
    );
  }
}

for (const filePath of srcFiles.filter((candidate) =>
  /\.(ts|tsx)$/.test(candidate),
)) {
  if (
    filePath === appControlsPath ||
    filePath.includes("__tests__") ||
    filePath.includes("test-runtime") ||
    filePath.includes(`${path.sep}manifests${path.sep}`) ||
    filePath === manifestsApprovedPath
  ) {
    continue;
  }

  const content = read(filePath);
  const importedSymbols = [
    ...parseImportList(content, "@/components/ui/app.controls.primitive.client"),
    ...parseImportList(content, "./app.controls.primitive.client"),
    ...parseImportList(content, "../app.controls.primitive.client"),
  ].filter((name) => name?.startsWith("App"));

  for (const importedSymbol of importedSymbols) {
    if (!manifestExports.has(importedSymbol)) {
      warnings.push(
        `${relative(filePath)} imports unledgered shared control "${importedSymbol}".`,
      );
    }
  }
}

const activeBaselinePath = path.join(
  repoRoot,
  ".guideline",
  "react-aria",
  "10.working-with-ai.md",
);
if (existsSync(activeBaselinePath)) {
  const baselineContent = read(activeBaselinePath);
  for (const requiredPhrase of [
    "Next.js App Router",
    "ClientI18nProvider",
    "React Aria MCP",
    "PortalProvider",
    "CSP nonce",
    "Locale routing",
    "/erp-workbench",
  ]) {
    if (!baselineContent.includes(requiredPhrase)) {
      errors.push(
        `Active React Aria baseline note must mention "${requiredPhrase}".`,
      );
    }
  }
}

const packageJson = JSON.parse(read(path.join(repoRoot, "package.json")));
const checkScript = packageJson.scripts?.check ?? "";
const formatCheckScript = packageJson.scripts?.["format:check"] ?? "";
const testScript = packageJson.scripts?.test ?? "";

if (!checkScript.includes("pnpm format:check")) {
  errors.push('package.json "check" script must include "pnpm format:check".');
}

if (!checkScript.includes("pnpm check:workbench-contract")) {
  errors.push(
    'package.json "check" script must include "pnpm check:workbench-contract".',
  );
}

if (!checkScript.includes("pnpm test")) {
  errors.push('package.json "check" script must include "pnpm test".');
}

if (!packageJson.devDependencies?.["prettier-plugin-tailwindcss"]) {
  errors.push(
    "prettier-plugin-tailwindcss must remain installed in devDependencies.",
  );
}

for (const devDependency of [
  "@react-aria/test-utils",
  "@testing-library/react",
  "@testing-library/user-event",
  "jsdom",
  "vitest",
]) {
  if (!packageJson.devDependencies?.[devDependency]) {
    errors.push(`Missing required test dependency "${devDependency}".`);
  }
}

if (!formatCheckScript.includes("prettier --check")) {
  errors.push('package.json "format:check" script must run prettier --check.');
}

if (!testScript.includes("vitest --run")) {
  errors.push('package.json "test" script must run "vitest --run".');
}

if (errors.length > 0) {
  console.error("Workbench contract check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("Workbench contract warnings:\n");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn("");
}

console.log("Workbench contract check passed.");
