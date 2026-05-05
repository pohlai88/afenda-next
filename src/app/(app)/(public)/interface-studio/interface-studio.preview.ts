import { buildRegistryDerivedInterfaceStudioItems } from "./interface-studio.registry-catalog";
import { interfaceLabStaticItems } from "./interface-studio.static-items";
import type { InterfaceStudioItem, InterfaceStudioSection } from "./interface-studio.types";

const registryDerivedItems = buildRegistryDerivedInterfaceStudioItems();

export const interfaceLabItems: InterfaceStudioItem[] = [
  ...registryDerivedItems,
  ...interfaceLabStaticItems,
];

export function getInterfaceStudioItems(section?: InterfaceStudioSection) {
  if (!section) return interfaceLabItems;

  return interfaceLabItems.filter((item) => item.section === section);
}

export function getInterfaceStudioItem(section: InterfaceStudioSection, slug: string) {
  return interfaceLabItems.find((item) => item.section === section && item.slug === slug);
}
