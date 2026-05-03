"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject workspace-note
 * @afenda-artifact composer
 * @afenda-boundary client
 * @afenda-description Client composer for creating and showing the latest workspace note
 */
import {
  AppButton,
  AppTextField,
} from "@/components/ui/app.controls.primitive.client";
import { api } from "@/trpc/trpc.react.provider.client";

import { useHomeState } from "./afenda-home.state.provider.client";

export function WorkspaceNoteComposer() {
  const [latestNote] = api.workspaceNote.getLatest.useSuspenseQuery();
  const utils = api.useUtils();
  const {
    state: { composerDensity, noteDraft },
    markNoteCreated,
    setNoteDraft,
  } = useHomeState();

  const createWorkspaceNote = api.workspaceNote.create.useMutation({
    onSuccess: async (_, variables) => {
      await utils.workspaceNote.invalidate();
      markNoteCreated(variables.name);
    },
  });

  return (
    <div
      className={`w-full ${
        composerDensity === "compact" ? "max-w-xs" : "max-w-sm"
      } space-y-3`}
    >
      {latestNote ? (
        <p className="truncate">Latest workspace note: {latestNote.name}</p>
      ) : (
        <p>No workspace notes yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createWorkspaceNote.mutate({ name: noteDraft });
        }}
        className={`flex flex-col ${
          composerDensity === "compact" ? "gap-2" : "gap-3"
        }`}
      >
        <AppTextField
          label="Workspace note"
          onChange={setNoteDraft}
          placeholder="Enter a workspace note"
          value={noteDraft}
        />
        <AppButton
          isDisabled={
            createWorkspaceNote.isPending || noteDraft.trim().length === 0
          }
          type="submit"
          variant="primary"
        >
          {createWorkspaceNote.isPending ? "Saving..." : "Save note"}
        </AppButton>
      </form>
    </div>
  );
}
