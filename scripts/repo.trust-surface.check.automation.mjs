/**
 * @afenda-owner repo
 * @afenda-subject trust-surface
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Automation check for live public trust surfaces and guarded assurance claims
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const packageJsonPath = path.join(repoRoot, "package.json");
const trustDataPath = path.join(
  repoRoot,
  "src",
  "features",
  "public-trust",
  "public-trust.content.data.fixture.ts",
);
const declarationFooterPath = path.join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "(public)",
  "(marketing)",
  "(declaration-docs)",
  "footer",
  "declaration-footer.content.shared.ts",
);
const declarationDataPath = path.join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "(public)",
  "(marketing)",
  "(declaration-docs)",
  "declaration-documents.data.shared.ts",
);
const sitemapPath = path.join(repoRoot, "src", "app", "sitemap.ts");
const trustRoutePath = path.join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "(public)",
  "(marketing)",
  "trust",
  "page.tsx",
);
const disclosureRoutePath = path.join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "(public)",
  "(marketing)",
  "(declaration-docs)",
  "security",
  "disclosure",
  "page.tsx",
);
const securityTxtRoutePath = path.join(
  repoRoot,
  "src",
  "app",
  ".well-known",
  "security.txt",
  "route.ts",
);

const errors = [];

function read(filePath) {
  return readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

function requireFile(filePath) {
  if (!existsSync(filePath)) {
    errors.push(`Missing required trust surface file "${relative(filePath)}".`);
  }
}

function sliceBetween(source, startToken, endToken) {
  const startIndex = source.indexOf(startToken);
  if (startIndex === -1) return "";

  const endIndex = source.indexOf(endToken, startIndex);
  if (endIndex === -1) return "";

  return source.slice(startIndex, endIndex + endToken.length);
}

function findObjectBlock(source, anchor) {
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex === -1) return "";

  const objectStart = source.lastIndexOf("{", anchorIndex);
  if (objectStart === -1) return "";

  let depth = 0;
  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];
    if (character === "{") depth += 1;
    if (character === "}") depth -= 1;

    if (depth === 0) {
      return source.slice(objectStart, index + 1);
    }
  }

  return "";
}

function hasNegatingContext(line) {
  return /\b(no|not|does not|do not|without|until|withheld|remains withheld)\b/i.test(
    line,
  );
}

function checkUnsupportedClaims(filePath) {
  const source = read(filePath);
  const patterns = [
    {
      label: "SOC 2 claim",
      regex: /\bSOC\s*2\b/i,
    },
    {
      label: "ISO 27001 claim",
      regex: /\bISO\s*27001\b/i,
    },
    {
      label: "uptime percentage claim",
      regex: /\b99(?:\.\d+)?%\b/,
    },
    {
      label: "SLA availability claim",
      regex: /\b(?:uptime|availability)\s+SLA\b/i,
    },
  ];

  for (const [lineNumber, line] of source.split(/\r?\n/).entries()) {
    if (/^\s*(id|route|href):/.test(line)) {
      continue;
    }

    for (const pattern of patterns) {
      if (pattern.regex.test(line) && !hasNegatingContext(line)) {
        errors.push(
          `${relative(filePath)} line ${lineNumber + 1} contains an unsupported ${pattern.label}.`,
        );
      }
    }
  }
}

for (const requiredPath of [
  packageJsonPath,
  trustDataPath,
  declarationFooterPath,
  declarationDataPath,
  sitemapPath,
  trustRoutePath,
  disclosureRoutePath,
  securityTxtRoutePath,
]) {
  requireFile(requiredPath);
}

const packageJson = existsSync(packageJsonPath)
  ? JSON.parse(read(packageJsonPath))
  : { scripts: {} };
const trustSource = existsSync(trustDataPath) ? read(trustDataPath) : "";
const declarationFooterSource = existsSync(declarationFooterPath)
  ? read(declarationFooterPath)
  : "";
const declarationSource = existsSync(declarationDataPath)
  ? read(declarationDataPath)
  : "";
const sitemapSource = existsSync(sitemapPath) ? read(sitemapPath) : "";

if (!packageJson.scripts?.["check:trust-surface"]) {
  errors.push('package.json must define "check:trust-surface".');
}

if (!(packageJson.scripts?.check ?? "").includes("pnpm check:trust-surface")) {
  errors.push('package.json "check" must include "pnpm check:trust-surface".');
}

const footerBlock = sliceBetween(
  declarationFooterSource,
  "export const declarationFooterLinks = [",
  "] satisfies readonly DeclarationRelatedLink[];",
);
if (!footerBlock) {
  errors.push(
    "declaration-footer.content.shared.ts must expose declarationFooterLinks as a concrete array.",
  );
}
if (
  !trustSource.includes("publicTrustFooterLinks") ||
  !trustSource.includes("securityDisclosureLink") ||
  !trustSource.includes("trustRouteLink") ||
  !trustSource.includes("from \"@/app/(app)/(public)/(marketing)/(declaration-docs)/footer\"")
) {
  errors.push(
    "public-trust fixture must re-export publicTrustFooterLinks and related trust footer aliases.",
  );
}

const indexableRoutesBlock = sliceBetween(
  trustSource,
  "export const publicTrustIndexableRoutes = [",
  "] as const;",
);

if (
  !footerBlock.includes('href: "/trust"') &&
  !footerBlock.includes("trustRouteLink")
) {
  errors.push(
    "publicTrustFooterLinks must promote /trust as a live footer route.",
  );
}

if (footerBlock.includes('href: "/security/disclosure"')) {
  errors.push(
    "/security/disclosure must not be promoted as a primary footer route.",
  );
}

if (
  !indexableRoutesBlock.includes('"/trust"') ||
  !sitemapSource.includes("publicTrustIndexableRoutes")
) {
  errors.push("sitemap.ts must include /trust.");
}

if (
  !indexableRoutesBlock.includes('"/security/disclosure"') ||
  !sitemapSource.includes("publicTrustIndexableRoutes")
) {
  errors.push("sitemap.ts must include /security/disclosure.");
}

const gatedSurfaceRules = [
  {
    route: "/status",
    expectedState: "planned",
    activationRuleId: "TRUST-STATUS-001",
    disallowedRoutePath: path.join(
      repoRoot,
      "src",
      "app",
      "(app)",
      "(public)",
      "(marketing)",
      "status",
      "page.tsx",
    ),
  },
  {
    route: "/subprocessors",
    expectedState: "withheld",
    activationRuleId: "TRUST-SUBPROC-001",
    disallowedRoutePath: path.join(
      repoRoot,
      "src",
      "app",
      "(app)",
      "(public)",
      "(marketing)",
      "subprocessors",
      "page.tsx",
    ),
  },
  {
    route: "/data-processing-addendum",
    expectedState: "withheld",
    activationRuleId: "TRUST-DPA-001",
    disallowedRoutePath: path.join(
      repoRoot,
      "src",
      "app",
      "(app)",
      "(public)",
      "(marketing)",
      "data-processing-addendum",
      "page.tsx",
    ),
  },
  {
    route: "/cookies",
    expectedState: "withheld",
    activationRuleId: "TRUST-COOKIE-001",
    disallowedRoutePath: path.join(
      repoRoot,
      "src",
      "app",
      "(app)",
      "(public)",
      "(marketing)",
      "cookies",
      "page.tsx",
    ),
  },
];

for (const gatedSurface of gatedSurfaceRules) {
  if (footerBlock.includes(`href: "${gatedSurface.route}"`)) {
    errors.push(
      `${gatedSurface.route} must stay out of publicTrustFooterLinks.`,
    );
  }

  if (indexableRoutesBlock.includes(`"${gatedSurface.route}"`)) {
    errors.push(
      `${gatedSurface.route} must stay out of sitemap.ts until activated.`,
    );
  }

  if (existsSync(gatedSurface.disallowedRoutePath)) {
    errors.push(
      `${relative(gatedSurface.disallowedRoutePath)} exists even though ${gatedSurface.route} is gated.`,
    );
  }

  const surfaceBlock = findObjectBlock(
    trustSource,
    `route: "${gatedSurface.route}"`,
  );
  if (!surfaceBlock) {
    errors.push(
      `public trust data must define a surface record for ${gatedSurface.route}.`,
    );
    continue;
  }

  if (!surfaceBlock.includes(`state: "${gatedSurface.expectedState}"`)) {
    errors.push(
      `${gatedSurface.route} must remain in ${gatedSurface.expectedState} state inside trustSurfaceDefinition.`,
    );
  }

  if (!surfaceBlock.includes("isPublicLink: false")) {
    errors.push(
      `${gatedSurface.route} must remain non-linkable in trustSurfaceDefinition.`,
    );
  }

  if (
    !surfaceBlock.includes(
      `activationRuleId: "${gatedSurface.activationRuleId}"`,
    )
  ) {
    errors.push(
      `${gatedSurface.route} must declare activation rule ${gatedSurface.activationRuleId}.`,
    );
  }
}

for (const activationRuleId of [
  "TRUST-STATUS-001",
  "TRUST-SUBPROC-001",
  "TRUST-DPA-001",
  "TRUST-COOKIE-001",
  "TRUST-CLAIM-001",
]) {
  if (!trustSource.includes(`id: "${activationRuleId}"`)) {
    errors.push(
      `public trust data must expose activation rule ${activationRuleId}.`,
    );
  }
}

checkUnsupportedClaims(trustDataPath);
checkUnsupportedClaims(declarationDataPath);

if (!declarationSource.includes('slug: "security/disclosure"')) {
  errors.push("declaration data must expose the security/disclosure document.");
}

if (errors.length > 0) {
  console.error("Trust surface check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Trust surface check passed.");
