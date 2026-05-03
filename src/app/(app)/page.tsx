import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuth } from "@/server/better-auth/auth.server.facade.server";
import { getSession } from "@/server/better-auth/auth.session.query.server";
import { api, HydrateClient } from "@/trpc/trpc.rsc-hydration.server";

import { ComposerStatus } from "./_components/afenda-home.composer-status.status.client";
import { PreferencesPanel } from "./_components/afenda-home.preferences-panel.dialog.client";
import { HomeRuntimeProvider } from "./_components/afenda-home.runtime.provider.client";
import { WorkspaceNoteComposer } from "./_components/afenda-home.workspace-note.composer.client";

export default async function Home() {
  const session = await getSession();
  const latestNote = session ? await api.workspaceNote.getLatest() : null;

  if (session) {
    void api.workspaceNote.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="bg-background text-foreground min-h-screen">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
          <div className="space-y-3">
            <p className="type-kicker text-accent-strong">Afenda ERP</p>
            <h1 className="type-page-title max-w-4xl">
              Operational workspace foundation
            </h1>
            <p className="type-body text-foreground-muted max-w-2xl">
              Shared controls, authentication, and workflow scaffolding for the
              ERP surface.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            <Link
              className="border-border bg-surface hover:bg-surface-raised flex min-h-40 flex-col gap-4 rounded-(--radius-panel) border p-5 transition"
              href="/erp-workbench#contract"
            >
              <h2 className="type-panel-title">Control Contract</h2>
              <p className="type-body-sm text-foreground-muted">
                Review approved shared controls, workflow patterns, and the
                procurement approval scene.
              </p>
            </Link>
            <section className="border-border bg-surface flex min-h-40 flex-col gap-4 rounded-(--radius-panel) border p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="type-panel-title">Session Boundary</h2>
                <span className="type-label border-border-strong bg-field text-foreground rounded-full border px-3 py-1">
                  {session ? "Authenticated" : "No session"}
                </span>
              </div>
              <p className="type-body-sm text-foreground-muted">
                Server-rendered Better Auth state for ERP workflows without
                exposing raw session API inspection in production UI.
              </p>
            </section>
            <Link
              className="border-accent-strong bg-accent-soft hover:bg-accent-soft/80 flex min-h-40 flex-col gap-4 rounded-2xl border p-5 transition"
              href="/erp-workbench#scenes"
            >
              <h2 className="type-panel-title">ERP Workbench</h2>
              <p className="type-body-sm text-foreground-subtle">
                Inspect approved shared controls, patterns, and ERP workflow
                scenes.
              </p>
            </Link>
          </div>
          <div className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
            <p className="type-panel-title">
              {latestNote?.name
                ? `Latest workspace note: ${latestNote.name}`
                : "No workspace notes yet."}
            </p>

            <div className="flex flex-col gap-4">
              <p className="type-body text-foreground-subtle">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              {!session ? (
                <Link
                  className="type-label bg-accent text-accent-foreground hover:bg-accent-strong inline-flex rounded-2xl px-6 py-3 font-semibold transition"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              ) : (
                <form>
                  <button
                    className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-2xl border px-6 py-3 font-semibold transition"
                    formAction={async () => {
                      "use server";
                      await getAuth().api.signOut({
                        headers: await headers(),
                      });
                      redirect("/");
                    }}
                  >
                    Sign out
                  </button>
                </form>
              )}
            </div>
          </div>

          {session?.user && (
            <HomeRuntimeProvider>
              <PreferencesPanel />
              <ComposerStatus />
              <WorkspaceNoteComposer />
            </HomeRuntimeProvider>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
