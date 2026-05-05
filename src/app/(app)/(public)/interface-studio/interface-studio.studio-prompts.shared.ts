import type { InterfaceStudioSection } from "./interface-studio.types";

export type InterfaceStudioStudioPromptPreset = {
  id: string;
  label: string;
  prompt: string;
  intent: string;
  targetSection?: InterfaceStudioSection;
};

export const interfaceLabStudioPromptPresets: InterfaceStudioStudioPromptPreset[] = [
  {
    id: "dense-approval-console",
    label: "Approval console",
    prompt: "Create a dense approval console with queue, evidence, and next actions.",
    intent: "Compose",
    targetSection: "dashboard",
  },
  {
    id: "mobile-command-view",
    label: "Mobile command",
    prompt: "Remix this as a mobile command view with thumb-friendly decisions.",
    intent: "Remix",
    targetSection: "blocks",
  },
  {
    id: "exception-state-variants",
    label: "Exception states",
    prompt: "Generate exception-state variants for empty, blocked, overdue, and warning data.",
    intent: "Prototype",
    targetSection: "erp-patterns",
  },
  {
    id: "inspector-drawer",
    label: "Inspector drawer",
    prompt: "Prototype a right-side inspector with properties, layers, and export readiness.",
    intent: "Inspect",
    targetSection: "components",
  },
  {
    id: "design-spec-export",
    label: "Export spec",
    prompt: "Prepare this template for React, design spec, and preview-link export.",
    intent: "Export",
  },
];

export function getInterfaceStudioStudioPromptPresets(limit?: number) {
  if (limit === undefined) {
    return interfaceLabStudioPromptPresets;
  }

  return interfaceLabStudioPromptPresets.slice(0, limit);
}
