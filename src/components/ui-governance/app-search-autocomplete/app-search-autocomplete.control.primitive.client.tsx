/**
 * @afenda-owner app-search-autocomplete
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Thin client control surface wrapping React Aria Autocomplete for ERP lookups
 */
"use client";

import {
  Autocomplete as ReactAriaAutocomplete,
  GridList,
  ListBox,
  Menu,
  SearchField,
  Table,
  TagGroup,
  TextField,
  type AutocompleteProps as ReactAriaAutocompleteProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { isValidElement, type ReactElement } from "react";

import { cn } from "@/components/cn";
import {
  type AppSearchAutocompleteDensity,
  type AppSearchAutocompleteLayout,
} from "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.contract.primitive.shared";

export const appSearchAutocompleteContainerVariants = cva("flex min-w-0", {
  variants: {
    layout: {
      stack: "flex-col gap-2",
      inline: "flex-row items-center gap-2",
    },
    density: {
      default: "text-body",
      compact: "text-label",
    },
  },
  defaultVariants: {
    layout: "stack",
    density: "default",
  },
});

type AppSearchAutocompleteInputElement =
  | ReactElement<unknown, typeof SearchField>
  | ReactElement<unknown, typeof TextField>;

type AppSearchAutocompleteCollectionElement =
  | ReactElement<unknown, typeof Menu>
  | ReactElement<unknown, typeof ListBox>
  | ReactElement<unknown, typeof TagGroup>
  | ReactElement<unknown, typeof GridList>
  | ReactElement<unknown, typeof Table>;

type AppSearchAutocompleteChildren = readonly [
  AppSearchAutocompleteInputElement,
  AppSearchAutocompleteCollectionElement,
];

type AppSearchAutocompleteBehaviorProps<T extends object> = {
  filter?: Exclude<ReactAriaAutocompleteProps<T>["filter"], undefined>;
  inputValue?: Exclude<ReactAriaAutocompleteProps<T>["inputValue"], undefined>;
  defaultInputValue?: Exclude<
    ReactAriaAutocompleteProps<T>["defaultInputValue"],
    undefined
  >;
  onInputChange?: Exclude<
    ReactAriaAutocompleteProps<T>["onInputChange"],
    undefined
  >;
  disableAutoFocusFirst?: Exclude<
    ReactAriaAutocompleteProps<T>["disableAutoFocusFirst"],
    undefined
  >;
  disableVirtualFocus?: Exclude<
    ReactAriaAutocompleteProps<T>["disableVirtualFocus"],
    undefined
  >;
};

export type AppSearchAutocompleteProps<T extends object = object> =
  AppSearchAutocompleteBehaviorProps<T> &
    VariantProps<typeof appSearchAutocompleteContainerVariants> & {
      children: AppSearchAutocompleteChildren;
      containerClassName?: string;
      layout?: AppSearchAutocompleteLayout;
      density?: AppSearchAutocompleteDensity;
    };

function isAutocompleteInputElement(
  child: unknown,
): child is AppSearchAutocompleteInputElement {
  return (
    isValidElement(child) &&
    (child.type === SearchField || child.type === TextField)
  );
}

function isAutocompleteCollectionElement(
  child: unknown,
): child is AppSearchAutocompleteCollectionElement {
  return (
    isValidElement(child) &&
    (child.type === Menu ||
      child.type === ListBox ||
      child.type === TagGroup ||
      child.type === GridList ||
      child.type === Table)
  );
}

function assertValidAutocompleteChildren(
  children: AppSearchAutocompleteChildren,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  const [inputChild, collectionChild] = children;

  if (!isAutocompleteInputElement(inputChild)) {
    throw new Error(
      "AppSearchAutocomplete requires SearchField or TextField as the first direct child.",
    );
  }

  if (!isAutocompleteCollectionElement(collectionChild)) {
    throw new Error(
      "AppSearchAutocomplete requires Menu, ListBox, TagGroup, GridList, or Table as the second direct child.",
    );
  }
}

export function AppSearchAutocomplete<T extends object = object>({
  containerClassName,
  layout,
  density,
  children,
  filter,
  inputValue,
  defaultInputValue,
  onInputChange,
  disableAutoFocusFirst,
  disableVirtualFocus,
}: AppSearchAutocompleteProps<T>) {
  assertValidAutocompleteChildren(children);

  const autocompleteProps: AppSearchAutocompleteBehaviorProps<T> = {
    ...(filter !== undefined ? { filter } : {}),
    ...(inputValue !== undefined ? { inputValue } : {}),
    ...(defaultInputValue !== undefined ? { defaultInputValue } : {}),
    ...(onInputChange !== undefined ? { onInputChange } : {}),
    ...(disableAutoFocusFirst !== undefined ? { disableAutoFocusFirst } : {}),
    ...(disableVirtualFocus !== undefined ? { disableVirtualFocus } : {}),
  };

  return (
    <div
      className={cn(
        appSearchAutocompleteContainerVariants({ layout, density }),
        containerClassName,
      )}
    >
      <ReactAriaAutocomplete {...autocompleteProps}>{children}</ReactAriaAutocomplete>
    </div>
  );
}
