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
const requiredAfendaAnnotations = [
  "owner",
  "subject",
  "artifact",
  "boundary",
  "description",
];

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

function expectedBoundaryFromSuffix(relativePath) {
  if (relativePath.endsWith(".client.ts") || relativePath.endsWith(".client.tsx")) {
    return "client";
  }
  if (relativePath.endsWith(".server.ts") || relativePath.endsWith(".server.tsx")) {
    return "server";
  }
  if (relativePath.endsWith(".shared.ts") || relativePath.endsWith(".shared.tsx")) {
    return "shared";
  }
  if (
    relativePath.endsWith(".workbench.ts") ||
    relativePath.endsWith(".workbench.tsx")
  ) {
    return "workbench";
  }
  if (relativePath.endsWith(".fixture.ts")) return "fixture";
  if (relativePath.endsWith(".test.ts") || relativePath.endsWith(".test.tsx")) {
    return "test";
  }

  return undefined;
}

function readAfendaAnnotations(content) {
  const header = content.split(/\r?\n/).slice(0, 20).join("\n");
  const annotations = new Map();

  for (const match of header.matchAll(
    /@afenda-(owner|subject|artifact|boundary)\s+([a-z0-9][a-z0-9-]*)/g,
  )) {
    annotations.set(match[1], match[2]);
  }

  const descriptionMatch = header.match(/@afenda-description\s+(.+)/);
  if (descriptionMatch?.[1]) {
    annotations.set("description", descriptionMatch[1].trim());
  }

  return annotations;
}

function metadataTokens(...values) {
  return values
    .filter(Boolean)
    .flatMap((value) => value.split("-"))
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 3);
}

function checkDescriptionDrift(relativePath, annotations) {
  const description = annotations.get("description");
  if (description === undefined) return;

  if (description.length < 24 || description.length > 120) {
    errors.push(
      `${relativePath} has @afenda-description outside the 24-120 character HITL range.`,
    );
  }

  if (/[.!?]$/.test(description)) {
    errors.push(
      `${relativePath} @afenda-description must be a short label without sentence punctuation.`,
    );
  }

  const normalizedDescription = description.toLowerCase();
  const boundary = annotations.get("boundary");
  if (boundary && !normalizedDescription.includes(boundary)) {
    errors.push(
      `${relativePath} @afenda-description must mention its boundary "${boundary}" to reduce metadata drift.`,
    );
  }

  const intentTokens = metadataTokens(
    annotations.get("subject"),
    annotations.get("artifact"),
  );

  if (
    intentTokens.length > 0 &&
    !intentTokens.some((token) => normalizedDescription.includes(token))
  ) {
    errors.push(
      `${relativePath} @afenda-description must mention the subject or artifact metadata to reduce drift.`,
    );
  }
}

function isClientBoundaryFile(relativePath) {
  return relativePath.endsWith(".client.ts") || relativePath.endsWith(".client.tsx");
}

function isServerRuntimeBoundaryFile(relativePath) {
  return relativePath.endsWith(".server.ts");
}

function isSharedBoundaryFile(relativePath) {
  return relativePath.endsWith(".shared.ts") || relativePath.endsWith(".shared.tsx");
}

function isFixtureBoundaryFile(relativePath) {
  return relativePath.endsWith(".fixture.ts");
}

function isWorkbenchBoundaryFile(relativePath) {
  return relativePath.endsWith(".workbench.ts") || relativePath.endsWith(".workbench.tsx");
}

function isTestSourceFile(relativePath) {
  return (
    relativePath.includes("/__tests__/") ||
    relativePath.startsWith("src/test/") ||
    relativePath.endsWith(".test.ts") ||
    relativePath.endsWith(".test.tsx")
  );
}

function findRuntimeNeutralityMarkers(content) {
  const markers = [];

  if (hasUseClientDirective(content)) markers.push('"use client"');
  if (hasServerOnlyImport(content)) markers.push('import "server-only"');
  if (content.includes("@/server/")) markers.push("@/server/**");
  if (content.includes("@/client-runtime/")) markers.push("@/client-runtime/**");
  if (content.includes("@/trpc/trpc.server")) markers.push("@/trpc/trpc.server");
  if (content.includes("@/trpc/trpc.react.client")) {
    markers.push("@/trpc/trpc.react.client");
  }
  if (content.includes("next/headers")) markers.push("next/headers");
  if (content.includes("better-auth/react")) markers.push("better-auth/react");
  if (content.includes("process.env")) markers.push("process.env");

  return markers;
}

function findWorkbenchRuntimeMarkers(content) {
  return findRuntimeNeutralityMarkers(content).filter(
    (marker) => marker !== '"use client"',
  );
}

function checkTestImports() {
  const sourceFiles = walk(srcRoot).filter((filePath) =>
    sourceFilePattern.test(filePath),
  );

  for (const filePath of sourceFiles) {
    const relativePath = relative(filePath);
    const content = read(filePath);
    if (!content.includes("@/test/")) continue;
    if (isTestSourceFile(relativePath)) continue;

    errors.push(
      `${relativePath} imports @/test/**. Test helpers are only allowed from __tests__ files or src/test.`,
    );
  }
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

    const content = read(filePath);
    const annotations = readAfendaAnnotations(content);

    for (const annotation of requiredAfendaAnnotations) {
      if (!annotations.has(annotation)) {
        errors.push(
          `${relativePath} must include @afenda-${annotation} in its source annotation header.`,
        );
      }
    }

    const expectedBoundary = expectedBoundaryFromSuffix(relativePath);
    const annotatedBoundary = annotations.get("boundary");
    if (
      expectedBoundary !== undefined &&
      annotatedBoundary !== undefined &&
      annotatedBoundary !== expectedBoundary
    ) {
      errors.push(
        `${relativePath} has @afenda-boundary ${annotatedBoundary}, but its filename requires ${expectedBoundary}.`,
      );
    }

    checkDescriptionDrift(relativePath, annotations);

    if (isClientBoundaryFile(relativePath)) {
      if (!hasUseClientDirective(content)) {
        errors.push(
          `${relativePath} is a client file and must include "use client".`,
        );
      }

      if (hasServerOnlyImport(content)) {
        errors.push(
          `${relativePath} is a client file and must not import "server-only".`,
        );
      }
    }

    if (
      isServerRuntimeBoundaryFile(relativePath) &&
      !hasServerOnlyImport(content)
    ) {
      errors.push(
        `${relativePath} is a .server.ts runtime file and must import "server-only". Use .shared.ts for runtime-neutral contracts or types.`,
      );
    }

    if (isSharedBoundaryFile(relativePath)) {
      const markers = findRuntimeNeutralityMarkers(content);
      if (markers.length > 0) {
        errors.push(
          `${relativePath} is shared and must stay runtime-neutral. Remove: ${markers.join(", ")}.`,
        );
      }
    }

    if (isFixtureBoundaryFile(relativePath)) {
      const markers = findRuntimeNeutralityMarkers(content);
      if (markers.length > 0) {
        errors.push(
          `${relativePath} is a fixture and must stay runtime-neutral. Remove: ${markers.join(", ")}.`,
        );
      }
    }

    if (isWorkbenchBoundaryFile(relativePath)) {
      const markers = findWorkbenchRuntimeMarkers(content);
      if (markers.length > 0) {
        errors.push(
          `${relativePath} is workbench-only and must not touch privileged runtime bindings. Remove: ${markers.join(", ")}.`,
        );
      }
    }
  }
}

checkSrcRootShape();
checkAppRouteShape();
checkClientServerImports();
checkServerOnlyMarkers();
checkBetterAuthReactBoundary();
checkTestImports();
checkFileNaming();

if (errors.length > 0) {
  console.error("Architecture boundary check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Architecture boundary check passed.");
