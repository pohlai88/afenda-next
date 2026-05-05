/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-breadcrumbs — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppBreadcrumb, AppBreadcrumbs } from "@/components/ui-governance/app-breadcrumbs/app-breadcrumbs.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppBreadcrumbs><AppBreadcrumb href="/interface-studio">Lab</AppBreadcrumb><AppBreadcrumb>Preview</AppBreadcrumb></AppBreadcrumbs>
    </div>
  );
}
