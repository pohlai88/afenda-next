import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Afenda",
  description: "Afenda application dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
