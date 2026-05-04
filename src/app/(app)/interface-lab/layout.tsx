import type { Metadata } from "next";

import {
  INTERFACE_LAB_DESCRIPTION,
  INTERFACE_LAB_TITLE,
} from "./interface-lab.config";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: INTERFACE_LAB_TITLE,
    description: INTERFACE_LAB_DESCRIPTION,
    type: "website",
  },
};

export default function InterfaceLabLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
