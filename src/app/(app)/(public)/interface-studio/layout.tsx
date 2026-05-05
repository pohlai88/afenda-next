/**
 * Segment `(app)/(public)/interface-studio` · Next.js MCP `get_routes` (app router):
 * `/interface-studio`, `/interface-studio/screens`, `/interface-studio/screens/[slug]`,
 * `/interface-studio/ui-blocks`, `/interface-studio/ui-blocks/[slug]`,
 * `/interface-studio/ui-components`, `/interface-studio/ui-components/[slug]`,
 * `/interface-studio/ui-dashboard`, `/interface-studio/ui-dashboard/[slug]`
 *
 * RSC layout wrapping child pages; `@afenda` omitted on App Router convention files per repo guideline
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  INTERFACE_STUDIO_DESCRIPTION,
  INTERFACE_STUDIO_TITLE,
} from "@/app/(app)/(public)/interface-studio/interface-studio.config";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: INTERFACE_STUDIO_TITLE,
    description: INTERFACE_STUDIO_DESCRIPTION,
    type: "website",
  },
};

export default function InterfaceStudioLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
