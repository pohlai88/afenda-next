/**
 * Legacy `/interface-studio/landing/[slug]` — redirect to `/interface-studio/screens/[slug]`
 */

import { redirect } from "next/navigation";

import { buildInterfaceStudioItemHref } from "@/app/(app)/(public)/interface-studio/interface-studio.routes.shared";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function InterfaceStudioLegacyLandingSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(buildInterfaceStudioItemHref("studio", "landing", slug));
}
