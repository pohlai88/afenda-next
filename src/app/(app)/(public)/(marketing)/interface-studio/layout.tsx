/**
 * Segment `(app)/(public)/(marketing)/interface-studio` · Next.js MCP `get_routes` (app router):
 * `/interface-studio`, `/interface-studio/screens`, `/interface-studio/screens/[slug]`,
 * `/interface-studio/ui-blocks`, `/interface-studio/ui-blocks/[slug]`,
 * `/interface-studio/ui-components`, `/interface-studio/ui-components/[slug]`,
 * `/interface-studio/ui-dashboard`, `/interface-studio/ui-dashboard/[slug]`
 *
 * RSC layout wrapping child pages; `@afenda` omitted on App Router convention files per repo guideline
 */

import type { Metadata } from "next";

import {
  INTERFACE_LAB_DESCRIPTION,
  INTERFACE_LAB_TITLE,
} from "@/app/(app)/interface-lab/interface-lab.config";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: INTERFACE_LAB_TITLE,
    description: INTERFACE_LAB_DESCRIPTION,
    type: "website",
  },
};

export default function InterfaceStudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
