import { INTERFACE_STUDIO_SECTIONS } from "./interface-studio.config";
import { getInterfaceStudioItems, interfaceLabItems } from "./interface-studio.preview";
import type {
  InterfaceStudioItem,
  InterfaceStudioSection,
  InterfaceStudioTemplateKind,
} from "./interface-studio.types";

export type InterfaceStudioLibraryGroupId =
  | "screens"
  | "components"
  | "patterns"
  | "blocks"
  | "states"
  | "assets";

export type InterfaceStudioLibraryGroup = {
  id: InterfaceStudioLibraryGroupId;
  title: string;
  description: string;
  sections: InterfaceStudioSection[];
};

export const INTERFACE_STUDIO_LIBRARY_GROUPS: InterfaceStudioLibraryGroup[] = [
  {
    id: "screens",
    title: "Screens",
    description: "Launch and command artboards.",
    sections: ["landing", "dashboard"],
  },
  {
    id: "components",
    title: "Components",
    description: "Interaction primitives for composing details.",
    sections: ["components"],
  },
  {
    id: "patterns",
    title: "Patterns",
    description: "Reusable behavior and flow templates.",
    sections: ["erp-patterns"],
  },
  {
    id: "blocks",
    title: "Blocks",
    description: "Composed interface sections.",
    sections: ["blocks"],
  },
  {
    id: "states",
    title: "States",
    description: "Candidate, experimental, and exception variants.",
    sections: ["components", "blocks", "erp-patterns", "landing", "dashboard"],
  },
  {
    id: "assets",
    title: "Assets",
    description: "Narrative and preview-ready fragments.",
    sections: ["landing", "dashboard"],
  },
];

const TEMPLATE_KIND_LABELS = {
  screen: "Screens",
  component: "Components",
  pattern: "Patterns",
  block: "Blocks",
  state: "States",
  asset: "Assets",
} satisfies Record<InterfaceStudioTemplateKind, string>;

const TEMPLATE_KIND_ORDER = [
  "screen",
  "component",
  "pattern",
  "block",
  "state",
  "asset",
] as const satisfies readonly InterfaceStudioTemplateKind[];

export type InterfaceStudioStudioItemCounts = {
  total: number;
  approved: number;
  candidate: number;
  experimental: number;
  deprecated: number;
};

export function getInterfaceStudioStudioItemCounts(
  items: InterfaceStudioItem[],
): InterfaceStudioStudioItemCounts {
  return {
    total: items.length,
    approved: items.filter((item) => item.status === "approved").length,
    candidate: items.filter((item) => item.status === "candidate").length,
    experimental: items.filter((item) => item.status === "experimental").length,
    deprecated: items.filter((item) => item.status === "deprecated").length,
  };
}

export function getInterfaceStudioStudioSummary() {
  const counts = getInterfaceStudioStudioItemCounts(interfaceLabItems);

  return {
    ...counts,
    sections: INTERFACE_STUDIO_SECTIONS.length,
    governedComponents: interfaceLabItems.filter((item) => item.section === "components").length,
    workflowPreviews: interfaceLabItems.filter((item) => item.section !== "components").length,
  };
}

export function getInterfaceStudioStudioSectionSummaries() {
  return INTERFACE_STUDIO_SECTIONS.map((section) => {
    const items = getInterfaceStudioItems(section.id);

    return {
      ...section,
      counts: getInterfaceStudioStudioItemCounts(items),
    };
  });
}

export function getInterfaceStudioFocusItems(
  items: InterfaceStudioItem[] = interfaceLabItems,
  limit = 6,
) {
  return items
    .filter(
      (item) => item.status === "candidate" || item.status === "experimental",
    )
    .slice(0, limit);
}

export function getRecentInterfaceStudioItems(limit = 6) {
  return [...interfaceLabItems].slice(-limit).reverse();
}

export function getInterfaceStudioSectionByStudioPriority(section: InterfaceStudioSection) {
  return getInterfaceStudioItems(section);
}

export function getInterfaceStudioItemTemplateKind(
  item: InterfaceStudioItem,
): InterfaceStudioTemplateKind {
  if (item.studio?.templateKind !== undefined) {
    return item.studio.templateKind;
  }

  switch (item.section) {
    case "components":
      return "component";
    case "blocks":
      return "block";
    case "erp-patterns":
      return "pattern";
    case "landing":
    case "dashboard":
      return "screen";
    default: {
      const _exhaustive: never = item.section;
      return _exhaustive;
    }
  }
}

export function getInterfaceStudioTemplateGroups(
  items: InterfaceStudioItem[] = interfaceLabItems,
) {
  return TEMPLATE_KIND_ORDER.map((kind) => {
    const groupedItems = items.filter(
      (item) => getInterfaceStudioItemTemplateKind(item) === kind,
    );

    return {
      kind,
      label: TEMPLATE_KIND_LABELS[kind],
      count: groupedItems.length,
      items: groupedItems,
    };
  }).filter((group) => group.count > 0);
}

export function getInterfaceStudioLibraryGroupsWithCounts(
  items: InterfaceStudioItem[] = interfaceLabItems,
) {
  return INTERFACE_STUDIO_LIBRARY_GROUPS.map((group) => {
    const count = items.filter((item) => {
      if (group.id === "states") {
        return item.status === "candidate" || item.status === "experimental";
      }

      if (group.id === "assets") {
        return getInterfaceStudioItemTemplateKind(item) === "asset" || item.section === "landing";
      }

      return group.sections.includes(item.section);
    }).length;

    return {
      ...group,
      count,
    };
  });
}
