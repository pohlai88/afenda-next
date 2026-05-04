import type { Metadata } from "next";

import { InterfaceLabSectionIndex } from "../_components/interface-lab-section-index";
import { assertInterfaceLabSection } from "../interface-lab.config";
import {
  filterInterfaceLabCatalogItems,
  normalizeCatalogQuery,
} from "../interface-lab.catalog-filter.shared";
import { getInterfaceLabItems } from "../interface-lab.preview";

const sectionId = "erp-patterns" as const;
const sectionConfig = assertInterfaceLabSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceLabErpPatternsPage({
  searchParams,
}: PageProps) {
  const q = normalizeCatalogQuery((await searchParams).q);
  const allItems = getInterfaceLabItems(sectionId);
  const items = filterInterfaceLabCatalogItems(allItems, q);

  return (
    <InterfaceLabSectionIndex
      section={sectionId}
      eyebrow="INTERFACE STUDIO / PATTERNS"
      title={sectionConfig.title}
      description="Reusable behavior, state, approval, and exception templates for remixing."
      allItems={allItems}
      items={items}
    />
  );
}
