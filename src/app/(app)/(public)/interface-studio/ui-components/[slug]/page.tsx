/**
 * `/interface-studio/ui-components/[slug]` · SSG-friendly detail; `dynamic`/`dynamicParams`
 * constrain unknown slugs toward `not-found`
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { uiComponentRegistryById } from "@/components/ui-governance/governance.ui.registry.shared";

import { InterfaceStudioComponentDetailContent } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-component-detail.content";
import { InterfaceStudioShell } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-shell";
import { assertInterfaceStudioSection } from "@/app/(app)/(public)/interface-studio/interface-studio.config";
import { getInterfaceStudioComponentSlugParams } from "@/app/(app)/(public)/interface-studio/interface-studio.components.static-params";
import { getCachedInterfaceStudioItem } from "@/app/(app)/(public)/interface-studio/interface-studio.data";
import { toInterfaceStudioManifestExcerpt } from "@/app/(app)/(public)/interface-studio/interface-studio.manifest-excerpt";
import { buildInterfaceStudioDetailMetadata } from "@/app/(app)/(public)/interface-studio/interface-studio.route-metadata";

import { INTERFACE_STUDIO_ROUTE_SURFACE } from "../../interface-studio.route-surface";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "components" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getInterfaceStudioComponentSlugParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = assertInterfaceStudioSection(sectionId);
  const item = getCachedInterfaceStudioItem(sectionId, slug);

  return buildInterfaceStudioDetailMetadata({
    sectionLabel: section.title,
    sectionPath: sectionId,
    slug,
    item,
    routeSurface: INTERFACE_STUDIO_ROUTE_SURFACE,
  });
}

export default async function InterfaceStudioComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCachedInterfaceStudioItem(sectionId, slug);

  if (!item) {
    notFound();
  }

  const registryId = item.registryId;
  const manifest =
    registryId !== undefined ? uiComponentRegistryById[registryId] : undefined;
  const manifestExcerpt =
    manifest !== undefined ? toInterfaceStudioManifestExcerpt(manifest) : null;

  return (
    <InterfaceStudioShell>
      <InterfaceStudioShell.Header
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
      <InterfaceStudioComponentDetailContent
        item={item}
        registryId={registryId}
        manifestExcerpt={manifestExcerpt}
        routeSurface={INTERFACE_STUDIO_ROUTE_SURFACE}
      />
    </InterfaceStudioShell>
  );
}
