import type { InterfaceStudioManifestExcerpt } from "../interface-studio.manifest-excerpt";

type InterfaceStudioRegistryManifestAsideProps = {
  excerpt: InterfaceStudioManifestExcerpt;
};

export function InterfaceStudioRegistryManifestAside({
  excerpt,
}: InterfaceStudioRegistryManifestAsideProps) {
  return (
    <aside className="rounded-(--radius-panel) border border-border bg-surface/70 p-4">
      <h3 className="text-sm font-semibold text-foreground">Governance manifest</h3>
      <dl className="mt-3 grid gap-2 text-sm">
        <div>
          <dt className="text-foreground-muted">Export</dt>
          <dd className="text-foreground">{excerpt.exportName}</dd>
        </div>
        <div>
          <dt className="text-foreground-muted">Status</dt>
          <dd className="text-foreground">{excerpt.status}</dd>
        </div>
        <div>
          <dt className="text-foreground-muted">Boundary</dt>
          <dd className="text-foreground">{excerpt.boundary}</dd>
        </div>
        <div>
          <dt className="text-foreground-muted">Source</dt>
          <dd className="break-all text-foreground">{excerpt.sourcePath}</dd>
        </div>
      </dl>
    </aside>
  );
}
