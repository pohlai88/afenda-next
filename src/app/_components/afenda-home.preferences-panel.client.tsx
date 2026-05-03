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
} from "@/components/ui/app.controls.client";
import { useAppState } from "@/client-runtime/state/app-state.client";

export function PreferencesPanel() {
  const {
    state: { composerDensity, showComposerStatus },
    setComposerDensity,
    setShowComposerStatus,
  } = useAppState();

  return (
    <AppDialog
      description="Configure the local UI behavior for your post workflow."
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
