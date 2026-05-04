/**
 * @afenda-owner app-autocomplete
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Autocomplete for governed shared UI
 */
"use client";

import { Autocomplete as ReactAriaAutocomplete, SearchField as ReactAriaSearchField, TextField as ReactAriaTextField, Menu as ReactAriaMenu, ListBox as ReactAriaListBox, TagGroup as ReactAriaTagGroup, GridList as ReactAriaGridList, Table as ReactAriaTable } from "react-aria-components";
import type { ComponentProps, ReactNode } from "react";
import {
  assertHasOneOfDirectChildTypes,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

import {
  appAutocompleteCompositionContract,
  appAutocompleteControlSourcePath,
  appAutocompleteReactAriaPrimitives,
} from "@/components/ui-governance/app-autocomplete/app-autocomplete.contract.primitive.shared";

function assertAppAutocompletePrimitiveContract(children: AppAutocompleteProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appAutocompleteControlSourcePath.length === 0 || appAutocompleteReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppAutocomplete governance contract is incomplete.");
  }

  if (appAutocompleteCompositionContract.requiresChildren && appAutocompleteCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppAutocomplete composition contract is incomplete.");
  }

  assertHasOneOfDirectChildTypes("AppAutocomplete", children, [ReactAriaSearchField, ReactAriaTextField], ["SearchField", "TextField"]);
  assertHasOneOfDirectChildTypes("AppAutocomplete", children, [ReactAriaMenu, ReactAriaListBox, ReactAriaTagGroup, ReactAriaGridList, ReactAriaTable], ["Menu", "ListBox", "TagGroup", "GridList", "Table"]);
}

type AppAutocompleteBaseProps = ComponentProps<typeof ReactAriaAutocomplete>;

export type AppAutocompleteProps = Omit<AppAutocompleteBaseProps, "children"> & {
  children: ReactNode;
};

export function AppAutocomplete({ children, ...props }: AppAutocompleteProps) {
  assertAppAutocompletePrimitiveContract(children);
  return <ReactAriaAutocomplete {...props}>{children}</ReactAriaAutocomplete>;
}
