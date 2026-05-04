import type { Route } from "next";

import type { InterfaceLabSection } from "./interface-lab.types";

export const INTERFACE_LAB_TITLE = "Interface Studio";

export const INTERFACE_LAB_DESCRIPTION =
  "Compose, remix, inspect, and export Afenda interface templates across components, blocks, patterns, screens, states, and assets.";

export const INTERFACE_LAB_SECTIONS: Array<{
  id: InterfaceLabSection;
  title: string;
  description: string;
  href: Route;
}> = [
  {
    id: "components",
    title: "Components",
    description:
      "Reusable primitives for composing interaction details.",
    href: "/interface-lab/components",
  },
  {
    id: "blocks",
    title: "Blocks",
    description: "Template-ready interface sections and reusable layout fragments.",
    href: "/interface-lab/blocks",
  },
  {
    id: "erp-patterns",
    title: "Patterns",
    description:
      "Reusable behavior, state, and flow templates.",
    href: "/interface-lab/erp-patterns",
  },
  {
    id: "landing",
    title: "Landing Screens",
    description:
      "Narrative screens and product-story artboards.",
    href: "/interface-lab/landing",
  },
  {
    id: "dashboard",
    title: "Command Screens",
    description:
      "Dense studio screens, consoles, and prototype-ready dashboards.",
    href: "/interface-lab/dashboard",
  },
];

export function getInterfaceLabSectionById(id: InterfaceLabSection) {
  return INTERFACE_LAB_SECTIONS.find((s) => s.id === id);
}

export type InterfaceLabSectionConfig = (typeof INTERFACE_LAB_SECTIONS)[number];

export function assertInterfaceLabSection(
  id: InterfaceLabSection,
): InterfaceLabSectionConfig {
  const section = getInterfaceLabSectionById(id);

  if (!section) {
    throw new Error(`Interface Lab section is not configured: ${id}`);
  }

  return section;
}
