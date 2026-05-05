/**
 * @afenda-owner interface-studio
 * @afenda-subject catalog
 * @afenda-boundary shared
 * @afenda-description Presentational catalog cards for Interface Studio items.
 */
import Link from "next/link";

import type { InterfaceStudioRouteSurface } from "../interface-studio.routes.shared";
import { buildInterfaceStudioItemHref } from "../interface-studio.routes.shared";
import type { InterfaceStudioItem, InterfaceStudioSection } from "../interface-studio.types";
import { getInterfaceStudioStatusBadgeClassName } from "../interface-studio.status.shared";
import { getInterfaceStudioItemTemplateKind } from "../interface-studio.studio.shared";

type InterfaceStudioCatalogGridProps = {
  section: InterfaceStudioSection;
  items: InterfaceStudioItem[];
  routeSurface?: InterfaceStudioRouteSurface;
};

export function InterfaceStudioCatalogGrid({
  section,
  items,
  routeSurface = "studio",
}: InterfaceStudioCatalogGridProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.slug}
          className="rounded-(--radius-panel) border border-border bg-background p-4 shadow-sm"
          data-template-kind={getInterfaceStudioItemTemplateKind(item)}
        >
          <div className="flex h-full flex-col gap-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                    <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-foreground">
                      {getInterfaceStudioItemTemplateKind(item)}
                    </span>
                    <span>{item.category}</span>
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                </div>

                <span
                  className={getInterfaceStudioStatusBadgeClassName(item.status)}
                  data-status={item.status}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-foreground-muted">{item.description}</p>
            </div>

            {item.studio?.remixPrompts?.[0] ? (
              <div className="rounded-(--radius-control) border border-border bg-surface px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  Remix prompt
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {item.studio.remixPrompts[0]}
                </p>
              </div>
            ) : null}

            <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
              {item.tags && item.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-2.5 py-1 text-xs text-foreground-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-foreground-muted">{item.slug}</p>
                <p className="text-xs text-foreground-muted">
                  {item.studio?.canvasPreset ?? "Template artboard"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Link
                  href={buildInterfaceStudioItemHref(routeSurface, section, item.slug)}
                  className="rounded-(--radius-control) border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-foreground transition hover:bg-surface-muted"
                >
                  Open
                </Link>
                <span className="rounded-(--radius-control) border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-foreground-muted">
                  Remix
                </span>
                <span className="rounded-(--radius-control) border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-foreground-muted">
                  Compare
                </span>
                <Link
                  href={buildInterfaceStudioItemHref(routeSurface, section, item.slug)}
                  className="rounded-(--radius-control) border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-foreground transition hover:bg-surface-muted"
                >
                  Inspect
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
