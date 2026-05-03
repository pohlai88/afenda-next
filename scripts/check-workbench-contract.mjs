import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");
const globalsPath = path.join(srcRoot, "styles", "globals.css");
const appControlsPath = path.join(
  srcRoot,
  "components",
  "ui",
  "app.controls.client.tsx",
);
const workbenchShellPath = path.join(
  srcRoot,
  "features",
  "workbench",
  "client",
  "erp-workbench.page.client.tsx",
);
const workbenchComponentsPath = path.join(
  srcRoot,
  "features",
  "workbench",
  "components",
  "erp-workbench.surfaces.client.tsx",
);
const workbenchRegistryPath = path.join(
  srcRoot,
  "features",
  "workbench",
  "erp-workbench.registry.workbench.ts",
);
const workbenchTypesPath = path.join(
  srcRoot,
  "features",
  "workbench",
  "types",
  "erp-workbench.contract.shared.ts",
);
const workbenchInspectorPath = path.join(
  srcRoot,
  "features",
  "workbench",
  "components",
  "erp-workbench.inspector.client.tsx",
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

function isAllowedReactAriaBoundary(filePath) {
  const relativePath = relative(filePath);

  return (
    relativePath === "src/components/ui/app.controls.client.tsx" ||
    relativePath.startsWith("src/features/workbench/")
  );
}

const srcFiles = walk(srcRoot).filter((filePath) =>
  /\.(css|ts|tsx|js|jsx|mdx|json)$/.test(filePath),
);

const errors = [];

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
  workbenchShellPath,
  workbenchComponentsPath,
  workbenchRegistryPath,
  workbenchTypesPath,
  workbenchInspectorPath,
]) {
  if (!existsSync(requiredPath)) {
    errors.push(
      `Required workbench file "${relative(requiredPath)}" is missing.`,
    );
  }
}

const appControls = read(appControlsPath);
for (const exportedControlName of [
  "AppButton",
  "AppForm",
  "AppTextField",
  "AppSearchField",
  "AppSwitchField",
  "AppSelectField",
  "AppDialog",
  "AppTable",
  "AppTableHeader",
  "AppColumn",
  "AppTableBody",
  "AppRow",
  "AppCell",
]) {
  if (!appControls.includes(`export function ${exportedControlName}`)) {
    errors.push(
      `Shared control "${exportedControlName}" must remain exported.`,
    );
  }
}

for (const racClass of ["rac-focus-ring", "rac-disabled", "rac-invalid"]) {
  if (!appControls.includes(racClass)) {
    errors.push(
      `React Aria Tailwind plugin hook "${racClass}" is not used in app.controls.client.tsx.`,
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
  if (
    !appControls.includes(`${fieldName}`) ||
    !appControls.includes("ariaLabel")
  ) {
    errors.push(
      `${fieldName} must support the ariaLabel accessible-name escape hatch.`,
    );
  }
}

if (!appControls.includes("export function AppForm")) {
  errors.push(
    "Shared controls must export AppForm for approved form semantics.",
  );
}

if (!appControls.includes("onPress")) {
  errors.push(
    "Shared buttons must preserve the React Aria onPress interaction model.",
  );
}

const workbenchShell = read(workbenchShellPath);
for (const requiredSection of [
  "Primitives",
  "Patterns",
  "Scenes",
  "Contract Coverage",
]) {
  if (!workbenchShell.includes(requiredSection)) {
    errors.push(
      `Workbench section "${requiredSection}" is missing from the route.`,
    );
  }
}

const workbenchRegistry = read(workbenchRegistryPath);
for (const requiredField of [
  "name:",
  "category:",
  "status:",
  "sourcePath:",
  "ariaPrimitives:",
  "states:",
  "tokens:",
  "useWhen:",
  "doNotUseWhen:",
  "render:",
]) {
  if (!workbenchRegistry.includes(requiredField)) {
    errors.push(
      `Workbench registry is missing required field "${requiredField}".`,
    );
  }
}

for (const requiredWorkbenchItem of [
  "AppSearchField",
  "AppDialog",
  "AppTable",
  "ERP App Shell",
  "Procurement Approval Scene",
]) {
  if (!workbenchRegistry.includes(requiredWorkbenchItem)) {
    errors.push(
      `Workbench registry must include "${requiredWorkbenchItem}" in Phase 2.`,
    );
  }
}

const workbenchInspector = read(workbenchInspectorPath);
for (const requiredLabel of [
  "Component Inspector",
  "What is this?",
  "Use when",
  "Do not use when",
  "React Aria",
  "Source",
]) {
  if (!workbenchInspector.includes(requiredLabel)) {
    errors.push(`Workbench inspector is missing "${requiredLabel}".`);
  }
}

for (const filePath of srcFiles) {
  const content = read(filePath);
  if (
    content.includes("/ui-preview") ||
    content.includes("UI preview") ||
    content.includes("Preview index") ||
    content.includes(".preview.tsx") ||
    content.includes("preview-contract")
  ) {
    errors.push(
      `Legacy preview naming remains in ${relative(filePath)} and must be retired.`,
    );
  }
}

const blockedReactAriaImports = new Set([
  "Dialog",
  "DialogTrigger",
  "Modal",
  "ModalOverlay",
  "SearchField",
  "Table",
  "TableHeader",
  "Column",
  "TableBody",
  "Row",
  "Cell",
]);

for (const filePath of srcFiles.filter((candidate) =>
  /\.(ts|tsx)$/.test(candidate),
)) {
  if (isAllowedReactAriaBoundary(filePath)) {
    continue;
  }

  const content = read(filePath);
  const importMatches = content.matchAll(
    /import\s*{([\s\S]*?)}\s*from\s*"react-aria-components"/g,
  );

  for (const match of importMatches) {
    const importedNames = match[1]
      .split(",")
      .map((entry) => entry.replaceAll(/\s+/g, " ").trim())
      .filter(Boolean)
      .map((entry) =>
        entry
          .replace(/^type\s+/, "")
          .split(/\s+as\s+/)[0]
          ?.trim(),
      );

    const blockedNames = importedNames.filter((name) =>
      blockedReactAriaImports.has(name),
    );

    if (blockedNames.length > 0) {
      errors.push(
        `${relative(filePath)} imports blocked React Aria primitives directly: ${blockedNames.join(", ")}.`,
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
    "I18nProvider",
    "React Aria MCP",
    "PortalProvider",
    "CSP nonce",
    "Locale routing",
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

console.log("Workbench contract check passed.");
