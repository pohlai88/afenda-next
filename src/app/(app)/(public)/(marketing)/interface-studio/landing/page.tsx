/**
 * Legacy `/interface-studio/landing` — redirect to `/interface-studio/screens`
 */

import { redirect } from "next/navigation";

import { buildInterfaceLabSectionIndexHref } from "@/app/(app)/interface-lab/interface-lab.routes.shared";

export default function InterfaceStudioLegacyLandingIndexRedirect() {
  redirect(buildInterfaceLabSectionIndexHref("studio", "landing"));
}
