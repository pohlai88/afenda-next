import type { MockUserRef } from "../mock.types.shared";

/** Fictional operator — use `.invalid` TLD; never a real mailbox. */
export const MOCK_USER_ERP_OPERATOR: MockUserRef = {
  id: "mock-user-erp-operator",
  name: "Alex Operator",
  email: "alex.operator@example.invalid",
};
