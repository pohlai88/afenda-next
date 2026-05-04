/**
 * @afenda-owner interface-lab
 * @afenda-subject component-detail
 * @afenda-boundary server
 * @afenda-description Shared component detail body for full-page and intercepted modal views.
 */
import { InterfaceLabComponentDetailWorkspace } from "./interface-lab-component-detail-workspace.client";
import { InterfaceLabItemDetail } from "./interface-lab-item-detail";
import { InterfaceLabRegistryManifestAside } from "./interface-lab-registry-manifest-aside";
import { InterfaceLabRegistryPreviewHost } from "./interface-lab-registry-preview-host.client";
import type { InterfaceLabManifestExcerpt } from "../interface-lab.manifest-excerpt";
import type { InterfaceLabRouteSurface } from "../interface-lab.routes.shared";
import type { InterfaceLabItem } from "../interface-lab.types";

type InterfaceLabComponentDetailContentProps = {
  item: InterfaceLabItem;
  registryId: string | undefined;
  manifestExcerpt: InterfaceLabManifestExcerpt | null;
  routeSurface?: InterfaceLabRouteSurface;
};

export function InterfaceLabComponentDetailContent({
  item,
  registryId,
  manifestExcerpt,
  routeSurface = "lab",
}: InterfaceLabComponentDetailContentProps) {
  const previewSurface =
    registryId !== undefined ? (
      <div className="flex min-h-[420px] items-center justify-center rounded-(--radius-panel) border border-border bg-background/70 p-5">
        <InterfaceLabRegistryPreviewHost registryId={registryId} />
      </div>
    ) : (
      <div className="rounded-(--radius-panel) border border-dashed border-border bg-background/70 p-5 text-sm text-foreground-muted">
        Artboard host is not registered for this item yet.
      </div>
    );

  return (
    <InterfaceLabItemDetail
      item={item}
      routeSurface={routeSurface}
      previewEyebrow="Canvas"
      previewBody={
        <InterfaceLabComponentDetailWorkspace
          previewLabel={item.preview?.label ?? item.title}
          previewDescription={item.preview?.description ?? "Component artboard surface."}
          previewSurface={previewSurface}
          manifestExcerpt={manifestExcerpt}
          anatomy={item.studio?.anatomy ?? []}
        />
      }
      asideAppend={
        manifestExcerpt !== null ? (
          <InterfaceLabRegistryManifestAside excerpt={manifestExcerpt} />
        ) : null
      }
    />
  );
}
