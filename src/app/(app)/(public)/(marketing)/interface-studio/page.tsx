/**
 * `/interface-studio` · Studio entry → `landing` section catalog at public path `/interface-studio/screens`
 */

import { redirect } from "next/navigation";

import { buildInterfaceLabSectionIndexHref } from "@/app/(app)/interface-lab/interface-lab.routes.shared";

export default function InterfaceStudioEntryPage() {
  redirect(buildInterfaceLabSectionIndexHref("studio", "landing"));
}
