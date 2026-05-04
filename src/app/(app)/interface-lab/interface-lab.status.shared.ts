import { cn } from "@/components/cn";

import type { InterfaceLabStatus } from "./interface-lab.types";

export function getInterfaceLabStatusBadgeClassName(status: InterfaceLabStatus) {
  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
    status === "approved" &&
      "border-verified/35 bg-verified-soft text-verified-foreground",
    status === "candidate" &&
      "border-warning/35 bg-warning-soft text-warning-foreground",
    status === "experimental" &&
      "border-info/35 bg-info-soft text-info-foreground",
    status === "deprecated" &&
      "border-danger/35 bg-danger-soft text-danger-foreground",
  );
}
