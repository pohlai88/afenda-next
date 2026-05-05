/**
 * `/interface-studio` · Studio entry → `landing` section catalog at public path `/interface-studio/screens`
 */

import { redirect } from "next/navigation";

import { buildInterfaceStudioSectionIndexHref } from "@/app/(app)/(public)/interface-studio/interface-studio.routes.shared";

export default function InterfaceStudioEntryPage() {
  redirect(buildInterfaceStudioSectionIndexHref("studio", "landing"));
}
