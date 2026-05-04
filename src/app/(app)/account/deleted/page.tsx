import Link from "next/link";

export default function AccountDeletedPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Account deleted</h1>
          <p className="type-body-sm text-foreground-muted">
            Your public account and its active sessions have been removed.
          </p>
        </div>
        <Link
          className="type-label bg-accent text-accent-foreground inline-flex rounded-2xl px-6 py-3 font-semibold transition"
          href="/sign-in"
        >
          Return to sign in
        </Link>
      </div>
    </main>
  );
}
