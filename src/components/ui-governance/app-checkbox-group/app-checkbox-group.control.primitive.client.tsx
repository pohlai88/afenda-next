/**
 * @afenda-owner app-checkbox-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Checkbox Group for governed shared UI
 */
"use client";

import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  FieldError,
  Label,
  Text,
  type CheckboxGroupProps as ReactAriaCheckboxGroupProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { AppCheckbox } from "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";
import {
  type AppCheckboxGroupOrientation,
  appCheckboxGroupCompositionContract,
  appCheckboxGroupControlSourcePath,
  appCheckboxGroupReactAriaPrimitives,
} from "@/components/ui-governance/app-checkbox-group/app-checkbox-group.contract.primitive.shared";
import { assertHasDirectChildOfType } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appCheckboxGroupVariants = cva(
  ["rac-invalid flex flex-col gap-2 text-foreground"],
  {
    variants: {
      invalid: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

export const appCheckboxGroupItemsVariants = cva("flex gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap items-start",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

function assertAppCheckboxGroupPrimitiveContract(
  children: ReactNode,
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appCheckboxGroupControlSourcePath.length === 0 || appCheckboxGroupReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppCheckboxGroup governance contract is incomplete.");
  }

  if (appCheckboxGroupCompositionContract.requiresChildren && appCheckboxGroupCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppCheckboxGroup composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppCheckboxGroup requires explicit AppCheckbox children.");
  }

  assertHasDirectChildOfType(
    "AppCheckboxGroup",
    children,
    AppCheckbox,
    "AppCheckbox",
  );

  if (label === undefined && ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error(
      "AppCheckboxGroup requires label, aria-label, or aria-labelledby.",
    );
  }
}

type AppCheckboxGroupBehaviorProps = Partial<
  Pick<
  ReactAriaCheckboxGroupProps,
  | "aria-describedby"
  | "aria-details"
  | "aria-errormessage"
  | "aria-label"
  | "aria-labelledby"
  | "defaultValue"
  | "form"
  | "id"
  | "isDisabled"
  | "isInvalid"
  | "isReadOnly"
  | "isRequired"
  | "name"
  | "onBlur"
  | "onChange"
  | "onFocus"
  | "onFocusChange"
  | "slot"
  | "validate"
  | "validationBehavior"
  | "value"
  >
>;

export type AppCheckboxGroupProps = AppCheckboxGroupBehaviorProps & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  label?: ReactNode;
  orientation?: AppCheckboxGroupOrientation;
};

export function AppCheckboxGroup({
  children,
  className,
  description,
  errorMessage,
  label,
  orientation = "vertical",
  ...props
}: AppCheckboxGroupProps) {
  assertAppCheckboxGroupPrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaCheckboxGroup
      {...props}
      className={cn(
        appCheckboxGroupVariants({ invalid: props.isInvalid }),
        className,
      )}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <div className={appCheckboxGroupItemsVariants({ orientation })}>
        {children}
      </div>
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaCheckboxGroup>
  );
}
