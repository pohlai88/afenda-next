import type { Metadata } from "next";

import { MarketingLandingSurface } from "./_components/marketing-landing.surface.view.shared";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Afenda Palinter | ERP Decisions With Proof",
  description:
    "Afenda unifies workflow signal, policy logic, and evidence lineage so ERP teams execute faster with accountable outcomes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Afenda Palinter | ERP Decisions With Proof",
    description:
      "Afenda unifies workflow signal, policy logic, and evidence lineage so ERP teams execute faster with accountable outcomes.",
    type: "website",
    url: "/",
  },
};

export default function MarketingLandingPage() {
  return <MarketingLandingSurface />;
}
