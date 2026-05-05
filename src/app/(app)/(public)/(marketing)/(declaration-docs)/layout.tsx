import type { ReactNode } from "react";

export const dynamic = "force-static";

export default function MarketingDeclarationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
