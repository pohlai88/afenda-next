/**
 * @afenda-owner interface-lab
 * @afenda-subject ui-blocks
 * @afenda-artifact types
 * @afenda-boundary shared
 * @afenda-description Structural types for the Interface Lab five-zone app shell (void, nav, oracle, execution, inspector).
 */
import type { ReactNode } from "react";

export type AppShellInterfaceExecutionAction =
  | "copy-code"
  | "copy-manifest"
  | "variants"
  | "ai-help"
  | "export";

export type AppShellInterfaceNavItem = {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
};

export type AppShellInterfaceNavGroup = {
  id: string;
  label: string;
  items: AppShellInterfaceNavItem[];
};

export type AppShellInterfaceCommandItem = {
  id: string;
  label: string;
  hint?: string;
  onSelect?: () => void;
};

export type AppShellInterfaceProps = {
  /** Zone 1 — centered specimen; keep chrome inside the child if needed. */
  children: ReactNode;
  className?: string;
  onNavItemPress?: (item: AppShellInterfaceNavItem) => void;
  /** Shown when the left nav header expands. */
  labTitle?: string;
  navGroups?: AppShellInterfaceNavGroup[];
  commandItems?: AppShellInterfaceCommandItem[];
  /** Zone 5 — inspector tab bodies (read-only surfaces). */
  inspectorSchema?: ReactNode;
  inspectorManifest?: ReactNode;
  inspectorTelemetry?: ReactNode;
  inspectorA11y?: ReactNode;
  /** Tailwind height class for the raised inspector drawer (viewport fraction). */
  inspectorHeightClassName?: string;
  onExecutionAction?: (action: AppShellInterfaceExecutionAction) => void;
};
