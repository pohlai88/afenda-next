/**
 * @afenda-owner interface-studio
 * @afenda-subject component-detail
 * @afenda-boundary server
 * @afenda-description Shared component detail body for full-page and intercepted modal views.
 */
import { InterfaceStudioComponentDetailWorkspace } from "./interface-studio-component-detail-workspace.client";
import { InterfaceStudioItemDetail } from "./interface-studio-item-detail";
import { InterfaceStudioRegistryManifestAside } from "./interface-studio-registry-manifest-aside";
import { InterfaceStudioRegistryPreviewHost } from "./interface-studio-registry-preview-host.client";
import type { InterfaceStudioManifestExcerpt } from "../interface-studio.manifest-excerpt";
import type { InterfaceStudioRouteSurface } from "../interface-studio.routes.shared";
import type { InterfaceStudioItem } from "../interface-studio.types";

type InterfaceStudioComponentDetailContentProps = {
  item: InterfaceStudioItem;
  registryId: string | undefined;
  manifestExcerpt: InterfaceStudioManifestExcerpt | null;
  routeSurface?: InterfaceStudioRouteSurface;
};

export function InterfaceStudioComponentDetailContent({
  item,
  registryId,
  manifestExcerpt,
  routeSurface = "studio",
}: InterfaceStudioComponentDetailContentProps) {
  const previewSurface =
    registryId !== undefined ? (
      <div className="flex min-h-[420px] items-center justify-center rounded-(--radius-panel) border border-border bg-background/70 p-5">
        <InterfaceStudioRegistryPreviewHost registryId={registryId} />
      </div>
    ) : (
      <div className="rounded-(--radius-panel) border border-dashed border-border bg-background/70 p-5 text-sm text-foreground-muted">
        Artboard host is not registered for this item yet.
      </div>
    );

  return (
    <InterfaceStudioItemDetail
      item={item}
      routeSurface={routeSurface}
      previewEyebrow="Canvas"
      previewBody={
        <InterfaceStudioComponentDetailWorkspace
          previewLabel={item.preview?.label ?? item.title}
          previewDescription={item.preview?.description ?? "Component artboard surface."}
          previewSurface={previewSurface}
          manifestExcerpt={manifestExcerpt}
          anatomy={item.studio?.anatomy ?? []}
        />
      }
      asideAppend={
        manifestExcerpt !== null ? (
          <InterfaceStudioRegistryManifestAside excerpt={manifestExcerpt} />
        ) : null
      }
    />
  );
}
