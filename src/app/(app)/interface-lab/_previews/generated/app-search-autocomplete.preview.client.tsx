/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-search-autocomplete — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppSearchAutocomplete } from "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.control.primitive.client";
import { ListBox, ListBoxItem, SearchField, Input } from "react-aria-components";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppSearchAutocomplete><SearchField aria-label="Preview lookup"><Input /></SearchField><ListBox><ListBoxItem id="1">Result 1</ListBoxItem></ListBox></AppSearchAutocomplete>
    </div>
  );
}
