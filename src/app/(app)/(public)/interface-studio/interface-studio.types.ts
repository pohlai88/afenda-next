export type InterfaceStudioSection =
  | "components"
  | "blocks"
  | "erp-patterns"
  | "landing"
  | "dashboard";

export type InterfaceStudioStatus =
  | "approved"
  | "candidate"
  | "experimental"
  | "deprecated";

export type InterfaceStudioTemplateKind =
  | "screen"
  | "component"
  | "pattern"
  | "block"
  | "state"
  | "asset";

export type InterfaceStudioStudioProperties = {
  viewport?: string;
  density?: string;
  motion?: string;
  dataState?: string;
  tokenUsage?: string;
  source?: string;
  exportReadiness?: string;
};

export type InterfaceStudioStudioMeta = {
  operatorValue?: string;
  anatomy?: string[];
  evidence?: string[];
  templateKind?: InterfaceStudioTemplateKind;
  remixPrompts?: string[];
  canvasPreset?: string;
  properties?: InterfaceStudioStudioProperties;
  exportTargets?: string[];
};

export type InterfaceStudioItem = {
  slug: string;
  title: string;
  description: string;
  section: InterfaceStudioSection;
  status: InterfaceStudioStatus;
  category: string;
  /** When set, row is derived from `uiComponentRegistry` (governance manifest id). */
  registryId?: string;
  tags?: string[];
  preview?: {
    label: string;
    description?: string;
  };
  studio?: InterfaceStudioStudioMeta;
};
