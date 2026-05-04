/**
 * @afenda-owner interface-lab
 * @afenda-subject root-surface
 * @afenda-boundary client
 * @afenda-description Lab home: five-zone void shell with catalog routing; catalog sections keep InterfaceLabShell.
 */
"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { AppShellInterface } from "@/components/ui-blocks/app-shell-interface/app-shell-interface.client";
import type { AppShellInterfaceNavGroup } from "@/components/ui-blocks/app-shell-interface/app-shell-interface.types.shared";

import { INTERFACE_LAB_SECTIONS, INTERFACE_LAB_TITLE } from "../interface-lab.config";
import type { InterfaceLabRouteSurface } from "../interface-lab.routes.shared";
import {
  buildInterfaceLabSectionNavHref,
  buildInterfaceLabStudioHomeHref,
} from "../interface-lab.routes.shared";

export type InterfaceLabRootSurfaceProps = {
  studioSummary: {
    total: number;
    approved: number;
    candidate: number;
    experimental: number;
    deprecated: number;
    sections: number;
    governedComponents: number;
    workflowPreviews: number;
  };
  routeSurface?: InterfaceLabRouteSurface;
};

function navActive(pathname: string, href: string, homeHref: string): boolean {
  if (href === homeHref) {
    return pathname === homeHref;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function InterfaceLabRootSurface({
  studioSummary,
  routeSurface = "lab",
}: InterfaceLabRootSurfaceProps) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const homeHref = buildInterfaceLabStudioHomeHref(routeSurface);

  const navGroups = useMemo((): AppShellInterfaceNavGroup[] => {
    const sections = INTERFACE_LAB_SECTIONS;
    const landing = sections.find((s) => s.id === "landing");
    const dashboard = sections.find((s) => s.id === "dashboard");
    const components = sections.find((s) => s.id === "components");
    const blocks = sections.find((s) => s.id === "blocks");
    const erp = sections.find((s) => s.id === "erp-patterns");

    const screens: AppShellInterfaceNavGroup["items"] = [];
    if (landing !== undefined) {
      const landingHref = buildInterfaceLabSectionNavHref(routeSurface, landing.id);
      screens.push({
        id: landing.id,
        label: landing.title,
        href: landingHref,
        active: navActive(pathname, landingHref, homeHref),
      });
    }
    if (dashboard !== undefined) {
      const dashboardHref = buildInterfaceLabSectionNavHref(routeSurface, dashboard.id);
      screens.push({
        id: dashboard.id,
        label: dashboard.title,
        href: dashboardHref,
        active: navActive(pathname, dashboardHref, homeHref),
      });
    }

    const groups: AppShellInterfaceNavGroup[] = [
      {
        id: "config",
        label: "Config",
        items: [
          {
            id: "lab-home",
            label: routeSurface === "studio" ? "Studio home" : "Lab home",
            href: homeHref,
            active: pathname === homeHref,
          },
        ],
      },
    ];

    if (components !== undefined) {
      const componentsHref = buildInterfaceLabSectionNavHref(routeSurface, components.id);
      groups.push({
        id: "primitives",
        label: "Primitives",
        items: [
          {
            id: components.id,
            label: components.title,
            href: componentsHref,
            active: navActive(pathname, componentsHref, homeHref),
          },
        ],
      });
    }

    if (blocks !== undefined) {
      const blocksHref = buildInterfaceLabSectionNavHref(routeSurface, blocks.id);
      groups.push({
        id: "blocks",
        label: "Blocks",
        items: [
          {
            id: blocks.id,
            label: blocks.title,
            href: blocksHref,
            active: navActive(pathname, blocksHref, homeHref),
          },
        ],
      });
    }

    if (erp !== undefined) {
      const erpHref = buildInterfaceLabSectionNavHref(routeSurface, erp.id);
      groups.push({
        id: "erp-patterns",
        label: "ERP patterns",
        items: [
          {
            id: erp.id,
            label: erp.title,
            href: erpHref,
            active: navActive(pathname, erpHref, homeHref),
          },
        ],
      });
    }

    if (screens.length > 0) {
      groups.push({
        id: "screens",
        label: "Screens",
        items: screens,
      });
    }

    return groups;
  }, [homeHref, pathname, routeSurface]);

  const commandItems = useMemo(
    () =>
      INTERFACE_LAB_SECTIONS.flatMap((section) => {
        const href = buildInterfaceLabSectionNavHref(routeSurface, section.id);
        return [
          {
            id: `go-${section.id}`,
            label: `Open ${section.title}`,
            hint: href,
            onSelect: () => {
              router.push(href);
            },
          },
        ];
      }),
    [router, routeSurface],
  );

  return (
    <AppShellInterface
      labTitle={INTERFACE_LAB_TITLE}
      navGroups={navGroups}
      commandItems={commandItems}
      onNavItemPress={(item) => {
        if (item.href !== undefined && item.href.length > 0) {
          router.push(item.href as Route);
        }
      }}
      inspectorSchema={
        <div className="space-y-3 text-sm leading-6 text-zinc-400">
          <p>
            This route is the lab <span className="text-zinc-200">void entry</span>: Zone 1 is specimen-only;
            catalogs and detail previews use <code className="text-zinc-300">InterfaceLabShell</code> on their own
            URLs.
          </p>
          <ul className="list-inside list-disc space-y-1 font-mono text-xs text-zinc-500">
            <li>Zone 1 — void canvas</li>
            <li>Zone 2 — left index (this nav)</li>
            <li>Zone 3 — ⌘K oracle</li>
            <li>Zone 4 — execution keys</li>
            <li>Zone 5 — inspector drawer</li>
          </ul>
        </div>
      }
      inspectorManifest={
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-400">
          {JSON.stringify(studioSummary, null, 2)}
        </pre>
      }
      inspectorTelemetry={
        <p className="text-sm text-zinc-500">
          Telemetry hooks are not wired on the home void. Attach traces or client metrics from a specimen route when
          needed.
        </p>
      }
      inspectorA11y={
        <p className="text-sm text-zinc-500">
          Accessibility logs for a specimen belong with that preview. Open a component or template detail to run
          governed primitives in context.
        </p>
      }
    >
      <div className="max-w-md px-4 text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-600">
          {routeSurface === "studio" ? "Preview studio" : "Interface lab"}
        </p>
        <h1 className="mt-3 text-lg font-semibold tracking-tight text-zinc-100">Void entry</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Silent canvas for specimens. Use the index, <kbd className="rounded border border-zinc-800 px-1">⌘K</kbd>,
          or the links below to reach catalogs and previews.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {INTERFACE_LAB_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={buildInterfaceLabSectionNavHref(routeSurface, section.id)}
              className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-100"
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>
    </AppShellInterface>
  );
}
