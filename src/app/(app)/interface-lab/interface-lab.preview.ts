import { buildRegistryDerivedInterfaceLabItems } from "./interface-lab.registry-catalog";
import { interfaceLabStaticItems } from "./interface-lab.static-items";
import type { InterfaceLabItem, InterfaceLabSection } from "./interface-lab.types";

const registryDerivedItems = buildRegistryDerivedInterfaceLabItems();

export const interfaceLabItems: InterfaceLabItem[] = [
  ...registryDerivedItems,
  ...interfaceLabStaticItems,
];

export function getInterfaceLabItems(section?: InterfaceLabSection) {
  if (!section) return interfaceLabItems;

  return interfaceLabItems.filter((item) => item.section === section);
}

export function getInterfaceLabItem(section: InterfaceLabSection, slug: string) {
  return interfaceLabItems.find((item) => item.section === section && item.slug === slug);
}
