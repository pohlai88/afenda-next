/**
 * @afenda-owner interface-lab
 * @afenda-subject route
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Coverage for interface-lab section registry, studio summaries, and generated params.
 */
import { describe, expect, it } from "vitest";

import { uiComponentRegistry } from "@/components/ui-governance/governance.ui.registry.shared";

import {
  filterInterfaceLabCatalogItems,
  normalizeCatalogQuery,
} from "../interface-lab.catalog-filter.shared";
import {
  getInterfaceLabSectionById,
  INTERFACE_LAB_SECTIONS,
} from "../interface-lab.config";
import { getInterfaceLabItems } from "../interface-lab.preview";
import {
  getInterfaceLabItemTemplateKind,
  getInterfaceLabLibraryGroupsWithCounts,
  getInterfaceLabStudioSectionSummaries,
  getInterfaceLabStudioSummary,
  getInterfaceLabTemplateGroups,
  getRecentInterfaceLabItems,
} from "../interface-lab.studio.shared";
import { getInterfaceLabStudioPromptPresets } from "../interface-lab.studio-prompts.shared";
import { getCachedInterfaceLabItem } from "../interface-lab.data";
import { buildInterfaceLabDetailMetadata } from "../interface-lab.route-metadata";
import {
  buildInterfaceLabItemHref,
  buildInterfaceLabSectionIndexHref,
  buildInterfaceLabSectionNavHref,
  buildInterfaceLabStudioHomeHref,
} from "../interface-lab.routes.shared";
import type { InterfaceLabItem, InterfaceLabSection } from "../interface-lab.types";
import * as InterfaceLabComponentsPage from "../components/[slug]/page";
import * as InterfaceLabDashboardPage from "../dashboard/[slug]/page";
import * as InterfaceLabLandingPage from "../landing/[slug]/page";

describe("interface lab route surfaces", () => {
  it("maps marketing multiplex paths for primary libraries", () => {
    expect(buildInterfaceLabStudioHomeHref("studio")).toBe("/interface-studio/screens");
    expect(buildInterfaceLabSectionIndexHref("studio", "landing")).toBe("/interface-studio/screens");
    expect(buildInterfaceLabSectionIndexHref("studio", "components")).toBe("/interface-studio/ui-components");
    expect(buildInterfaceLabSectionNavHref("studio", "landing")).toBe("/interface-studio/screens");
    expect(buildInterfaceLabItemHref("studio", "components", "button")).toBe(
      "/interface-studio/ui-components/button",
    );
    expect(buildInterfaceLabSectionNavHref("studio", "erp-patterns")).toBe("/interface-lab/erp-patterns");
  });

  it("uses canonical lab paths when surface is lab", () => {
    expect(buildInterfaceLabItemHref("lab", "components", "button")).toBe("/interface-lab/components/button");
  });

  it("sets canonical metadata for marketing detail URLs", () => {
    const item = getCachedInterfaceLabItem("components", "button");
    const meta = buildInterfaceLabDetailMetadata({
      sectionLabel: "Components",
      sectionPath: "components",
      slug: "button",
      item,
      routeSurface: "studio",
    });

    expect(meta.alternates?.canonical).toBe("/interface-studio/ui-components/button");
  });
});

describe("interface lab section registry", () => {
  it("includes landing and dashboard in section configuration", () => {
    const sectionIds = INTERFACE_LAB_SECTIONS.map((section) => section.id);

    expect(sectionIds).toContain("landing");
    expect(sectionIds).toContain("dashboard");
  });

  it("keeps landing and dashboard items attached to their section", () => {
    (["landing", "dashboard"] as const satisfies readonly InterfaceLabSection[]).forEach(
      (sectionId) => {
        const items = getInterfaceLabItems(sectionId);

        expect(items.length).toBeGreaterThan(0);
        items.forEach((item) => {
          expect(item.section).toBe(sectionId);
        });
      },
    );
  });

  it("returns undefined for unknown section lookup", () => {
    const section = getInterfaceLabSectionById("ghost" as InterfaceLabSection);
    expect(section).toBeUndefined();
  });
});

describe("interface lab dynamic route generation", () => {
  it("generates landing slugs from preview registry", async () => {
    const params = await InterfaceLabLandingPage.generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining([{ slug: "truth-engine-hero" }]),
    );
  });

  it("generates dashboard slugs from preview registry", async () => {
    const params = await InterfaceLabDashboardPage.generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining([{ slug: "operations-command-dashboard" }]),
    );
  });

  it("generates one components slug per UI governance registry entry", () => {
    const params = InterfaceLabComponentsPage.generateStaticParams();

    expect(params).toHaveLength(uiComponentRegistry.length);
    expect(params).toEqual(expect.arrayContaining([{ slug: "button" }]));
    expect(params).toEqual(expect.arrayContaining([{ slug: "search-autocomplete" }]));
  });

  it("handles missing slug metadata with graceful fallback", async () => {
    const landingMeta = await InterfaceLabLandingPage.generateMetadata({
      params: Promise.resolve({ slug: "missing-slug" }),
    });
    const dashboardMeta = await InterfaceLabDashboardPage.generateMetadata({
      params: Promise.resolve({ slug: "missing-slug" }),
    });

    expect(landingMeta.title).toBe("Landing Screens: missing-slug");
    expect(dashboardMeta.title).toBe("Command Screens: missing-slug");
  });

  it("resolves components generateMetadata for a registry slug", async () => {
    const meta = await InterfaceLabComponentsPage.generateMetadata({
      params: Promise.resolve({ slug: "button" }),
    });

    expect(meta.title).toBe("Button");
    expect(meta.description).toBeTruthy();
    expect(meta.alternates?.canonical).toBe("/interface-lab/components/button");
    expect(meta.openGraph?.title).toContain("Components");
  });

  it("falls back components generateMetadata when slug is unknown", async () => {
    const meta = await InterfaceLabComponentsPage.generateMetadata({
      params: Promise.resolve({ slug: "missing-registry-slug" }),
    });

    expect(meta.title).toBe("Components: missing-registry-slug");
    expect(meta.description).toContain("Unknown preview slug");
  });
});

describe("interface lab catalog filter", () => {
  it("normalizes catalog query strings", () => {
    expect(normalizeCatalogQuery("  Foo  ")).toBe("foo");
    expect(normalizeCatalogQuery(undefined)).toBe("");
  });

  it("filters component catalog items by substring match", () => {
    const items = [
      {
        slug: "button",
        title: "Button",
        description: "x",
        section: "components",
        status: "approved",
        category: "c",
      },
      {
        slug: "calendar",
        title: "Calendar",
        description: "x",
        section: "components",
        status: "approved",
        category: "c",
      },
    ] satisfies InterfaceLabItem[];
    const out = filterInterfaceLabCatalogItems(items, "button");
    expect(out).toHaveLength(1);
    expect(out[0]?.slug).toBe("button");
  });

  it("filters template catalog items by studio metadata", () => {
    const items = [
      {
        slug: "command-screen",
        title: "Command Screen",
        description: "x",
        section: "dashboard",
        status: "approved",
        category: "screen",
        studio: {
          templateKind: "screen",
          remixPrompts: ["Remix as a mobile command view."],
        },
      },
      {
        slug: "dialog",
        title: "Dialog",
        description: "x",
        section: "blocks",
        status: "approved",
        category: "block",
        studio: {
          templateKind: "block",
          remixPrompts: ["Remix as a desktop dialog."],
        },
      },
    ] satisfies InterfaceLabItem[];

    const out = filterInterfaceLabCatalogItems(items, "mobile");
    expect(out).toHaveLength(1);
    expect(out[0]?.slug).toBe("command-screen");
  });
});

describe("interface lab studio summaries", () => {
  it("exposes static studio prompt presets", () => {
    const prompts = getInterfaceLabStudioPromptPresets();

    expect(prompts.length).toBeGreaterThan(0);
    expect(prompts.map((prompt) => prompt.intent)).toEqual(
      expect.arrayContaining(["Compose", "Remix", "Export"]),
    );
  });

  it("returns rollup counts for the studio dashboard", () => {
    const summary = getInterfaceLabStudioSummary();

    expect(summary.total).toBeGreaterThan(0);
    expect(summary.sections).toBe(INTERFACE_LAB_SECTIONS.length);
    expect(summary.governedComponents).toBe(uiComponentRegistry.length);
  });

  it("returns per-section counts and preserved section ids", () => {
    const sectionSummaries = getInterfaceLabStudioSectionSummaries();
    const dashboardSectionSummary = sectionSummaries.find(
      (section) => section.id === "dashboard",
    );

    expect(sectionSummaries).toHaveLength(INTERFACE_LAB_SECTIONS.length);
    expect(dashboardSectionSummary?.counts.total).toBeTypeOf("number");
  });

  it("keeps studio metadata on curated preview items", () => {
    const dashboardItems = getInterfaceLabItems("dashboard");
    const dashboardItem = dashboardItems[0];

    expect(dashboardItem?.studio?.operatorValue).toBeTruthy();
    expect(dashboardItem?.studio?.templateKind).toBe("screen");
    expect(dashboardItem?.studio?.remixPrompts?.length).toBeGreaterThan(0);
    expect(dashboardItem?.studio?.properties?.viewport).toBeTruthy();
    expect(dashboardItem?.studio?.exportTargets?.length).toBeGreaterThan(0);
    expect(dashboardItem?.studio?.anatomy?.length).toBeGreaterThan(0);
    expect(dashboardItem?.studio?.evidence?.length).toBeGreaterThan(0);
  });

  it("groups templates by studio kind with fallback from section", () => {
    const items = [
      {
        slug: "x",
        title: "X",
        description: "x",
        section: "dashboard",
        status: "approved",
        category: "screen",
      },
      {
        slug: "y",
        title: "Y",
        description: "y",
        section: "components",
        status: "approved",
        category: "component",
        studio: { templateKind: "component" },
      },
    ] satisfies InterfaceLabItem[];

    const groups = getInterfaceLabTemplateGroups(items);

    expect(getInterfaceLabItemTemplateKind(items[0]!)).toBe("screen");
    expect(groups.map((group) => group.kind)).toEqual(["screen", "component"]);
  });

  it("returns library groups with studio counts", () => {
    const groups = getInterfaceLabLibraryGroupsWithCounts();

    expect(groups.map((group) => group.title)).toEqual(
      expect.arrayContaining(["Screens", "Components", "Patterns", "Blocks", "States", "Assets"]),
    );
    expect(groups.find((group) => group.id === "components")?.count).toBe(uiComponentRegistry.length);
  });

  it("returns recent items in reverse registration order", () => {
    const recentItems = getRecentInterfaceLabItems(3);

    expect(recentItems).toHaveLength(3);
    expect(recentItems[0]?.slug).toBe("operations-command-dashboard");
  });
});
