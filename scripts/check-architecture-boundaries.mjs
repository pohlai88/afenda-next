import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");
const appRoot = path.join(srcRoot, "app");
const serverRoot = path.join(srcRoot, "server");
const trpcServerPath = path.join(srcRoot, "trpc", "trpc.server.ts");

const sourceFilePattern = /\.(ts|tsx|js|jsx)$/;
const allowedSrcDirectories = new Set([
  "app",
  "client-runtime",
  "components",
  "features",
  "server",
  "styles",
  "test",
  "trpc",
]);
const allowedSrcRootFiles = new Set(["env.js"]);
const allowedPrivateRouteFolders = new Set([
  "_actions",
  "_components",
  "_queries",
  "__tests__",
]);
const allowedAppSpecialFiles = new Set([
  "default",
  "error",
  "forbidden",
  "global-error",
  "layout",
  "loading",
  "not-found",
  "page",
  "route",
  "template",
  "unauthorized",
]);
const allowedMetadataFiles = new Set([
  "apple-icon",
  "favicon",
  "icon",
  "manifest",
  "opengraph-image",
  "robots",
  "sitemap",
  "twitter-image",
]);
const serverOnlyExemptions = new Set(["src/server/db/db.schema.shared.ts"]);
const betterAuthReactAllowlist = new Set([
  "src/client-runtime/auth/auth.client.ts",
]);
const allowedBoundarySuffixes = [
  ".server.ts",
  ".server.tsx",
  ".client.ts",
  ".client.tsx",
  ".shared.ts",
  ".shared.tsx",
  ".workbench.ts",
  ".workbench.tsx",
  ".fixture.ts",
  ".test.ts",
  ".test.tsx",
];
const bannedGenericBasenames = new Set([
  "utils",
  "helpers",
  "common",
  "data",
  "types",
  "service",
  "manager",
  "index",
]);

const errors = [];

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
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

function appSegments(filePath) {
  return path.relative(appRoot, filePath).split(path.sep);
}

function isWithinAllowedPrivateFolder(filePath) {
  return appSegments(filePath)
    .slice(0, -1)
    .some((segment) => allowedPrivateRouteFolders.has(segment));
}

function isWithinTestFolder(filePath) {
  return appSegments(filePath)
    .slice(0, -1)
    .some((segment) => segment === "__tests__");
}

function isPrivateFolder(segment) {
  return segment.startsWith("_");
}

function isRouteGroupOrSpecialSegment(segment) {
  return (
    (segment.startsWith("(") && segment.endsWith(")")) ||
    segment.startsWith("@")
  );
}

function isAllowedAppFile(filePath) {
  const parsed = path.parse(filePath);
  const basename = parsed.name;

  return (
    allowedAppSpecialFiles.has(basename) ||
    allowedMetadataFiles.has(basename) ||
    /^sitemap\d+$/.test(basename) ||
    /^icon\d+$/.test(basename) ||
    /^apple-icon\d+$/.test(basename)
  );
}

function hasUseClientDirective(content) {
  return /^\s*["']use client["'];/m.test(content);
}

function isTypeOnlyImportClause(clause) {
  const trimmed = clause.trim();
  if (trimmed.startsWith("type ")) return true;

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .every((entry) => entry.startsWith("type "));
  }

  return false;
}

function findRuntimeServerImports(content) {
  const imports = [];

  for (const line of content.split(/\r?\n/)) {
    const fromImportMatch = line.match(
      /^\s*import\s+(.+?)\s+from\s+["'](@\/server\/[^"']+)["'];?/,
    );
    if (fromImportMatch) {
      const statement = fromImportMatch[0] ?? "";
      if (
        !statement.trimStart().startsWith("import type") &&
        !isTypeOnlyImportClause(fromImportMatch[1] ?? "")
      ) {
        imports.push(fromImportMatch[2]);
      }
      continue;
    }

    const sideEffectImportMatch = line.match(
      /^\s*import\s+["'](@\/server\/[^"']+)["'];?/,
    );
    if (sideEffectImportMatch) {
      imports.push(sideEffectImportMatch[1]);
    }
  }

  return imports;
}

function hasServerOnlyImport(content) {
  return /import\s+["']server-only["'];/.test(content);
}

function requiresServerOnly(filePath, content) {
  const relativePath = relative(filePath);
  if (serverOnlyExemptions.has(relativePath)) return false;

  if (relativePath === "src/trpc/trpc.server.ts") return true;
  if (relativePath.startsWith("src/server/api/")) return true;
  if (relativePath.startsWith("src/server/better-auth/")) return true;
  if (relativePath === "src/server/db/db.server.ts") return true;

  return [
    "@/env",
    "process.env",
    "next/headers",
    "better-auth",
    "drizzle-orm/postgres-js",
    "postgres",
    "initTRPC",
    "createTRPCRouter",
  ].some((marker) => content.includes(marker));
}

function checkSrcRootShape() {
  if (!existsSync(srcRoot)) return;

  const entries = readdirSync(srcRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name === "client") {
      errors.push(
        "src/client is not allowed. Use src/client-runtime for global browser runtime wiring; feature Client Components stay in src/features or route-local _components.",
      );
      continue;
    }

    if (entry.isDirectory() && !allowedSrcDirectories.has(entry.name)) {
      errors.push(
        `src/${entry.name} is not an approved source root. Approved roots are ${[...allowedSrcDirectories].join(", ")}.`,
      );
      continue;
    }

    if (entry.isFile() && !allowedSrcRootFiles.has(entry.name)) {
      errors.push(
        `src/${entry.name} is not an approved source-root file. Keep root-level source files explicit and documented.`,
      );
    }
  }
}

function checkAppRouteShape() {
  const appFiles = walk(appRoot).filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of appFiles) {
    const relativePath = relative(filePath);

    if (isWithinAllowedPrivateFolder(filePath) || isWithinTestFolder(filePath)) {
      continue;
    }

    if (!isAllowedAppFile(filePath)) {
      errors.push(
        `${relativePath} is a route-folder helper file. Move it into _components, _actions, _queries, or an approved non-route boundary.`,
      );
    }
  }

  const appDirectories = readdirSync(appRoot, {
    recursive: true,
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory());

  for (const entry of appDirectories) {
    if (!isPrivateFolder(entry.name)) continue;
    if (allowedPrivateRouteFolders.has(entry.name)) continue;
    if (isRouteGroupOrSpecialSegment(entry.name)) continue;

    errors.push(
      `src/app contains private folder "${entry.name}". Allowed route-local private folders are _components, _actions, and _queries.`,
    );
  }
}

function checkClientServerImports() {
  const sourceFiles = walk(srcRoot).filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of sourceFiles) {
    const content = read(filePath);
    if (!hasUseClientDirective(content)) continue;

    const runtimeImports = findRuntimeServerImports(content);
    for (const importPath of runtimeImports) {
      errors.push(
        `${relative(filePath)} is marked "use client" and imports runtime server module "${importPath}".`,
      );
    }
  }
}

function checkServerOnlyMarkers() {
  const serverFiles = [...walk(serverRoot), trpcServerPath].filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of serverFiles) {
    if (!existsSync(filePath)) continue;

    const content = read(filePath);
    if (content.includes("better-auth/react")) {
      errors.push(
        `${relative(filePath)} imports better-auth/react. Client-facing Better Auth helpers must live under src/client-runtime/auth or be explicitly allowlisted.`,
      );
    }

    if (requiresServerOnly(filePath, content) && !hasServerOnlyImport(content)) {
      errors.push(
        `${relative(filePath)} touches server runtime infrastructure and must import "server-only".`,
      );
    }
  }
}

function checkBetterAuthReactBoundary() {
  const sourceFiles = walk(srcRoot).filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of sourceFiles) {
    const relativePath = relative(filePath);
    if (betterAuthReactAllowlist.has(relativePath)) continue;

    const content = read(filePath);
    if (content.includes("better-auth/react")) {
      errors.push(
        `${relativePath} imports better-auth/react. Client-facing Better Auth helpers must live under src/client-runtime/auth or be explicitly allowlisted.`,
      );
    }
  }
}

function isRouteConventionFile(filePath) {
  const relativePath = relative(filePath);
  if (!relativePath.startsWith("src/app/")) return false;
  if (isWithinAllowedPrivateFolder(filePath) || isWithinTestFolder(filePath)) {
    return false;
  }

  return isAllowedAppFile(filePath);
}

function hasAllowedBoundarySuffix(relativePath) {
  return allowedBoundarySuffixes.some((suffix) => relativePath.endsWith(suffix));
}

function checkFileNaming() {
  const sourceFiles = walk(srcRoot).filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of sourceFiles) {
    const relativePath = relative(filePath);
    if (allowedSrcRootFiles.has(path.basename(filePath))) continue;
    if (isRouteConventionFile(filePath)) continue;

    const basename = path.parse(filePath).name;
    if (bannedGenericBasenames.has(basename)) {
      errors.push(
        `${relativePath} uses vague filename "${basename}". Use an owner.subject.artifact.boundary name instead.`,
      );
    }

    if (!hasAllowedBoundarySuffix(relativePath)) {
      errors.push(
        `${relativePath} must end with one approved boundary suffix: ${allowedBoundarySuffixes.join(", ")}.`,
      );
    }

    if (
      (relativePath.endsWith(".client.ts") ||
        relativePath.endsWith(".client.tsx")) &&
      !hasUseClientDirective(read(filePath))
    ) {
      errors.push(`${relativePath} is a client file and must include "use client".`);
    }
  }
}

checkSrcRootShape();
checkAppRouteShape();
checkClientServerImports();
checkServerOnlyMarkers();
checkBetterAuthReactBoundary();
checkFileNaming();

if (errors.length > 0) {
  console.error("Architecture boundary check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Architecture boundary check passed.");
