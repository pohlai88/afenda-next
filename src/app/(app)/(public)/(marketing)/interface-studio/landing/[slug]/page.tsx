/**
 * Legacy `/interface-studio/landing/[slug]` — redirect to `/interface-studio/screens/[slug]`
 */

import { redirect } from "next/navigation";

import { buildInterfaceLabItemHref } from "@/app/(app)/interface-lab/interface-lab.routes.shared";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function InterfaceStudioLegacyLandingSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(buildInterfaceLabItemHref("studio", "landing", slug));
}
