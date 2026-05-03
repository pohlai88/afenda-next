"use client";

import { useAppState } from "@/state/app-state";

export function ComposerStatus() {
  const {
    state: { lastCreatedPostName, postDraft, showComposerStatus },
  } = useAppState();

  if (!showComposerStatus || (!lastCreatedPostName && !postDraft)) {
    return null;
  }

  return (
    <div className="border-border bg-surface text-foreground-subtle type-body-sm w-full max-w-xs rounded-[var(--radius-control)] border p-4">
      <p className="text-foreground font-medium">Composer state</p>
      <p>{postDraft ? `Draft: ${postDraft}` : "Draft is empty"}</p>
      <p>
        {lastCreatedPostName
          ? `Last created: ${lastCreatedPostName}`
          : "No post created in this session"}
      </p>
    </div>
  );
}
