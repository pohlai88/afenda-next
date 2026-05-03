"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject preferences-panel
 * @afenda-artifact dialog
 * @afenda-boundary client
 * @afenda-description Client dialog for home preference controls
 */
import {
  AppButton,
  AppDialog,
  AppSelectField,
  AppSwitchField,
} from "@/components/ui/app.controls.primitive.client";

import { useHomeState } from "./afenda-home.state.provider.client";

export function PreferencesPanel() {
  const {
    state: { composerDensity, showComposerStatus },
    setComposerDensity,
    setShowComposerStatus,
  } = useHomeState();

  return (
    <AppDialog
      description="Configure the local UI behavior for your workspace note workflow."
      title="Composer preferences"
      trigger={<AppButton variant="secondary">Preferences</AppButton>}
    >
      <AppSwitchField
        description="Show the shared composer state panel."
        isSelected={showComposerStatus}
        label="Show composer status"
        onChange={setShowComposerStatus}
      />

      <AppSelectField
        description="Choose the density used by the composer controls."
        items={[
          { id: "comfortable", label: "Comfortable" },
          { id: "compact", label: "Compact" },
        ]}
        label="Composer density"
        onSelectionChange={(key) => {
          if (key === "compact" || key === "comfortable") {
            setComposerDensity(key);
          }
        }}
        selectedKey={composerDensity}
      />
    </AppDialog>
  );
}
