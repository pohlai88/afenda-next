/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-file-trigger — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppFileTrigger } from "@/components/ui-governance/app-file-trigger/app-file-trigger.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppFileTrigger><AppButton>Choose file</AppButton></AppFileTrigger>
    </div>
  );
}
