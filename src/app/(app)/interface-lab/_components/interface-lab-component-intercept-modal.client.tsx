/**
 * @afenda-owner interface-lab
 * @afenda-subject intercept-modal
 * @afenda-boundary client
 * @afenda-description Dismissible modal shell for intercepted component routes; closes with router.back().
 */
"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { AppModal } from "@/components/ui-governance/app-modal/app-modal.control.primitive.client";

type InterfaceLabComponentInterceptModalProps = {
  fullPageHref: string;
  children: ReactNode;
};

export function InterfaceLabComponentInterceptModal({
  fullPageHref,
  children,
}: InterfaceLabComponentInterceptModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <AppModal
      isOpen={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          router.back();
        }
      }}
      isDismissable
      size="lg"
    >
      <div className="flex max-h-[min(80vh,720px)] flex-col gap-4 overflow-auto p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <p className="type-meta text-foreground-muted">Quick inspect</p>
          <Link
            href={fullPageHref as Route}
            className="type-body-sm font-medium text-accent underline-offset-4 hover:underline"
            prefetch
          >
            Open full page
          </Link>
        </div>
        {children}
      </div>
    </AppModal>
  );
}
