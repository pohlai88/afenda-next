/**
 * @afenda-owner interface-lab
 * @afenda-subject registry-preview-host
 * @afenda-boundary client
 * @afenda-description Lazy-loads generated registry previews via next/dynamic (client-only code splitting).
 */
"use client";

import dynamic from "next/dynamic";

import { interfaceLabRegistryPreviewLoaders } from "../interface-lab.registry-preview-loaders";

type InterfaceLabRegistryPreviewHostProps = {
  registryId: string;
};

const interfaceLabRegistryPreviewComponents = Object.fromEntries(
  Object.entries(interfaceLabRegistryPreviewLoaders).map(([registryId, load]) => [
    registryId,
    dynamic(load, {
      loading: () => (
        <p className="type-meta text-foreground-muted">Loading preview…</p>
      ),
    }),
  ]),
) as Record<string, ReturnType<typeof dynamic>>;

export function InterfaceLabRegistryPreviewHost({
  registryId,
}: InterfaceLabRegistryPreviewHostProps) {
  const Preview = interfaceLabRegistryPreviewComponents[registryId];

  if (Preview === undefined) {
    return (
      <p className="type-body-sm text-danger">
        Missing preview loader for registry id <span className="font-mono">{registryId}</span>.
      </p>
    );
  }

  return <Preview />;
}
