import { afterEach } from "vitest";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;

  interface Window {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

if (globalThis.window) {
  globalThis.window.IS_REACT_ACT_ENVIRONMENT = true;
}

await import("@testing-library/jest-dom/vitest");
const { installPointerEvent } = await import("@react-aria/test-utils");
const { act, cleanup, configure } = await import("@testing-library/react");

installPointerEvent();

configure({
  asyncWrapper: async (callback) => {
    const previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;

    try {
      let result: unknown;
      await act(async () => {
        result = await callback();
      });
      return result;
    } finally {
      globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment ?? true;
    }
  },
});

if (!globalThis.CSS) {
  Object.defineProperty(globalThis, "CSS", {
    value: {},
    writable: true,
  });
}

if (!globalThis.CSS.escape) {
  globalThis.CSS.escape = (value: string) =>
    value.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
}

afterEach(() => {
  cleanup();
});
