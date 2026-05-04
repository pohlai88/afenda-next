import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";

type Props = {
  current: "identity" | "security" | "workspace";
};

export function AccountAreaNav({ current }: Props) {
  return (
    <nav className="border-border bg-surface flex flex-wrap gap-2 rounded-(--radius-panel) border p-2">
      <NavLink current={current === "security"} href="/account/security">
        Security
      </NavLink>
      <NavLink current={current === "identity"} href="/account/identity">
        Identity
      </NavLink>
      <NavLink current={current === "workspace"} href="/account/workspace">
        Workspace
      </NavLink>
    </nav>
  );
}

function NavLink({
  children,
  current,
  href,
}: {
  children: ReactNode;
  current: boolean;
  href: Route;
}) {
  return (
    <Link
      aria-current={current ? "page" : undefined}
      className={
        current
          ? "type-label bg-accent text-accent-foreground inline-flex rounded-(--radius-control) px-4 py-2"
          : "type-label text-foreground hover:bg-field inline-flex rounded-(--radius-control) px-4 py-2"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
