/**
 * @afenda-owner mock
 * @afenda-subject barrel
 * @afenda-artifact entry
 * @afenda-boundary shared
 * @afenda-description Central export surface for `.mock` — import via `@mock`
 */

export type {
  MockProcurementApproval,
  MockUserRef,
  MockWorkspaceNote,
} from "./mock.types.shared";

export { MOCK_PROCUREMENT_APPROVALS } from "./fixtures/procurement-approval.fixture.shared";
export { MOCK_USER_ERP_OPERATOR } from "./fixtures/user.fixture.shared";
export { MOCK_WORKSPACE_NOTE_LATEST } from "./fixtures/workspace-note.fixture.shared";
