import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ClientI18nProvider } from "@/client-runtime/client-runtime.i18n.provider.client";
import { AppToastRegion } from "@/components/ui-governance/app-toast/app-toast.control.primitive.client";
import { AFENDA_METADATA_IMAGE } from "@/lib/afenda-brand-metadata.shared";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";
import { TRPCReactProvider } from "@/trpc/trpc.react.provider.client";

const metadataBase = new URL(publicAppOrigin());

export const metadata: Metadata = {
  metadataBase,
  applicationName: "Afenda",
  title: {
    default: "Afenda",
    template: "%s · Afenda",
  },
  description: "Afenda application dashboard",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/icons/afenda-icon-192-transparent.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/afenda-icon-512-transparent.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/icons/afenda-icon-180-transparent.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
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
    images: [AFENDA_METADATA_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afenda",
    description: "Afenda application dashboard",
    images: [AFENDA_METADATA_IMAGE.url],
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
