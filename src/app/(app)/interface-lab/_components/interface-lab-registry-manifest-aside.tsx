/**
 * @afenda-owner interface-lab
 * @afenda-subject registry-aside
 * @afenda-boundary server
 * @afenda-description Governance manifest excerpt for Interface Lab component detail aside.
 */
import type { InterfaceLabManifestExcerpt } from "../interface-lab.manifest-excerpt";

type InterfaceLabRegistryManifestAsideProps = {
  excerpt: InterfaceLabManifestExcerpt;
};

export function InterfaceLabRegistryManifestAside({
  excerpt,
}: InterfaceLabRegistryManifestAsideProps) {
  return (
    <div className="space-y-4 text-sm">
      <dl className="space-y-3">
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Export</dt>
          <dd className="font-mono text-xs">{excerpt.exportName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Registry status</dt>
          <dd className="capitalize">{excerpt.status}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Boundary</dt>
          <dd className="capitalize">{excerpt.boundary}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Category</dt>
          <dd className="capitalize">{excerpt.category}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Source</dt>
          <dd className="break-all font-mono text-xs">{excerpt.sourcePath}</dd>
        </div>
      </dl>
      {excerpt.reactAriaPrimitives.length > 0 ? (
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">React Aria primitives</dt>
          <dd>{excerpt.reactAriaPrimitives.join(", ")}</dd>
        </div>
      ) : null}
      {excerpt.useWhen.length > 0 ? (
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Use when</dt>
          <dd>
            <ul className="list-inside list-disc space-y-1">
              {excerpt.useWhen.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
      {excerpt.avoidWhen.length > 0 ? (
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Avoid when</dt>
          <dd>
            <ul className="list-inside list-disc space-y-1">
              {excerpt.avoidWhen.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
      {excerpt.a11yRequired && excerpt.a11yNotes.length > 0 ? (
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Accessibility notes</dt>
          <dd>
            <ul className="list-inside list-disc space-y-1">
              {excerpt.a11yNotes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
    </div>
  );
}
