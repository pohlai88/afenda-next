/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-disclosure-group — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";
import { AppDisclosureGroup } from "@/components/ui-governance/app-disclosure-group/app-disclosure-group.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppDisclosureGroup><AppDisclosure id="d1" title="First"><p className="type-body-sm">One</p></AppDisclosure><AppDisclosure id="d2" title="Second"><p className="type-body-sm">Two</p></AppDisclosure></AppDisclosureGroup>
    </div>
  );
}
