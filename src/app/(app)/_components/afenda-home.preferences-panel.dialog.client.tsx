"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject preferences-panel
 * @afenda-artifact panel
 * @afenda-boundary client
 * @afenda-description Client panel for home preference controls
 */
import { useHomeState } from "./afenda-home.state.provider.client";

export function PreferencesPanel() {
  const {
    state: { composerDensity, showComposerStatus },
    setComposerDensity,
    setShowComposerStatus,
  } = useHomeState();

  return (
    <details className="border-border bg-surface rounded-(--radius-panel) border p-4">
      <summary className="type-label cursor-pointer">Preferences</summary>
      <div className="mt-4 space-y-4">
        <p className="type-body-sm text-foreground-muted">
          Configure the local UI behavior for your workspace note workflow.
        </p>

        <label className="flex flex-col gap-2">
          <span className="type-label">Show composer status</span>
          <span className="type-meta text-foreground-muted">
            Show the shared composer state panel.
          </span>
          <span className="flex items-center gap-2">
            <input
              checked={showComposerStatus}
              type="checkbox"
              onChange={(event) =>
                setShowComposerStatus(event.currentTarget.checked)
              }
            />
            <span className="type-body-sm text-foreground">Enabled</span>
          </span>
        </label>

        <label className="flex flex-col gap-2" htmlFor="composer-density">
          <span className="type-label">Composer density</span>
          <span className="type-meta text-foreground-muted">
            Choose the density used by the composer controls.
          </span>
          <select
            className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
            id="composer-density"
            value={composerDensity}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value === "compact" || value === "comfortable") {
                setComposerDensity(value);
              }
            }}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </div>
    </details>
  );
}
