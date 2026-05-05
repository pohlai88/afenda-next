/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-number-field — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { Group, Input, Label } from "react-aria-components";
import { AppNumberField } from "@/components/ui-governance/app-number-field/app-number-field.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppNumberField aria-label="Preview amount" defaultValue={1}><Group className="flex items-center gap-2"><Label>Qty</Label><Input className="border-border bg-field rounded-(--radius-control) border px-2 py-1" /></Group></AppNumberField>
    </div>
  );
}
