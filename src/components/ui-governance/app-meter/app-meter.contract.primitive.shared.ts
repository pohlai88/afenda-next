/**
 * @afenda-owner app-meter
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-meter client and manifest shared boundary
 */

export const appMeterControlSourcePath =
  "@/components/ui-governance/app-meter/app-meter.control.primitive.client";

export const appMeterSizeValues = ["md", "sm"] as const;
export type AppMeterSize = (typeof appMeterSizeValues)[number];

export const appMeterToneValues = [
  "auto",
  "accent",
  "success",
  "warning",
  "danger",
] as const;
export type AppMeterTone = (typeof appMeterToneValues)[number];

export const appMeterRequiredPropNames = [] as const;

export const appMeterOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "formatOptions",
  "id",
  "label",
  "maxValue",
  "minValue",
  "render",
  "size",
  "slot",
  "style",
  "tone",
  "value",
  "valueLabel",
] as const;

export const appMeterReactAriaPrimitives = ["Meter", "Label"] as const;

export const appMeterCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["Label"],
  notes: [
    "AppMeter owns the meter surface, inline label/value row, and track/fill treatment for read-only bounded quantities.",
    "Provide label, aria-label, or aria-labelledby so operators and assistive technology can identify the measured quantity.",
    "Default auto tone maps the fill to success below 70%, warning from 70% to 89%, and danger at 90% or above.",
  ],
} as const;

export const appMeterTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-border",
    "--color-danger",
    "--color-field",
    "--color-foreground",
    "--color-success",
    "--color-warning",
  ] as const,
  radii: [] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
