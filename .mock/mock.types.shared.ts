/**
 * @afenda-owner mock
 * @afenda-subject types
 * @afenda-artifact contract
 * @afenda-boundary shared
 * @afenda-description Serializable mock DTOs for previews, demos, and e2e — not domain persistence types
 */

/** Mirrors the `workspaceNote.getLatest` selection shape; dates are ISO strings for JSON stability. */
export type MockWorkspaceNote = {
  id: number;
  name: string;
  createdAt: string;
  createdById: string;
};

/** Lightweight operator reference for UI stories and route demos. */
export type MockUserRef = {
  id: string;
  name: string;
  email: string;
};

/** Fixture procurement lane row — preview-only, not a Drizzle model. */
export type MockProcurementApproval = {
  id: string;
  title: string;
  lane: "pending" | "approved" | "rejected";
  amount: string;
  owner: string;
};
