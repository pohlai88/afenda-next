import type { MockWorkspaceNote } from "../mock.types.shared";

/** Default “latest note” for demos and deterministic UI copy in tests. */
export const MOCK_WORKSPACE_NOTE_LATEST: MockWorkspaceNote = {
  id: 10_001,
  name: "Mock: shift handoff — receiving dock cleared",
  createdAt: "2026-05-01T14:30:00.000Z",
  createdById: "mock-user-erp-operator",
};
