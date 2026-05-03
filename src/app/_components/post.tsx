"use client";

import { AppButton, AppTextField } from "@/components/ui/app-controls";
import { useAppState } from "@/state/app-state";
import { api } from "@/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const utils = api.useUtils();
  const {
    state: { composerDensity, postDraft },
    markPostCreated,
    setPostDraft,
  } = useAppState();

  const createPost = api.post.create.useMutation({
    onSuccess: async (_, variables) => {
      await utils.post.invalidate();
      markPostCreated(variables.name);
    },
  });

  return (
    <div
      className={`w-full ${
        composerDensity === "compact" ? "max-w-xs" : "max-w-sm"
      } space-y-3`}
    >
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name: postDraft });
        }}
        className={`flex flex-col ${
          composerDensity === "compact" ? "gap-2" : "gap-3"
        }`}
      >
        <AppTextField
          label="Post title"
          onChange={setPostDraft}
          placeholder="Enter a post title"
          value={postDraft}
        />
        <AppButton
          isDisabled={createPost.isPending || postDraft.trim().length === 0}
          type="submit"
          variant="primary"
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </AppButton>
      </form>
    </div>
  );
}
