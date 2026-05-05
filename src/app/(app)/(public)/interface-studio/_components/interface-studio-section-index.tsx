import { Suspense } from "react";
import Link from "next/link";

import { InterfaceStudioCatalogGrid } from "./interface-studio-catalog-grid";
import { InterfaceStudioCatalogToolbar } from "./interface-studio-catalog-toolbar.client";
import { InterfaceStudioShell } from "./interface-studio-shell";
import type { InterfaceStudioRouteSurface } from "../interface-studio.routes.shared";
import {
  buildInterfaceStudioItemHref,
  buildInterfaceStudioStudioHomeHref,
} from "../interface-studio.routes.shared";
import {
  getInterfaceStudioFocusItems,
  getInterfaceStudioStudioItemCounts,
  getInterfaceStudioTemplateGroups,
} from "../interface-studio.studio.shared";
import type { InterfaceStudioItem, InterfaceStudioSection } from "../interface-studio.types";
import { getInterfaceStudioStatusBadgeClassName } from "../interface-studio.status.shared";

type InterfaceStudioSectionIndexProps = {
  section: InterfaceStudioSection;
  eyebrow: string;
  title: string;
  description: string;
  allItems: InterfaceStudioItem[];
  items: InterfaceStudioItem[];
  enableCatalogQuery?: boolean;
  routeSurface?: InterfaceStudioRouteSurface;
};

function PropertyRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-sm text-foreground-muted">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function InterfaceStudioSectionIndex({
  section,
  eyebrow,
  title,
  description,
  allItems,
  items,
  enableCatalogQuery = true,
  routeSurface = "studio",
}: InterfaceStudioSectionIndexProps) {
  const counts = getInterfaceStudioStudioItemCounts(allItems);
  const focusItems = getInterfaceStudioFocusItems(allItems, 4);
  const templateGroups = getInterfaceStudioTemplateGroups(items);

  return (
    <InterfaceStudioShell>
      <InterfaceStudioShell.Header
        eyebrow={eyebrow}
        title={title}
        description={description}
        meta={
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Visible
              </dt>
              <dd className="text-sm font-medium text-foreground">{items.length} templates</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Kinds
              </dt>
              <dd className="text-sm font-medium text-foreground">
                {templateGroups.length} groups
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Remix
              </dt>
              <dd className="text-sm font-medium text-foreground">
                {focusItems.length} active variants
              </dd>
            </div>
          </dl>
        }
        actions={
          <Link
            href={buildInterfaceStudioStudioHomeHref(routeSurface)}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted transition hover:border-border-strong hover:text-foreground"
          >
            Studio
          </Link>
        }
      />

      <InterfaceStudioShell.Workbench
        rail={
          <InterfaceStudioShell.LibraryRail
            title="Layers"
            description="Template search, source shortcuts, and active layer counts."
          >
            <div className="space-y-5">
              {enableCatalogQuery === true ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Search
                  </p>
                  <Suspense
                    fallback={
                      <div className="h-10 animate-pulse rounded-full bg-surface-muted" aria-hidden />
                    }
                  >
                    <InterfaceStudioCatalogToolbar aria-label={`Filter ${title} templates`} />
                  </Suspense>
                </div>
              ) : null}

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  Sources
                </p>
                <InterfaceStudioShell.SectionNav activeSection={section} routeSurface={routeSurface} />
              </div>

              <dl className="grid gap-0 rounded-(--radius-panel) border border-border bg-background/70 px-4 text-sm">
                <PropertyRow label="Templates" value={counts.total} />
                <PropertyRow label="Ready" value={counts.approved} />
                <PropertyRow label="Variants" value={counts.candidate + counts.experimental} />
              </dl>
            </div>
          </InterfaceStudioShell.LibraryRail>
        }
        canvas={
          <InterfaceStudioShell.Artboard
            eyebrow="Templates"
            title={`${title} library`}
            description={`${items.length} of ${allItems.length} templates are visible, grouped by kind with prompts and export properties.`}
            toolbar={<InterfaceStudioShell.FloatingCanvasControls activeControl="Grid" />}
          >
            <div className="space-y-7">
              {templateGroups.length > 0 ? (
                templateGroups.map((group) => (
                  <section key={group.kind} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                          {group.kind}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                          {group.label}
                        </h2>
                      </div>
                      <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted">
                        {group.count} templates
                      </span>
                    </div>
                    <InterfaceStudioCatalogGrid
                      section={section}
                      items={group.items}
                      routeSurface={routeSurface}
                    />
                  </section>
                ))
              ) : (
                <div className="rounded-(--radius-panel) border border-dashed border-border bg-surface p-6 text-sm text-foreground-muted">
                  No templates match this search.
                </div>
              )}
            </div>
          </InterfaceStudioShell.Artboard>
        }
        inspector={
          <InterfaceStudioShell.PropertiesPanel
            selectedLabel={`${title} library`}
            description="Properties for the visible template source."
          >
            <dl className="grid gap-0 rounded-(--radius-panel) border border-border bg-background/70 px-4">
              <PropertyRow label="Visible" value={items.length} />
              <PropertyRow label="Approved" value={counts.approved} />
              <PropertyRow label="Candidate" value={counts.candidate} />
              <PropertyRow label="Experimental" value={counts.experimental} />
              <PropertyRow label="Deprecated" value={counts.deprecated} />
            </dl>

            <section className="space-y-3">
              <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Remix queue
              </h2>
              {focusItems.length > 0 ? (
                <div className="space-y-3">
                  {focusItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={buildInterfaceStudioItemHref(routeSurface, section, item.slug)}
                      className="block rounded-(--radius-control) border border-border bg-background/70 p-3 transition hover:border-border-strong hover:bg-surface-muted"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-foreground-muted">
                            {item.studio?.remixPrompts?.[0] ?? item.description}
                          </p>
                        </div>
                        <span className={getInterfaceStudioStatusBadgeClassName(item.status)}>
                          {item.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-foreground-muted">
                  No candidate or experimental templates in this source.
                </p>
              )}
            </section>
          </InterfaceStudioShell.PropertiesPanel>
        }
      />
    </InterfaceStudioShell>
  );
}
