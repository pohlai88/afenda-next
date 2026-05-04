/**
 * @afenda-owner interface-lab
 * @afenda-subject codegen
 * @afenda-boundary automation
 * @afenda-description Generates Interface Lab registry preview client modules and static preview loaders map.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { uiComponentRegistry } from "../src/components/ui-governance/governance.ui.registry.shared";
import { getRegistryPreviewSnippet } from "./interface-lab.registry-preview-snippet.automation";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const generatedDir = join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "interface-lab",
  "_previews",
  "generated",
);
const loadersPath = join(
  repoRoot,
  "src",
  "app",
  "(app)",
  "interface-lab",
  "interface-lab.registry-preview-loaders.ts",
);

function buildPreviewFile(manifestId: string, snippet: ReturnType<typeof getRegistryPreviewSnippet>): string {
  const header = `/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for ${manifestId} — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

`;

  const imports = snippet.importLines.join("\n");
  const body = snippet.body;

  return `${header}${imports}

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      ${body}
    </div>
  );
}
`;
}

function main(): void {
  mkdirSync(generatedDir, { recursive: true });

  const loaderEntries: string[] = [];

  for (const manifest of uiComponentRegistry) {
    const snippet = getRegistryPreviewSnippet(manifest);
    const fileName = `${manifest.id}.preview.client.tsx`;
    const absolutePath = join(generatedDir, fileName);
    writeFileSync(absolutePath, buildPreviewFile(manifest.id, snippet), "utf8");

    const importPath = `./_previews/generated/${manifest.id}.preview.client`;
    loaderEntries.push(
      `  "${manifest.id}": () => import("${importPath}"),`,
    );
  }

  const loadersSource = `/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Static dynamic-import map for registry previews — run pnpm interface-lab:codegen after registry changes.
 */
import type { ComponentType } from "react";

export type InterfaceLabRegistryPreviewModule = {
  default: ComponentType;
};

export const interfaceLabRegistryPreviewLoaders: Record<
  string,
  () => Promise<InterfaceLabRegistryPreviewModule>
> = {
${loaderEntries.join("\n")}
};
`;

  writeFileSync(loadersPath, loadersSource, "utf8");
}

main();
