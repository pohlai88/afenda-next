import type { Route } from "next";

import type { InterfaceStudioSection } from "./interface-studio.types";

export const INTERFACE_STUDIO_TITLE = "Interface Studio";

export const INTERFACE_STUDIO_DESCRIPTION =
  "Compose, remix, inspect, and export Afenda interface templates across components, blocks, patterns, screens, states, and assets.";

export const INTERFACE_STUDIO_SECTIONS: Array<{
  id: InterfaceStudioSection;
  title: string;
  description: string;
  href: Route;
}> = [
  {
    id: "components",
    title: "Components",
    description:
      "Reusable primitives for composing interaction details.",
    href: "/interface-studio/ui-components",
  },
  {
    id: "blocks",
    title: "Blocks",
    description: "Template-ready interface sections and reusable layout fragments.",
    href: "/interface-studio/ui-blocks",
  },
  {
    id: "erp-patterns",
    title: "Patterns",
    description:
      "Reusable behavior, state, and flow templates.",
    href: "/interface-studio/ui-dashboard",
  },
  {
    id: "landing",
    title: "Landing Screens",
    description:
      "Narrative screens and product-story artboards.",
    href: "/interface-studio/screens",
  },
  {
    id: "dashboard",
    title: "Command Screens",
    description:
      "Dense studio screens, consoles, and prototype-ready dashboards.",
    href: "/interface-studio/ui-dashboard",
  },
];

export function getInterfaceStudioSectionById(id: InterfaceStudioSection) {
  return INTERFACE_STUDIO_SECTIONS.find((s) => s.id === id);
}

export type InterfaceStudioSectionConfig = (typeof INTERFACE_STUDIO_SECTIONS)[number];

export function assertInterfaceStudioSection(
  id: InterfaceStudioSection,
): InterfaceStudioSectionConfig {
  const section = getInterfaceStudioSectionById(id);

  if (!section) {
    throw new Error(`Interface Studio section is not configured: ${id}`);
  }

  return section;
}
