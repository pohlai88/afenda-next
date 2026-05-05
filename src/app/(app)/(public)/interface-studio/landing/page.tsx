/**
 * Legacy `/interface-studio/landing` — redirect to `/interface-studio/screens`
 */

import { redirect } from "next/navigation";

import { buildInterfaceStudioSectionIndexHref } from "@/app/(app)/(public)/interface-studio/interface-studio.routes.shared";

export default function InterfaceStudioLegacyLandingIndexRedirect() {
  redirect(buildInterfaceStudioSectionIndexHref("studio", "landing"));
}
