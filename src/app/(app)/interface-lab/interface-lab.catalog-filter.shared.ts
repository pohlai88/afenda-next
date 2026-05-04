/**
 * @afenda-owner interface-lab
 * @afenda-subject catalog
 * @afenda-boundary shared
 * @afenda-description Server-side catalog filter for Interface Lab section lists (?q=).
 */
import type { InterfaceLabItem } from "./interface-lab.types";

export function normalizeCatalogQuery(raw: string | undefined): string {
  return (raw ?? "").trim().toLowerCase();
}

export function filterInterfaceLabCatalogItems(
  items: InterfaceLabItem[],
  q: string,
): InterfaceLabItem[] {
  if (q.length === 0) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.slug,
      item.category,
      item.studio?.templateKind,
      item.studio?.canvasPreset,
      item.studio?.properties?.viewport,
      item.studio?.properties?.density,
      item.studio?.properties?.motion,
      item.studio?.properties?.dataState,
      item.studio?.properties?.tokenUsage,
      item.studio?.properties?.source,
      item.studio?.properties?.exportReadiness,
      ...(item.tags ?? []),
      ...(item.studio?.remixPrompts ?? []),
      ...(item.studio?.exportTargets ?? []),
    ]
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}
