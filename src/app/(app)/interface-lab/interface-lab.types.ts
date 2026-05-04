export type InterfaceLabSection =
  | "components"
  | "blocks"
  | "erp-patterns"
  | "landing"
  | "dashboard";

export type InterfaceLabStatus =
  | "approved"
  | "candidate"
  | "experimental"
  | "deprecated";

export type InterfaceLabTemplateKind =
  | "screen"
  | "component"
  | "pattern"
  | "block"
  | "state"
  | "asset";

export type InterfaceLabStudioProperties = {
  viewport?: string;
  density?: string;
  motion?: string;
  dataState?: string;
  tokenUsage?: string;
  source?: string;
  exportReadiness?: string;
};

export type InterfaceLabStudioMeta = {
  operatorValue?: string;
  anatomy?: string[];
  evidence?: string[];
  templateKind?: InterfaceLabTemplateKind;
  remixPrompts?: string[];
  canvasPreset?: string;
  properties?: InterfaceLabStudioProperties;
  exportTargets?: string[];
};

export type InterfaceLabItem = {
  slug: string;
  title: string;
  description: string;
  section: InterfaceLabSection;
  status: InterfaceLabStatus;
  category: string;
  /** When set, row is derived from `uiComponentRegistry` (governance manifest id). */
  registryId?: string;
  tags?: string[];
  preview?: {
    label: string;
    description?: string;
  };
  studio?: InterfaceLabStudioMeta;
};
