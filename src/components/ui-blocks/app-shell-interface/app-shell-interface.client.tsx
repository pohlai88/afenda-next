/**
 * @afenda-owner interface-studio
 * @afenda-subject ui-blocks
 * @afenda-artifact shell
 * @afenda-boundary client
 * @afenda-description Five-zone Interface Studio shell: void canvas, collapsible index, CMDK oracle, execution bar, and inspector drawer using ui-governance primitives.
 */
"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/components/cn";
import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppSearchField } from "@/components/ui-governance/app-search-field/app-search-field.control.primitive.client";
import { AppSeparator } from "@/components/ui-governance/app-separator/app-separator.control.primitive.client";
import {
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
} from "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";

import type {
  AppShellInterfaceCommandItem,
  AppShellInterfaceExecutionAction,
  AppShellInterfaceNavGroup,
  AppShellInterfaceNavItem,
  AppShellInterfaceProps,
} from "./app-shell-interface.types.shared";

const DEFAULT_NAV_GROUPS: AppShellInterfaceNavGroup[] = [
  {
    id: "config",
    label: "Config",
    items: [{ id: "lab-settings", label: "Lab Settings" }],
  },
  {
    id: "primitives",
    label: "Primitives",
    items: [{ id: "primitives-root", label: "Primitives" }],
  },
  {
    id: "blocks",
    label: "Blocks",
    items: [{ id: "blocks-root", label: "Blocks" }],
  },
  {
    id: "erp",
    label: "ERP Patterns",
    items: [{ id: "erp-root", label: "ERP Patterns" }],
  },
];

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return true;
  return false;
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

function CodeGlyphIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 20 14 4m4 4 4 4-4 4M6 16l-4-4 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function NavItemRow({
  item,
  navExpanded,
  onNavItemPress,
}: {
  item: AppShellInterfaceNavItem;
  navExpanded: boolean;
  onNavItemPress?: (item: AppShellInterfaceNavItem) => void;
}) {
  const active = Boolean(item.active);
  return (
    <AppButton
      {...(active ? { "aria-current": "page" as const } : {})}
      variant="quiet"
      size="sm"
      className={cn(
        "h-9 w-full min-w-0 justify-start gap-3 rounded-md border border-transparent px-3 py-0 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
        active && "border-emerald-900/40 bg-emerald-950/15 text-emerald-400",
        !navExpanded && "justify-center px-0",
      )}
      onPress={() => {
        if (onNavItemPress !== undefined) {
          onNavItemPress(item);
          return;
        }
        if (item.href !== undefined && item.href.length > 0) {
          window.location.assign(item.href);
        }
      }}
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-zinc-500">
        {(item.label.slice(0, 1) ?? "?").toUpperCase()}
      </span>
      <span
        className={cn(
          "min-w-0 truncate text-left text-xs font-medium transition-opacity duration-200",
          navExpanded ? "opacity-100" : "pointer-events-none absolute opacity-0",
        )}
      >
        {item.label}
      </span>
    </AppButton>
  );
}

function EmptyInspectorSlot({ label }: { label: string }) {
  return (
    <p className="type-body-sm text-zinc-500">
      No {label} is bound to this specimen yet. Pass the corresponding prop on{" "}
      <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-400">AppShellInterface</code>.
    </p>
  );
}

export function AppShellInterface({
  children,
  className,
  labTitle = "AFENDA LAB",
  navGroups = DEFAULT_NAV_GROUPS,
  commandItems = [],
  inspectorSchema,
  inspectorManifest,
  inspectorTelemetry,
  inspectorA11y,
  inspectorHeightClassName = "h-[80vh]",
  onExecutionAction,
  onNavItemPress,
}: AppShellInterfaceProps) {
  const [navExpanded, setNavExpanded] = useState(false);
  const [oracleOpen, setOracleOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const inspectorRootRef = useRef<HTMLDivElement | null>(null);
  const inspectorTitleId = useId();

  const filteredCommands = useMemo(() => {
    const q = commandQuery.trim().toLowerCase();
    if (q.length === 0) return commandItems;
    return commandItems.filter((entry) => {
      const hay = `${entry.label} ${entry.hint ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [commandItems, commandQuery]);

  const dispatchExecution = useCallback(
    (action: AppShellInterfaceExecutionAction) => {
      onExecutionAction?.(action);
    },
    [onExecutionAction],
  );

  useEffect(() => {
    if (!inspectorOpen) return;
    const t = window.setTimeout(() => {
      const root = inspectorRootRef.current;
      const closeControl = root?.querySelector<HTMLElement>("[data-app-shell-inspector-close]");
      closeControl?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [inspectorOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target;
      const editing = isEditableTarget(target);

      if (e.key === "Escape") {
        if (oracleOpen) {
          e.preventDefault();
          setOracleOpen(false);
          setCommandQuery("");
          return;
        }
        if (inspectorOpen) {
          e.preventDefault();
          setInspectorOpen(false);
        }
        return;
      }

      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOracleOpen((open) => !open);
        return;
      }

      if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setNavExpanded((v) => !v);
        return;
      }

      if (mod && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setInspectorOpen((v) => !v);
        return;
      }

      if (!mod && !e.altKey && e.key === "[" && !editing) {
        e.preventDefault();
        setNavExpanded((v) => !v);
        return;
      }

      if (oracleOpen || inspectorOpen || editing) return;

      const k = e.key.toLowerCase();
      if (k === "c") {
        e.preventDefault();
        dispatchExecution("copy-code");
      } else if (k === "m") {
        e.preventDefault();
        dispatchExecution("copy-manifest");
      } else if (k === "v") {
        e.preventDefault();
        dispatchExecution("variants");
      } else if (k === "a") {
        e.preventDefault();
        dispatchExecution("ai-help");
      } else if (k === "e") {
        e.preventDefault();
        dispatchExecution("export");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [oracleOpen, inspectorOpen, dispatchExecution]);

  const navWidthClass = navExpanded ? "w-60" : "w-14";

  return (
    <div
      className={cn(
        "flex h-screen min-h-0 w-full overflow-hidden bg-[#000000] text-zinc-300 selection:bg-zinc-200 selection:text-black",
        className,
      )}
    >
      {/* Zone 2 — Left edge index */}
      <aside
        data-app-shell-zone="nav"
        className={cn(
          "flex shrink-0 flex-col border-r border-zinc-950 bg-[#000000] transition-[width] duration-200 ease-out",
          navWidthClass,
        )}
      >
        <div className="flex h-14 shrink-0 items-center border-b border-zinc-950 px-2">
          <AppButton
            aria-expanded={navExpanded}
            aria-controls="app-shell-interface-nav"
            variant="quiet"
            size="sm"
            className="h-10 min-w-0 flex-1 justify-start gap-3 px-2 text-zinc-500 hover:text-zinc-100"
            onPress={() => setNavExpanded((v) => !v)}
          >
            <MenuIcon />
            <span
              className={cn(
                "truncate text-xs font-bold tracking-[0.2em] text-zinc-400 transition-opacity duration-200",
                navExpanded ? "opacity-100" : "pointer-events-none absolute opacity-0",
              )}
            >
              {labTitle}
            </span>
          </AppButton>
        </div>

        <nav
          id="app-shell-interface-nav"
          aria-label="Interface lab index"
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-2 py-4",
            "[scrollbar-width:thin]",
            "[&::-webkit-scrollbar]:w-1",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent",
            "hover:[&::-webkit-scrollbar-thumb]:bg-zinc-800",
          )}
        >
          <div className="flex flex-col gap-6">
            {navGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-1">
                <p
                  className={cn(
                    "px-2 font-mono text-[9px] font-medium uppercase tracking-widest text-zinc-600 transition-opacity duration-200",
                    navExpanded ? "opacity-100" : "pointer-events-none h-0 overflow-hidden opacity-0",
                  )}
                >
                  {group.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <NavItemRow
                      key={item.id}
                      item={item}
                      navExpanded={navExpanded}
                      {...(onNavItemPress !== undefined ? { onNavItemPress } : {})}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Zone 1 — Void canvas + floating chrome */}
      <div
        data-app-shell-zone="void"
        className="relative flex min-w-0 flex-1 flex-col bg-[#000000]"
      >
        {/* Zone 3 — CMDK oracle */}
        <div
          data-app-shell-zone="oracle"
          className={cn(
            "absolute left-1/2 top-6 z-30 w-[min(100%-2rem,28rem)] -translate-x-1/2 px-4 transition-opacity duration-200",
            oracleOpen ? "opacity-100" : "opacity-50 hover:opacity-90",
          )}
        >
          <div
            className={cn(
              "rounded-xl border border-zinc-800/80 bg-zinc-950/55 px-3 py-2 shadow-2xl backdrop-blur-md transition-[box-shadow,transform] duration-200",
              oracleOpen && "ring-1 ring-zinc-700/80",
            )}
          >
            <AppSearchField
              aria-label="Command palette"
              placeholder="Search registry…"
              value={oracleOpen ? commandQuery : ""}
              onChange={(next) => setCommandQuery(String(next))}
              onFocus={() => setOracleOpen(true)}
              size="sm"
              className={cn(
                "gap-2 text-zinc-200",
                "[&_.field-control]:rounded-lg [&_.field-control]:border-zinc-800 [&_.field-control]:bg-zinc-900/50",
                "[&_.field-control]:shadow-none [&_.field-control]:ring-0",
                "[&_.field-control]:data-focus-within:ring-1 [&_.field-control]:data-focus-within:ring-zinc-600 [&_.field-control]:data-focus-within:ring-offset-0",
              )}
              inputClassName="text-zinc-200 placeholder:text-zinc-600"
            />
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-800/80 pt-2">
              <span className="font-mono text-[10px] text-zinc-600">⌘K toggle</span>
              <AppButton
                variant="quiet"
                size="sm"
                className="h-7 min-w-0 px-2 text-[10px] text-zinc-500 hover:text-zinc-300"
                onPress={() => {
                  setOracleOpen(false);
                  setCommandQuery("");
                }}
              >
                Esc close
              </AppButton>
            </div>
          </div>

          {oracleOpen && filteredCommands.length > 0 ? (
            <ul
              className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/95 py-1 shadow-2xl backdrop-blur-md"
              role="listbox"
              aria-label="Commands"
            >
              {filteredCommands.map((cmd: AppShellInterfaceCommandItem) => (
                <li key={cmd.id} role="presentation">
                  <AppButton
                    variant="quiet"
                    size="sm"
                    className="h-9 w-full justify-between rounded-none px-3 text-left text-xs text-zinc-300 hover:bg-zinc-900"
                    onPress={() => {
                      cmd.onSelect?.();
                      setOracleOpen(false);
                      setCommandQuery("");
                    }}
                  >
                    <span className="truncate">{cmd.label}</span>
                    {cmd.hint ? (
                      <span className="shrink-0 font-mono text-[10px] text-zinc-600">{cmd.hint}</span>
                    ) : null}
                  </AppButton>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center p-6">{children}</div>

        {/* Zone 4 — Execution bar */}
        <div
          data-app-shell-zone="execution"
          className="pointer-events-auto absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-800/90 bg-zinc-950/85 p-1.5 shadow-2xl backdrop-blur-md"
          role="toolbar"
          aria-label="Specimen actions"
        >
          <ExecutionKey
            kbd="C"
            label="Copy code"
            onPress={() => dispatchExecution("copy-code")}
          />
          <ExecutionKey
            kbd="M"
            label="Copy manifest"
            onPress={() => dispatchExecution("copy-manifest")}
          />
          <ExecutionKey
            kbd="V"
            label="Variants"
            onPress={() => dispatchExecution("variants")}
          />
          <AppSeparator orientation="vertical" className="mx-0.5 h-5 min-h-0 bg-zinc-800" />
          <ExecutionKey
            kbd="A"
            label="AI help"
            accent
            onPress={() => dispatchExecution("ai-help")}
          />
          <ExecutionKey
            kbd="E"
            label="Export"
            onPress={() => dispatchExecution("export")}
          />
        </div>

        {oracleOpen ? (
          <button
            type="button"
            aria-label="Dismiss command palette"
            className="fixed inset-0 z-20 bg-black/40"
            onClick={() => {
              setOracleOpen(false);
              setCommandQuery("");
            }}
          />
        ) : null}
      </div>

      {/* Zone 5 — Inspector trigger + drawer */}
      <AppButton
        data-app-shell-zone="inspector-trigger"
        aria-expanded={inspectorOpen}
        aria-controls="app-shell-interface-inspector"
        variant="quiet"
        size="sm"
        className="pointer-events-auto fixed bottom-6 right-6 z-50 size-12 shrink-0 rounded-full border border-zinc-800 bg-zinc-950 p-0 text-zinc-400 shadow-2xl hover:border-emerald-600/60 hover:text-emerald-400"
        onPress={() => setInspectorOpen((v) => !v)}
      >
        <CodeGlyphIcon className="size-5" />
      </AppButton>

      <div
        ref={inspectorRootRef}
        id="app-shell-interface-inspector"
        data-app-shell-zone="inspector"
        role="dialog"
        aria-modal="true"
        aria-labelledby={inspectorTitleId}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col border-t border-zinc-800 bg-zinc-950/95 shadow-[0_-20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-transform duration-300 ease-out",
          inspectorHeightClassName,
          inspectorOpen ? "translate-y-0" : "translate-y-full pointer-events-none",
        )}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4">
          <h2 id={inspectorTitleId} className="font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
            Afenda inspector
          </h2>
          <AppButton
            data-app-shell-inspector-close
            variant="quiet"
            size="sm"
            className="h-8 px-2 font-mono text-xs text-zinc-500 hover:text-zinc-100"
            onPress={() => setInspectorOpen(false)}
          >
            Close · Esc
          </AppButton>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 py-4">
          <AppTabs defaultSelectedKey="schema" className="flex h-full min-h-0 flex-col gap-3 text-zinc-200">
            <AppTabList
              aria-label="Inspector sections"
              className="min-h-0 shrink-0 gap-1 border-b border-zinc-800 bg-transparent pb-2"
            >
              <AppTab id="schema" className="rounded-md px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 selected:bg-zinc-900 selected:text-emerald-400">
                Schema
              </AppTab>
              <AppTab id="manifest" className="rounded-md px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 selected:bg-zinc-900 selected:text-zinc-300">
                Manifest
              </AppTab>
              <AppTab id="telemetry" className="rounded-md px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 selected:bg-zinc-900 selected:text-zinc-300">
                Telemetry
              </AppTab>
              <AppTab id="a11y" className="rounded-md px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 selected:bg-zinc-900 selected:text-zinc-300">
                Accessibility
              </AppTab>
            </AppTabList>
            <AppTabPanels className="min-h-0 flex-1 overflow-y-auto text-zinc-300">
              <AppTabPanel
                id="schema"
                className="rounded-lg border border-zinc-800/80 bg-black/40 p-4 outline-none ring-0 data-focus-visible:ring-1 data-focus-visible:ring-zinc-600"
              >
                {inspectorSchema ?? <EmptyInspectorSlot label="schema" />}
              </AppTabPanel>
              <AppTabPanel
                id="manifest"
                className="rounded-lg border border-zinc-800/80 bg-black/40 p-4 outline-none ring-0 data-focus-visible:ring-1 data-focus-visible:ring-zinc-600"
              >
                {inspectorManifest ?? <EmptyInspectorSlot label="manifest JSON" />}
              </AppTabPanel>
              <AppTabPanel
                id="telemetry"
                className="rounded-lg border border-zinc-800/80 bg-black/40 p-4 outline-none ring-0 data-focus-visible:ring-1 data-focus-visible:ring-zinc-600"
              >
                {inspectorTelemetry ?? <EmptyInspectorSlot label="telemetry" />}
              </AppTabPanel>
              <AppTabPanel
                id="a11y"
                className="rounded-lg border border-zinc-800/80 bg-black/40 p-4 outline-none ring-0 data-focus-visible:ring-1 data-focus-visible:ring-zinc-600"
              >
                {inspectorA11y ?? <EmptyInspectorSlot label="accessibility log" />}
              </AppTabPanel>
            </AppTabPanels>
          </AppTabs>
        </div>
      </div>
    </div>
  );
}

function ExecutionKey({
  kbd,
  label,
  accent,
  onPress,
}: {
  kbd: string;
  label: string;
  accent?: boolean;
  onPress: () => void;
}) {
  return (
    <AppButton
      variant="quiet"
      size="sm"
      aria-label={`${label} (${kbd})`}
      className={cn(
        "h-9 gap-2 rounded-full border border-transparent px-2.5 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200",
        accent && "hover:border-amber-900/40 hover:bg-amber-950/25 hover:text-amber-300",
      )}
      onPress={onPress}
    >
      <kbd
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-black font-sans text-[10px] text-zinc-300",
          accent && "border-amber-900/50 text-amber-400",
        )}
      >
        {kbd}
      </kbd>
      <span className="hidden font-mono text-[10px] uppercase tracking-widest sm:inline">{label}</span>
    </AppButton>
  );
}
