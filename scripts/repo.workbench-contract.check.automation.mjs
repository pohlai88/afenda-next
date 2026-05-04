/**
 * @afenda-owner repo
 * @afenda-subject workbench-contract
 * @afenda-artifact check
 * @afenda-boundary automation
 * @afenda-description Deprecated compatibility wrapper routing workbench-contract checks to ui-governance automation
 */
console.warn(
  'Deprecated script name "check:workbench-contract" invoked. Use "pnpm check:ui-governance" instead.\n',
);

await import("./repo.ui-governance.check.automation.mjs");
