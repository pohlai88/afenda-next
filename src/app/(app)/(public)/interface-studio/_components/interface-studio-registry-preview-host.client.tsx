"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import { interfaceStudioRegistryPreviewLoaders } from "../interface-studio.registry-preview-loaders";

type InterfaceStudioRegistryPreviewHostProps = {
  registryId: string;
};

export function InterfaceStudioRegistryPreviewHost({
  registryId,
}: InterfaceStudioRegistryPreviewHostProps) {
  const loader = interfaceStudioRegistryPreviewLoaders[registryId];

  const Preview = useMemo(() => {
    if (!loader) {
      return null;
    }

    return dynamic(loader, {
      ssr: false,
      loading: () => (
        <p className="text-sm text-foreground-muted">Loading preview…</p>
      ),
    });
  }, [loader]);

  if (!Preview) {
    return (
      <p className="text-sm text-foreground-muted">
        No registered preview renderer for <code>{registryId}</code>.
      </p>
    );
  }

  return <Preview />;
}
