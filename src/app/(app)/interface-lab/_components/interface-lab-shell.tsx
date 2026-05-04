/**
 * @afenda-owner interface-lab
 * @afenda-subject shell
 * @afenda-boundary server
 * @afenda-description Compound layout shell for the Interface Studio surface.
 */
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";

import { INTERFACE_LAB_SECTIONS } from "../interface-lab.config";
import type { InterfaceLabRouteSurface } from "../interface-lab.routes.shared";
import { buildInterfaceLabSectionNavHref } from "../interface-lab.routes.shared";
import type { InterfaceLabSection } from "../interface-lab.types";

function ShellRoot({ children }: { children: ReactNode }) {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      aria-labelledby="interface-lab-page-title"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1760px] flex-col gap-3 px-3 py-3 md:px-5 md:py-4">
        {children}
      </div>
    </main>
  );
}

type ShellHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: ReactNode;
  actions?: ReactNode;
};

function DefaultHeaderMeta() {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      <div className="space-y-1">
        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Mode
        </dt>
        <dd className="text-sm font-medium text-foreground">Make surface</dd>
      </div>
      <div className="space-y-1">
        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Canvas
        </dt>
        <dd className="text-sm font-medium text-foreground">Static artboards</dd>
      </div>
      <div className="space-y-1">
        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Export
        </dt>
        <dd className="text-sm font-medium text-foreground">Spec-ready templates</dd>
      </div>
    </dl>
  );
}

function ShellHeader({
  eyebrow = "INTERFACE STUDIO",
  title,
  description,
  meta,
  actions,
}: ShellHeaderProps) {
  return (
    <header className="rounded-(--radius-panel) border border-border bg-surface px-4 py-4 shadow-sm md:px-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            <span className="rounded-full border border-border bg-background px-2.5 py-1 text-foreground">
              Studio
            </span>
            <p>{eyebrow}</p>
          </div>

          <div className="mt-3 max-w-4xl space-y-2">
            <h1
              id="interface-lab-page-title"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              {title}
            </h1>

            <p className="max-w-3xl text-sm leading-6 text-foreground-muted md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 xl:w-[400px]">
          <div className="flex flex-wrap gap-2 xl:justify-end">
            {actions ?? (
              <>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Remix
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Prototype
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Export
                </span>
              </>
            )}
          </div>

          <div className="rounded-(--radius-panel) border border-border bg-background/80 p-4">
            {meta ?? <DefaultHeaderMeta />}
          </div>
        </div>
      </div>
    </header>
  );
}

type ShellPromptChip = {
  label: string;
  href?: Route;
};

type ShellCommandBarProps = {
  label?: string;
  prompt?: string;
  placeholder?: string;
  chips?: ShellPromptChip[];
  actions?: ReactNode;
  children?: ReactNode;
};

function ShellCommandBar({
  label = "Command",
  prompt,
  placeholder = "Describe the interface you want to make...",
  chips = [],
  actions,
  children,
}: ShellCommandBarProps) {
  return (
    <section className="rounded-(--radius-panel) border border-border bg-surface p-3 shadow-sm md:p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            {label}
          </p>
          <div className="flex flex-wrap gap-2">
            {actions ?? (
              <>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Remix
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Prototype
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  Export
                </span>
              </>
            )}
          </div>
        </div>

        {children ?? (
          <div className="rounded-(--radius-panel) border border-border bg-background px-4 py-4">
            <p className={cn("text-base leading-7", prompt ? "text-foreground" : "text-foreground-muted")}>
              {prompt ?? placeholder}
            </p>
          </div>
        )}

        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) =>
              chip.href !== undefined ? (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted transition hover:border-border-strong hover:text-foreground"
                >
                  {chip.label}
                </Link>
              ) : (
                <span
                  key={chip.label}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted"
                >
                  {chip.label}
                </span>
              ),
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type ShellSectionNavProps = {
  activeSection?: InterfaceLabSection;
  routeSurface?: InterfaceLabRouteSurface;
};

function ShellSectionNav({ activeSection, routeSurface = "lab" }: ShellSectionNavProps) {
  return (
    <nav aria-label="Interface studio library" className="flex flex-col gap-1">
      {INTERFACE_LAB_SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={buildInterfaceLabSectionNavHref(routeSurface, section.id)}
          aria-current={activeSection === section.id ? "page" : undefined}
          className={cn(
            "rounded-(--radius-control) border px-3 py-3 text-sm transition",
            activeSection === section.id
              ? "border-border bg-surface-muted text-foreground"
              : "border-transparent text-foreground-muted hover:border-border hover:bg-surface-muted hover:text-foreground",
          )}
        >
          <span className="font-medium">{section.title}</span>
        </Link>
      ))}
    </nav>
  );
}

type ShellLibraryRailProps = {
  activeSection?: InterfaceLabSection;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

function ShellLibraryRail({
  title = "Library",
  description = "Browse templates, layers, and sources.",
  children,
  footer,
}: ShellLibraryRailProps) {
  return (
    <aside className="rounded-(--radius-panel) border border-border bg-surface p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
          {title}
        </p>
        <p className="text-sm leading-6 text-foreground-muted">{description}</p>
      </div>

      {children !== undefined && children !== null ? (
        <div className="mt-5">{children}</div>
      ) : null}

      {footer !== undefined && footer !== null ? (
        <div className="mt-5 border-t border-border pt-5">{footer}</div>
      ) : null}
    </aside>
  );
}

type ShellRailProps = {
  activeSection?: InterfaceLabSection;
  routeSurface?: InterfaceLabRouteSurface;
  title?: string;
  description?: string;
  children?: ReactNode;
};

function ShellRail({
  activeSection,
  routeSurface = "lab",
  title = "Library",
  description = "Navigate studio templates and route-owned surfaces.",
  children,
}: ShellRailProps) {
  return (
    <ShellLibraryRail title={title} description={description}>
      {activeSection !== undefined ? (
        <ShellSectionNav activeSection={activeSection} routeSurface={routeSurface} />
      ) : (
        <ShellSectionNav routeSurface={routeSurface} />
      )}
      {children !== undefined && children !== null ? (
        <div className="mt-5 border-t border-border pt-5">{children}</div>
      ) : null}
    </ShellLibraryRail>
  );
}

type ShellCanvasProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

function ShellCanvas({
  eyebrow,
  title,
  description,
  children,
  className,
}: ShellCanvasProps) {
  const hasHeader = eyebrow !== undefined || title !== undefined || description !== undefined;

  return (
    <section
      className={cn(
        "rounded-(--radius-panel) border border-border bg-surface p-4 shadow-sm md:p-5",
        className,
      )}
    >
      {hasHeader ? (
        <header className="border-b border-border pb-4">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm leading-6 text-foreground-muted">{description}</p>
          ) : null}
        </header>
      ) : null}

      <div className={cn("flex min-h-[440px] flex-col gap-5", hasHeader && "pt-5")}>
        {children}
      </div>
    </section>
  );
}

type ShellArtboardProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  meta?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
};

function ShellArtboard({
  eyebrow,
  title,
  description,
  meta,
  toolbar,
  children,
  className,
  frameClassName,
}: ShellArtboardProps) {
  const hasHeader = eyebrow !== undefined || title !== undefined || description !== undefined || meta !== undefined;

  return (
    <section
      className={cn(
        "rounded-(--radius-panel) border border-border bg-surface p-3 shadow-sm md:p-4",
        className,
      )}
    >
      {hasHeader ? (
        <header className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground-muted">
                {description}
              </p>
            ) : null}
          </div>
          {meta !== undefined ? <div className="shrink-0">{meta}</div> : null}
        </header>
      ) : null}

      <div
        className={cn(
          "relative mt-4 flex min-h-[560px] flex-col overflow-hidden rounded-(--radius-panel) border border-border bg-surface-muted p-3 md:p-5",
          frameClassName,
        )}
      >
        <div className="mx-auto flex min-h-[480px] w-full max-w-5xl flex-1 flex-col rounded-(--radius-panel) border border-border bg-background p-4 shadow-sm md:p-6">
          {children}
        </div>
        {toolbar !== undefined ? (
          <div className="pointer-events-none sticky bottom-3 z-10 mx-auto mt-4 flex justify-center">
            {toolbar}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type ShellFloatingCanvasControlsProps = {
  controls?: string[];
  activeControl?: string;
};

function ShellFloatingCanvasControls({
  controls = ["Fit", "100%", "Desktop", "Tablet", "Mobile", "Grid", "Preview"],
  activeControl = "Fit",
}: ShellFloatingCanvasControlsProps) {
  return (
    <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-surface px-2 py-2 shadow-sm">
      {controls.map((control) => (
        <button
          key={control}
          type="button"
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition",
            control === activeControl
              ? "bg-surface-muted text-foreground"
              : "text-foreground-muted hover:bg-surface-muted hover:text-foreground",
          )}
        >
          {control}
        </button>
      ))}
    </div>
  );
}

type ShellPropertiesPanelProps = {
  title?: string;
  description?: string;
  selectedLabel?: string;
  children: ReactNode;
};

function ShellPropertiesPanel({
  title = "Properties",
  description,
  selectedLabel,
  children,
}: ShellPropertiesPanelProps) {
  const hasHeader = title !== undefined || description !== undefined || selectedLabel !== undefined;

  return (
    <aside className="rounded-(--radius-panel) border border-border bg-surface p-4 shadow-sm">
      {hasHeader ? (
        <header className="border-b border-border pb-4">
          {selectedLabel ? (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              Selected
            </p>
          ) : null}
          <h2 className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            {selectedLabel ?? title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-foreground-muted">{description}</p>
          ) : null}
        </header>
      ) : null}

      <div className={cn("space-y-5", hasHeader && "pt-5")}>{children}</div>
    </aside>
  );
}

type ShellInspectorProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

function ShellInspector({ title, description, children }: ShellInspectorProps) {
  return (
    <ShellPropertiesPanel
      title={title ?? "Properties"}
      {...(description !== undefined ? { description } : {})}
    >
      {children}
    </ShellPropertiesPanel>
  );
}

type ShellWorkbenchProps = {
  rail?: ReactNode;
  canvas: ReactNode;
  inspector?: ReactNode;
};

function ShellWorkbench({ rail, canvas, inspector }: ShellWorkbenchProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[292px_minmax(0,1fr)_348px]">
      {rail}
      <div className="min-w-0">{canvas}</div>
      {inspector ? <div className="min-w-0">{inspector}</div> : null}
    </div>
  );
}

type ShellBodyProps = {
  children: ReactNode;
};

function ShellBody({ children }: ShellBodyProps) {
  return <section className="flex min-w-0 flex-col gap-3">{children}</section>;
}

export const InterfaceLabShell = Object.assign(ShellRoot, {
  Header: ShellHeader,
  CommandBar: ShellCommandBar,
  LibraryRail: ShellLibraryRail,
  Rail: ShellRail,
  Canvas: ShellCanvas,
  Artboard: ShellArtboard,
  FloatingCanvasControls: ShellFloatingCanvasControls,
  PropertiesPanel: ShellPropertiesPanel,
  Inspector: ShellInspector,
  Workbench: ShellWorkbench,
  SectionNav: ShellSectionNav,
  Body: ShellBody,
});
