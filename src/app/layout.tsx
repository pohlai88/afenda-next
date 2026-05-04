import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ClientI18nProvider } from "@/client-runtime/client-runtime.i18n.provider.client";
import { AppToastRegion } from "@/components/ui-governance/app-toast/app-toast.control.primitive.client";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";
import { TRPCReactProvider } from "@/trpc/trpc.react.provider.client";

const metadataBase = new URL(publicAppOrigin());

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Afenda",
    template: "%s · Afenda",
  },
  description: "Afenda application dashboard",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Afenda",
    title: "Afenda",
    description: "Afenda application dashboard",
    url: metadataBase,
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const defaultLocale = "en-US";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.variable} dir="ltr" lang={defaultLocale}>
      <body className="antialiased">
        <TRPCReactProvider>
          <ClientI18nProvider lang={defaultLocale}>{children}</ClientI18nProvider>
        </TRPCReactProvider>
        <AppToastRegion />
      </body>
    </html>
  );
}
