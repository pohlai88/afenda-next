/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-combo-box — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppComboBox, AppComboBoxItem } from "@/components/ui-governance/app-combo-box/app-combo-box.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppComboBox label="Preview combobox" placeholder="Pick" menuTrigger="focus"><AppComboBoxItem id="x">One</AppComboBoxItem><AppComboBoxItem id="y">Two</AppComboBoxItem></AppComboBox>
    </div>
  );
}
