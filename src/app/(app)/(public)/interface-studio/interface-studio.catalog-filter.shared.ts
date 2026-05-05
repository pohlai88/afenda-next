/**
 * @afenda-owner interface-studio
 * @afenda-subject catalog
 * @afenda-boundary shared
 * @afenda-description Server-side catalog filter for Interface Studio section lists (?q=).
 */
import type { InterfaceStudioItem } from "./interface-studio.types";

export function normalizeCatalogQuery(raw: string | undefined): string {
  return (raw ?? "").trim().toLowerCase();
}

export function filterInterfaceStudioCatalogItems(
  items: InterfaceStudioItem[],
  q: string,
): InterfaceStudioItem[] {
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
