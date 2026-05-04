/**
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared Zod manifest contract for approved UI components and strict approval rules
 *
 * Next.js: this module is **shared** (no `"use client"`). It may run on the server or be pulled into
 * client bundles only where imported — keep manifests **serializable** if they cross the Server /
 * Client boundary (see `/docs/app/getting-started/server-and-client-components`).
 *
 * @see ./governance.ui.registry.shared.ts
 */
import { z } from "zod";

/** Non-empty display / module path; build and TS own real path correctness. */
const pathLikeString = z.string().trim().min(1);

const nonEmptyString = z.string().trim().min(1);

/** Lifecycle for registry entries (workbench + future guards). */
export const manifestStatusSchema = z.enum([
  "draft",
  "review",
  "approved",
  "deprecated",
]);

export const manifestCategorySchema = z.enum([
  "primitive",
  "component",
  "block",
  "pattern",
]);

export const manifestBoundarySchema = z.enum(["client", "server", "shared"]);

export const coverageSchema = z.enum([
  "verified",
  "missing",
  "not-applicable",
  "unknown",
]);

export const strictCoverageSchema = z.enum(["verified", "not-applicable"]);

export const styleSourceSchema = z.object({
  exportName: nonEmptyString,
  sourcePath: pathLikeString,
  /** `cva` is cross-checked against `cva`; other kinds are declared only until guards need them. */
  type: z.enum(["cva", "className", "css"]),
});

const manifestPropsSchema = z
  .object({
    required: z.array(nonEmptyString).default([]),
    optional: z.array(nonEmptyString).default([]),
  })
  .superRefine((props, ctx) => {
    if (new Set(props.required).size !== props.required.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required props must be unique.",
        path: ["required"],
      });
    }

    if (new Set(props.optional).size !== props.optional.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Optional props must be unique.",
        path: ["optional"],
      });
    }

    if (props.required.some((requiredProp) => props.optional.includes(requiredProp))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A prop cannot be both required and optional.",
        path: ["optional"],
      });
    }
  });

const manifestCompositionSchema = z
  .object({
    requiresChildren: z.boolean().default(false),
    requiredElements: z.array(nonEmptyString).default([]),
    optionalElements: z.array(nonEmptyString).default([]),
    notes: z.array(nonEmptyString).default([]),
  })
  .superRefine((composition, ctx) => {
    if (
      composition.requiresChildren &&
      composition.requiredElements.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Composition that requires children must declare requiredElements.",
        path: ["requiredElements"],
      });
    }
  });

const manifestTokenContractSchema = z.object({
  semanticColors: z.array(nonEmptyString).default([]),
  radii: z.array(nonEmptyString).default([]),
  typography: z.array(nonEmptyString).default([]),
});

const cvaVariantSchema = z
  .object({
    values: z.array(nonEmptyString).min(1),
    default: nonEmptyString.optional(),
    required: z.boolean().default(false),
  })
  .superRefine((variant, ctx) => {
    if (variant.default && !variant.values.includes(variant.default)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "`default` must be one of `values`.",
        path: ["default"],
      });
    }
  });

const cvaContractSchema = z.record(
  nonEmptyString,
  z
    .object({
      required: z.boolean().default(true),
      variants: z.record(nonEmptyString, cvaVariantSchema),
    })
    .superRefine((contract, ctx) => {
      if (Object.keys(contract.variants).length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVA contract must define at least one variant.",
          path: ["variants"],
        });
      }
    }),
);

export const manifestVerdictSchema = z.object({
  cvaCoverage: coverageSchema,
  a11yCoverage: coverageSchema,
  usageCoverage: z.enum(["verified", "missing", "unknown"]),
  sourceCoverage: z.enum(["verified", "missing", "unknown"]),
});

export const approvedComponentManifestSchema = z
  .object({
    id: nonEmptyString,
    owner: nonEmptyString,
    exportName: nonEmptyString,
    status: manifestStatusSchema,

    category: manifestCategorySchema,
    boundary: manifestBoundarySchema,

    sourcePath: pathLikeString,

    styleSources: z.array(styleSourceSchema).default([]),
    reactAriaPrimitives: z
      .array(nonEmptyString)
      .default([])
      .describe(
        "Informational React Aria labels for humans and docs; not validated against a catalog.",
      ),

    cva: cvaContractSchema.default({}),

    props: manifestPropsSchema,
    composition: manifestCompositionSchema.default(() => ({
      requiresChildren: false,
      requiredElements: [],
      optionalElements: [],
      notes: [],
    })),

    a11y: z.object({
      required: z.boolean(),
      notes: z.array(nonEmptyString).default([]),
    }),

    usage: z.object({
      useWhen: z.array(nonEmptyString).default([]),
      avoidWhen: z.array(nonEmptyString).default([]),
    }),

    constraints: z.array(nonEmptyString).default([]),
    tokens: manifestTokenContractSchema.default(() => ({
      semanticColors: [],
      radii: [],
      typography: [],
    })),

    verdict: manifestVerdictSchema,
  })
  .superRefine((manifest, ctx) => {
    const seenStyleSourceExportNames = new Map<string, number>();

    manifest.styleSources.forEach((source, index) => {
      const priorIndex = seenStyleSourceExportNames.get(source.exportName);

      if (priorIndex !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate style source exportName "${source.exportName}".`,
          path: ["styleSources", index, "exportName"],
        });
      }

      seenStyleSourceExportNames.set(source.exportName, index);
    });

    const cvaStyleSources = manifest.styleSources.filter(
      (source) => source.type === "cva",
    );
    const cvaStyleSourceNames = new Set(
      cvaStyleSources.map((source) => source.exportName),
    );

    for (const source of cvaStyleSources) {
      const contract = manifest.cva[source.exportName];

      if (!contract) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `CVA style source "${source.exportName}" must have matching cva contract.`,
          path: ["cva", source.exportName],
        });
      }
    }

    for (const exportName of Object.keys(manifest.cva)) {
      if (!cvaStyleSourceNames.has(exportName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `CVA contract "${exportName}" must have matching cva style source.`,
          path: ["styleSources"],
        });
      }
    }

    if (manifest.status === "approved") {
      const strictVerdictFields: Array<keyof typeof manifest.verdict> = [
        "cvaCoverage",
        "a11yCoverage",
        "usageCoverage",
        "sourceCoverage",
      ];

      for (const field of strictVerdictFields) {
        const value = manifest.verdict[field];
        const strictOk = strictCoverageSchema.safeParse(value);

        if (!strictOk.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Approved manifest cannot have verdict.${field} = "${String(value)}".`,
            path: ["verdict", field],
          });
        }
      }

      if (manifest.usage.useWhen.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Approved manifest must define usage.useWhen with at least one entry.",
          path: ["usage", "useWhen"],
        });
      }

      if (manifest.styleSources.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Approved manifest must declare styleSources.",
          path: ["styleSources"],
        });
      }

      if (manifest.a11y.required && manifest.a11y.notes.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Approved manifest must include a11y notes.",
          path: ["a11y", "notes"],
        });
      }

      if (Object.keys(manifest.cva).length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Approved manifest must declare CVA contract.",
          path: ["cva"],
        });
      }

      if (
        manifest.props.required.includes("children") &&
        !manifest.composition.requiresChildren
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Approved manifest that requires "children" must declare composition.requiresChildren.',
          path: ["composition", "requiresChildren"],
        });
      }

      if (
        manifest.props.required.includes("children") &&
        manifest.composition.requiredElements.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Approved manifest that requires "children" must declare composition.requiredElements.',
          path: ["composition", "requiredElements"],
        });
      }
    }
  });

export type ApprovedComponentManifest = z.infer<
  typeof approvedComponentManifestSchema
>;

export type ManifestLifecycleStatus = z.infer<typeof manifestStatusSchema>;
export type ManifestCategory = z.infer<typeof manifestCategorySchema>;
export type ManifestBoundary = z.infer<typeof manifestBoundarySchema>;
export type ManifestStyleSource = z.infer<typeof styleSourceSchema>;
export type ManifestVerdict = z.infer<typeof manifestVerdictSchema>;
export type ManifestCoverage = z.infer<typeof coverageSchema>;

export type GovernedManifestIdentity = Pick<
  ApprovedComponentManifest,
  "id" | "exportName" | "status" | "category" | "boundary"
>;

export function defineApprovedComponentManifest<
  T extends z.input<typeof approvedComponentManifestSchema>,
>(manifest: T): ApprovedComponentManifest {
  return approvedComponentManifestSchema.parse(manifest);
}

/** Non-throwing parse for tooling, CI, and incremental migration from legacy manifests. */
export function safeParseApprovedComponentManifest(candidate: unknown) {
  return approvedComponentManifestSchema.safeParse(candidate);
}
