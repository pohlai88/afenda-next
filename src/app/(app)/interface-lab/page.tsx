import type { Metadata } from "next";

import { InterfaceLabRootSurface } from "./_components/interface-lab-root-surface.client";
import { INTERFACE_LAB_DESCRIPTION, INTERFACE_LAB_TITLE } from "./interface-lab.config";
import { getInterfaceLabStudioSummary } from "./interface-lab.studio.shared";

export const metadata: Metadata = {
  title: INTERFACE_LAB_TITLE,
  description: INTERFACE_LAB_DESCRIPTION,
};

export default function InterfaceLabPage() {
  const studioSummary = getInterfaceLabStudioSummary();

  return <InterfaceLabRootSurface studioSummary={studioSummary} />;
}
