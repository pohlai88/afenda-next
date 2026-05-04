"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject workspace-note
 * @afenda-artifact composer
 * @afenda-boundary client
 * @afenda-description Client composer for creating and showing the latest workspace note
 */
import { useState } from "react";

import { api } from "@/trpc/trpc.react.provider.client";

export function WorkspaceNoteComposer({ tenantSlug }: { tenantSlug: string }) {
  const [draft, setDraft] = useState("");
  const [latestNote] = api.workspaceNote.getLatest.useSuspenseQuery({ tenantSlug });
  const utils = api.useUtils();

  const createWorkspaceNote = api.workspaceNote.create.useMutation({
    onSuccess: async () => {
      await utils.workspaceNote.getLatest.invalidate({ tenantSlug });
      setDraft("");
    },
  });

  return (
    <div className="w-full max-w-sm space-y-3">
      {latestNote ? (
        <p className="truncate">Latest workspace note: {latestNote.name}</p>
      ) : (
        <p>No workspace notes yet.</p>
      )}
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          createWorkspaceNote.mutate({
            name: draft,
            tenantSlug,
          });
        }}
      >
        <label className="flex min-w-0 flex-col gap-2" htmlFor="workspace-note">
          <span className="type-label">Workspace note</span>
          <input
            className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
            id="workspace-note"
            onChange={(event) => setDraft(event.currentTarget.value)}
            placeholder="Enter a workspace note"
            value={draft}
          />
        </label>
        <button disabled={createWorkspaceNote.isPending || draft.trim().length === 0} type="submit">
          {createWorkspaceNote.isPending ? "Saving..." : "Save note"}
        </button>
      </form>
    </div>
  );
}
