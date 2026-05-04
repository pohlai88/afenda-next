/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-autocomplete — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppAutocomplete } from "@/components/ui-governance/app-autocomplete/app-autocomplete.control.primitive.client";
import { ListBox, ListBoxItem, SearchField, Input } from "react-aria-components";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppAutocomplete><SearchField aria-label="Preview autocomplete"><Input /></SearchField><ListBox><ListBoxItem>Alpha</ListBoxItem><ListBoxItem>Beta</ListBoxItem></ListBox></AppAutocomplete>
    </div>
  );
}
