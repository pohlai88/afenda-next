/**
 * @afenda-owner auth
 * @afenda-subject step-up
 * @afenda-artifact shared
 * @afenda-boundary shared
 * @afenda-description Shared session-freshness and step-up helpers for sensitive auth workflows
 */
export const stepUpFreshAgeSeconds = 5 * 60;

export const stepUpRequiredMessage =
  "Recent re-authentication is required for this security action.";

export function hasFreshSessionAge(
  value: Date | string | null | undefined,
  now = Date.now(),
) {
  if (!value) return false;

  const createdAt = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(createdAt.valueOf())) return false;

  return now - createdAt.valueOf() <= stepUpFreshAgeSeconds * 1000;
}

export function getStepUpWindowMinutes() {
  return Math.ceil(stepUpFreshAgeSeconds / 60);
}
