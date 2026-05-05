/**
 * @afenda-owner interface-studio
 * @afenda-subject catalog
 * @afenda-boundary client
 * @afenda-description Catalog search synced to ?q= for shareable filtered Interface Studio lists.
 */
"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useTransition } from "react";

import { AppSearchField } from "@/components/ui-governance/app-search-field/app-search-field.control.primitive.client";

type InterfaceStudioCatalogToolbarProps = {
  /** Accessible label for the search field. */
  "aria-label": string;
};

export function InterfaceStudioCatalogToolbar(props: InterfaceStudioCatalogToolbarProps) {
  const { "aria-label": ariaLabel } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pushQuery = useCallback(
    (nextQ: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = nextQ.trim();
      if (trimmed.length === 0) {
        params.delete("q");
      } else {
        params.set("q", trimmed);
      }
      const query = params.toString();
      const href = query.length > 0 ? `${pathname}?${query}` : pathname;
      startTransition(() => {
        router.replace(href as Route, { scroll: false });
        router.refresh();
      });
    },
    [pathname, router, searchParams],
  );

  const schedulePush = useCallback(
    (value: string) => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        pushQuery(value);
      }, 280);
    },
    [pushQuery],
  );

  useEffect(
    () => () => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  return (
    <div className="space-y-2">
      <AppSearchField
        key={`${pathname}?${searchParams.toString()}`}
        aria-label={ariaLabel}
        placeholder="Search templates..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(next) => {
          const value = String(next);
          schedulePush(value);
        }}
      />
      {isPending ? (
        <p className="type-meta text-foreground-muted" aria-live="polite">
          Updating…
        </p>
      ) : null}
    </div>
  );
}
