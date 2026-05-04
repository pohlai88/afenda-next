import type { InterfaceLabItem } from "../interface-lab.types";
import { getInterfaceLabStatusBadgeClassName } from "../interface-lab.status.shared";

type InterfaceLabStaticPreviewSurfaceProps = {
  item: InterfaceLabItem;
  previewKindLabel: string;
};

export function InterfaceLabStaticPreviewSurface({
  item,
  previewKindLabel,
}: InterfaceLabStaticPreviewSurfaceProps) {
  const anatomy = item.studio?.anatomy ?? [];
  const evidence = item.studio?.evidence ?? [];

  return (
    <div className="space-y-4">
      <div className="rounded-(--radius-panel) border border-border bg-background/80 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {previewKindLabel}
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {item.preview?.label ?? item.title}
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-foreground-muted">
              {item.preview?.description ?? item.description}
            </p>
          </div>

          <span className={getInterfaceLabStatusBadgeClassName(item.status)}>{item.status}</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {anatomy.slice(0, 3).map((part) => (
          <div
            key={part}
            className="rounded-(--radius-panel) border border-border bg-surface p-4"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
              Layer
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">{part}</p>
          </div>
        ))}
      </div>

      <div className="rounded-(--radius-panel) border border-dashed border-border bg-surface-muted/50 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Export notes
        </p>
        {evidence.length > 0 ? (
          <div className="mt-4 space-y-3">
            {evidence.slice(0, 4).map((line) => (
              <div
                key={line}
                className="rounded-(--radius-control) border border-border bg-surface px-3 py-3 text-sm text-foreground"
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-foreground-muted">
            This studio slot is ready for an artboard, prototype link, and design spec.
          </p>
        )}
      </div>
    </div>
  );
}
