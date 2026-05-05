/**
 * `/interface-studio/ui-dashboard/[slug]` · SSG-friendly command-screen artboard; nested client previews
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { InterfaceStudioComponentDetailWorkspace } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-component-detail-workspace.client";
import { InterfaceStudioItemDetail } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-item-detail";
import { InterfaceStudioShell } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-shell";
import { InterfaceStudioStaticPreviewSurface } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-static-preview-surface";
import { assertInterfaceStudioSection } from "@/app/(app)/(public)/interface-studio/interface-studio.config";
import { getCachedInterfaceStudioItem } from "@/app/(app)/(public)/interface-studio/interface-studio.data";
import { getInterfaceStudioItems } from "@/app/(app)/(public)/interface-studio/interface-studio.preview";
import { buildInterfaceStudioDetailMetadata } from "@/app/(app)/(public)/interface-studio/interface-studio.route-metadata";

import { INTERFACE_STUDIO_ROUTE_SURFACE } from "../../interface-studio.route-surface";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "dashboard" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getInterfaceStudioItems(sectionId).map((item) => ({ slug: item.slug }));
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

export default async function InterfaceStudioDashboardDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCachedInterfaceStudioItem(sectionId, slug);

  if (!item) {
    notFound();
  }

  return (
    <InterfaceStudioShell>
      <InterfaceStudioShell.Header
        eyebrow="INTERFACE STUDIO / SCREEN"
        title={item.title}
        description={item.description}
        meta={
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Section
              </dt>
              <dd className="text-sm font-medium text-foreground">Command Screens</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Category
              </dt>
              <dd className="text-sm font-medium text-foreground">{item.category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Surface
              </dt>
              <dd className="text-sm font-medium text-foreground">Command artboard</dd>
            </div>
          </dl>
        }
      />
      <InterfaceStudioItemDetail
        item={item}
        routeSurface={INTERFACE_STUDIO_ROUTE_SURFACE}
        previewEyebrow="Canvas"
        previewBody={
          <InterfaceStudioComponentDetailWorkspace
            previewLabel={item.preview?.label ?? item.title}
            previewDescription={
              item.preview?.description ??
              "Command screen artboard for dense console, exception, and state variants."
            }
            previewSurface={
              <InterfaceStudioStaticPreviewSurface
                item={item}
                previewKindLabel="Command screen"
              />
            }
            manifestExcerpt={null}
            anatomy={item.studio?.anatomy ?? []}
          />
        }
      />
    </InterfaceStudioShell>
  );
}
