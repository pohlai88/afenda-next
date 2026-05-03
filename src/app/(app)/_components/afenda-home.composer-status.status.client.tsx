"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject composer-status
 * @afenda-artifact status
 * @afenda-boundary client
 * @afenda-description Client status display for the home composer
 */
import { useHomeState } from "./afenda-home.state.provider.client";

export function ComposerStatus() {
  const {
    state: { lastCreatedNoteName, noteDraft, showComposerStatus },
  } = useHomeState();

  if (!showComposerStatus || (!lastCreatedNoteName && !noteDraft)) {
    return null;
  }

  return (
    <div className="border-border bg-surface text-foreground-subtle type-body-sm w-full max-w-xs rounded-[var(--radius-control)] border p-4">
      <p className="text-foreground font-medium">Composer state</p>
      <p>{noteDraft ? `Draft: ${noteDraft}` : "Draft is empty"}</p>
      <p>
        {lastCreatedNoteName
          ? `Last created note: ${lastCreatedNoteName}`
          : "No workspace note created in this session"}
      </p>
    </div>
  );
}
