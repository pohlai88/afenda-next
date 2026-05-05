/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-search-autocomplete — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppSearchAutocomplete } from "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.control.primitive.client";
import { ListBox, ListBoxItem, SearchField, Input } from "react-aria-components";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppSearchAutocomplete><SearchField aria-label="Preview lookup"><Input /></SearchField><ListBox><ListBoxItem id="1">Result 1</ListBoxItem></ListBox></AppSearchAutocomplete>
    </div>
  );
}
