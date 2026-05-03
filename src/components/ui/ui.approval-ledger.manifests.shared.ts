/**
 * @afenda-owner app
 * @afenda-subject approval-ledger
 * @afenda-artifact manifests
 * @afenda-boundary shared
 * @afenda-description Shared manifest import set for the App* approval ledger
 */
import { createApprovedComponentManifestSet } from "./app.approval-ledger.schema.shared";
import { appButtonManifest } from "./manifests/app-button.approval-ledger.manifest.shared";
import { appCellManifest } from "./manifests/app-cell.approval-ledger.manifest.shared";
import { appColumnManifest } from "./manifests/app-column.approval-ledger.manifest.shared";
import { appDialogManifest } from "./manifests/app-dialog.approval-ledger.manifest.shared";
import { appFormManifest } from "./manifests/app-form.approval-ledger.manifest.shared";
import { appGridListManifest } from "./manifests/app-grid-list.approval-ledger.manifest.shared";
import { appGridListItemManifest } from "./manifests/app-grid-list-item.approval-ledger.manifest.shared";
import { appPanelManifest } from "./manifests/app-panel.approval-ledger.manifest.shared";
import { appRowManifest } from "./manifests/app-row.approval-ledger.manifest.shared";
import { appSearchFieldManifest } from "./manifests/app-search-field.approval-ledger.manifest.shared";
import { appSelectFieldManifest } from "./manifests/app-select-field.approval-ledger.manifest.shared";
import { appStatusManifest } from "./manifests/app-status.approval-ledger.manifest.shared";
import { appSwitchFieldManifest } from "./manifests/app-switch-field.approval-ledger.manifest.shared";
import { appTabManifest } from "./manifests/app-tab.approval-ledger.manifest.shared";
import { appTabListManifest } from "./manifests/app-tab-list.approval-ledger.manifest.shared";
import { appTabPanelManifest } from "./manifests/app-tab-panel.approval-ledger.manifest.shared";
import { appTabPanelsManifest } from "./manifests/app-tab-panels.approval-ledger.manifest.shared";
import { appTableManifest } from "./manifests/app-table.approval-ledger.manifest.shared";
import { appTableBodyManifest } from "./manifests/app-table-body.approval-ledger.manifest.shared";
import { appTableHeaderManifest } from "./manifests/app-table-header.approval-ledger.manifest.shared";
import { appTabsManifest } from "./manifests/app-tabs.approval-ledger.manifest.shared";
import { appTextFieldManifest } from "./manifests/app-text-field.approval-ledger.manifest.shared";
import { appToolbarManifest } from "./manifests/app-toolbar.approval-ledger.manifest.shared";

const manifestSet = createApprovedComponentManifestSet([
  appButtonManifest,
  appFormManifest,
  appTextFieldManifest,
  appSearchFieldManifest,
  appSwitchFieldManifest,
  appDialogManifest,
  appSelectFieldManifest,
  appTableManifest,
  appTableHeaderManifest,
  appColumnManifest,
  appTableBodyManifest,
  appRowManifest,
  appCellManifest,
  appTabsManifest,
  appTabListManifest,
  appTabManifest,
  appTabPanelsManifest,
  appTabPanelManifest,
  appGridListManifest,
  appGridListItemManifest,
  appPanelManifest,
  appStatusManifest,
  appToolbarManifest,
]);

export const sharedUiComponentManifests = manifestSet.manifests;
export const sharedUiComponentManifestById = manifestSet.byId;
export const sharedUiComponentManifestByExportName = manifestSet.byExportName;
