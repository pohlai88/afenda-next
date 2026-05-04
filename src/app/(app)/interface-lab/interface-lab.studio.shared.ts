import { INTERFACE_LAB_SECTIONS } from "./interface-lab.config";
import { getInterfaceLabItems, interfaceLabItems } from "./interface-lab.preview";
import type {
  InterfaceLabItem,
  InterfaceLabSection,
  InterfaceLabTemplateKind,
} from "./interface-lab.types";

export type InterfaceLabLibraryGroupId =
  | "screens"
  | "components"
  | "patterns"
  | "blocks"
  | "states"
  | "assets";

export type InterfaceLabLibraryGroup = {
  id: InterfaceLabLibraryGroupId;
  title: string;
  description: string;
  sections: InterfaceLabSection[];
};

export const INTERFACE_LAB_LIBRARY_GROUPS: InterfaceLabLibraryGroup[] = [
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
} satisfies Record<InterfaceLabTemplateKind, string>;

const TEMPLATE_KIND_ORDER = [
  "screen",
  "component",
  "pattern",
  "block",
  "state",
  "asset",
] as const satisfies readonly InterfaceLabTemplateKind[];

export type InterfaceLabStudioItemCounts = {
  total: number;
  approved: number;
  candidate: number;
  experimental: number;
  deprecated: number;
};

export function getInterfaceLabStudioItemCounts(
  items: InterfaceLabItem[],
): InterfaceLabStudioItemCounts {
  return {
    total: items.length,
    approved: items.filter((item) => item.status === "approved").length,
    candidate: items.filter((item) => item.status === "candidate").length,
    experimental: items.filter((item) => item.status === "experimental").length,
    deprecated: items.filter((item) => item.status === "deprecated").length,
  };
}

export function getInterfaceLabStudioSummary() {
  const counts = getInterfaceLabStudioItemCounts(interfaceLabItems);

  return {
    ...counts,
    sections: INTERFACE_LAB_SECTIONS.length,
    governedComponents: interfaceLabItems.filter((item) => item.section === "components").length,
    workflowPreviews: interfaceLabItems.filter((item) => item.section !== "components").length,
  };
}

export function getInterfaceLabStudioSectionSummaries() {
  return INTERFACE_LAB_SECTIONS.map((section) => {
    const items = getInterfaceLabItems(section.id);

    return {
      ...section,
      counts: getInterfaceLabStudioItemCounts(items),
    };
  });
}

export function getInterfaceLabFocusItems(
  items: InterfaceLabItem[] = interfaceLabItems,
  limit = 6,
) {
  return items
    .filter(
      (item) => item.status === "candidate" || item.status === "experimental",
    )
    .slice(0, limit);
}

export function getRecentInterfaceLabItems(limit = 6) {
  return [...interfaceLabItems].slice(-limit).reverse();
}

export function getInterfaceLabSectionByStudioPriority(section: InterfaceLabSection) {
  return getInterfaceLabItems(section);
}

export function getInterfaceLabItemTemplateKind(
  item: InterfaceLabItem,
): InterfaceLabTemplateKind {
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

export function getInterfaceLabTemplateGroups(
  items: InterfaceLabItem[] = interfaceLabItems,
) {
  return TEMPLATE_KIND_ORDER.map((kind) => {
    const groupedItems = items.filter(
      (item) => getInterfaceLabItemTemplateKind(item) === kind,
    );

    return {
      kind,
      label: TEMPLATE_KIND_LABELS[kind],
      count: groupedItems.length,
      items: groupedItems,
    };
  }).filter((group) => group.count > 0);
}

export function getInterfaceLabLibraryGroupsWithCounts(
  items: InterfaceLabItem[] = interfaceLabItems,
) {
  return INTERFACE_LAB_LIBRARY_GROUPS.map((group) => {
    const count = items.filter((item) => {
      if (group.id === "states") {
        return item.status === "candidate" || item.status === "experimental";
      }

      if (group.id === "assets") {
        return getInterfaceLabItemTemplateKind(item) === "asset" || item.section === "landing";
      }

      return group.sections.includes(item.section);
    }).length;

    return {
      ...group,
      count,
    };
  });
}
