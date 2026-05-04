/**
 * @afenda-owner governance-ui
 * @afenda-subject guard
 * @afenda-artifact shared
 * @afenda-boundary test
 * @afenda-description Test coverage for shared UI governance guard and explicit manifest contracts
 */
import { describe, expect, it } from "vitest";

import { validateUiGovernance } from "@/components/ui-governance/governance.ui.guard.shared";
import { uiComponentRegistryById } from "@/components/ui-governance/governance.ui.registry.shared";

describe("validateUiGovernance", () => {
  it("passes for the registered manifests", () => {
    expect(validateUiGovernance()).toEqual([
      {
        level: "pass",
        code: "UI-GOVERNANCE-OK",
        message: "UI governance files are valid.",
      },
    ]);
  });

  it("keeps AppSearchAutocomplete explicit about composition and tokens", () => {
    const manifest = uiComponentRegistryById["app-search-autocomplete"];

    expect(manifest).toBeDefined();
    expect(manifest?.props.required).toEqual(["children"]);
    expect(manifest?.composition.requiresChildren).toBe(true);
    expect(manifest?.composition.requiredElements).toEqual([
      "SearchField|TextField as first direct child",
      "Menu|ListBox|TagGroup|GridList|Table as second direct child",
    ]);
    expect(manifest?.tokens.typography).toEqual(["--text-body", "--text-label"]);
  });
});
