/**
 * @afenda-owner app-form
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Form for governed shared UI
 */
"use client";

import { Form as ReactAriaForm } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appFormCompositionContract,
  appFormControlSourcePath,
  appFormReactAriaPrimitives,
  type AppFormDensity,
} from "@/components/ui-governance/app-form/app-form.contract.primitive.shared";

export const appFormVariants = cva("flex flex-col", {
  variants: {
    density: {
      default: "gap-6",
      compact: "gap-4",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

type AppFormBaseProps = ComponentProps<typeof ReactAriaForm>;

export type AppFormProps = Omit<AppFormBaseProps, "children" | "className"> & {
  children: ReactNode;
  className?: string;
  density?: AppFormDensity;
};

function assertAppFormPrimitiveContract(children: AppFormProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appFormControlSourcePath.length === 0 ||
    appFormReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppForm governance contract is incomplete.");
  }

  if (
    appFormCompositionContract.requiresChildren &&
    appFormCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppForm composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppForm requires children.");
  }
}

export function AppForm({
  children,
  className,
  density = "default",
  ...props
}: AppFormProps) {
  assertAppFormPrimitiveContract(children);

  return (
    <ReactAriaForm
      {...props}
      className={cn(appFormVariants({ density }), className)}
    >
      {children}
    </ReactAriaForm>
  );
}
