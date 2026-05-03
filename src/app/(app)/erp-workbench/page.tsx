import { redirect } from "next/navigation";

import { getSession } from "@/server/better-auth/auth.session.query.server";

import { ErpRuntimeWorkbench } from "./_components/erp-runtime-workbench.route.surface.client";
import { getErpRuntimeWorkbenchData } from "./_components/erp-workbench.runtime.data.fixture";

export default async function ErpWorkbenchPage() {
  const session = await getSession();
  if (!session) {
    redirect(
      `/sign-in?${new URLSearchParams({
        callbackUrl: "/erp-workbench",
      }).toString()}`,
    );
  }

  return <ErpRuntimeWorkbench workbench={getErpRuntimeWorkbenchData()} />;
}
