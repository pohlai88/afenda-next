import {
  Children,
  isValidElement,
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
} from "react";

type DirectChildType = string | JSXElementConstructor<any>;

export function getDirectElementChildren(children: ReactNode): ReactElement[] {
  return Children.toArray(children).filter(isValidElement) as ReactElement[];
}

export function hasDirectChildOfType(
  children: ReactNode,
  childType: DirectChildType,
): boolean {
  return getDirectElementChildren(children).some(
    (child) => child.type === childType,
  );
}

export function assertHasDirectChildOfType(
  componentName: string,
  children: ReactNode,
  childType: DirectChildType,
  childLabel: string,
): void {
  if (!hasDirectChildOfType(children, childType)) {
    throw new Error(
      `${componentName} requires ${childLabel} as a direct child.`,
    );
  }
}

export function assertHasOneOfDirectChildTypes(
  componentName: string,
  children: ReactNode,
  childTypes: readonly DirectChildType[],
  childLabels: readonly string[],
): void {
  if (childTypes.some((childType) => hasDirectChildOfType(children, childType))) {
    return;
  }

  throw new Error(
    `${componentName} requires one of ${childLabels.join(", ")} as a direct child.`,
  );
}

export function assertSingleDirectElementChild(
  componentName: string,
  children: ReactNode,
): void {
  if (getDirectElementChildren(children).length !== 1) {
    throw new Error(
      `${componentName} requires exactly one direct React element child.`,
    );
  }
}
