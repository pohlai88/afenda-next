import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, vi } from "vitest";

/** Used by tests that assert navigation via `window.location.assign`. */
export const locationAssignMock = vi.fn();
const locationReloadMock = vi.fn();
const locationReplaceMock = vi.fn();
const preventDocumentNavigation = (event: Event) => {
  if (event.type === "submit") {
    event.preventDefault();
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest("a[href]");
  if (anchor) {
    event.preventDefault();
  }
};

beforeAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      assign: locationAssignMock,
      hash: "",
      host: "localhost",
      hostname: "localhost",
      href: "http://localhost/",
      origin: "http://localhost",
      pathname: "/",
      port: "",
      protocol: "http:",
      reload: locationReloadMock,
      replace: locationReplaceMock,
      search: "",
      toString() {
        return "http://localhost/";
      },
    },
  });

  document.addEventListener("click", preventDocumentNavigation, true);
  document.addEventListener("submit", preventDocumentNavigation, true);
});

afterEach(() => {
  locationAssignMock.mockReset();
  locationReloadMock.mockReset();
  locationReplaceMock.mockReset();
});
