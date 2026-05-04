import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { uiComponentRegistryById } from "@/components/ui-governance/governance.ui.registry.shared";

import { InterfaceLabComponentDetailContent } from "../../_components/interface-lab-component-detail.content";
import { InterfaceLabShell } from "../../_components/interface-lab-shell";
import { assertInterfaceLabSection } from "../../interface-lab.config";
import { getInterfaceLabComponentSlugParams } from "../../interface-lab.components.static-params";
import { getCachedInterfaceLabItem } from "../../interface-lab.data";
import { toInterfaceLabManifestExcerpt } from "../../interface-lab.manifest-excerpt";
import { buildInterfaceLabDetailMetadata } from "../../interface-lab.route-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "components" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getInterfaceLabComponentSlugParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = assertInterfaceLabSection(sectionId);
  const item = getCachedInterfaceLabItem(sectionId, slug);

  return buildInterfaceLabDetailMetadata({
    sectionLabel: section.title,
    sectionPath: sectionId,
    slug,
    item,
  });
}

export default async function InterfaceLabComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCachedInterfaceLabItem(sectionId, slug);

  if (!item) {
    notFound();
  }

  const registryId = item.registryId;
  const manifest =
    registryId !== undefined ? uiComponentRegistryById[registryId] : undefined;
  const manifestExcerpt =
    manifest !== undefined ? toInterfaceLabManifestExcerpt(manifest) : null;

  return (
    <InterfaceLabShell>
      <InterfaceLabShell.Header
        eyebrow="INTERFACE STUDIO / COMPONENT"
        title={item.title}
        description={item.description}
        meta={
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Section
              </dt>
              <dd className="text-sm font-medium text-foreground">Components</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Category
              </dt>
              <dd className="text-sm font-medium text-foreground">{item.category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Registry id
              </dt>
              <dd className="font-mono text-xs text-foreground">{registryId ?? "missing"}</dd>
            </div>
          </dl>
        }
      />
      <InterfaceLabComponentDetailContent
        item={item}
        registryId={registryId}
        manifestExcerpt={manifestExcerpt}
      />
    </InterfaceLabShell>
  );
}
