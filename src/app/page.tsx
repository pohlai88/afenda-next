import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ComposerStatus } from "@/app/_components/afenda-home.composer-status.client";
import { LatestPost } from "@/app/_components/afenda-home.latest-post.client";
import { PreferencesPanel } from "@/app/_components/afenda-home.preferences-panel.client";
import { getAuth } from "@/server/better-auth/auth.server";
import { getSession } from "@/server/better-auth/auth.session.server";
import { api, HydrateClient } from "@/trpc/trpc.server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();

  if (session) {
    void api.post.getLatest.prefetch();
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
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col gap-4">
              <p className="type-body text-foreground-subtle">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              {!session ? (
                <form>
                  <button
                    className="type-label bg-accent text-accent-foreground hover:bg-accent-strong rounded-2xl px-6 py-3 font-semibold transition"
                    formAction={async () => {
                      "use server";
                      const res = await getAuth().api.signInSocial({
                        body: {
                          provider: "github",
                          callbackURL: "/",
                        },
                      });
                      if (!res.url) {
                        throw new Error("No URL returned from signInSocial");
                      }
                      const redirectUrl = new URL(res.url);
                      if (!["http:", "https:"].includes(redirectUrl.protocol)) {
                        throw new Error("Unsupported sign-in redirect URL");
                      }
                      redirect(redirectUrl.toString() as `${string}:${string}`);
                    }}
                  >
                    Sign in with Github
                  </button>
                </form>
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
            <>
              <PreferencesPanel />
              <ComposerStatus />
              <LatestPost />
            </>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
