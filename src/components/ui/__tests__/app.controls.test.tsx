/**
 * @afenda-owner app
 * @afenda-subject controls
 * @afenda-artifact primitive-test
 * @afenda-boundary test
 * @afenda-description Test coverage for shared app control primitives
 */
import { act, useState, type FormEvent } from "react";
import { User } from "@react-aria/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  AppButton,
  AppCell,
  AppColumn,
  AppDialog,
  AppForm,
  AppRow,
  AppSearchField,
  AppSelectField,
  AppSwitchField,
  AppTable,
  AppTableBody,
  AppTableHeader,
  AppTextField,
} from "@/components/ui/app.controls.client";
import { renderWithProviders, setupUser } from "@/test/test.render.test";

describe("shared React Aria controls", () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    if (globalThis.window) {
      globalThis.window.IS_REACT_ACT_ENVIRONMENT = true;
    }
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(async () => {
    vi.useRealTimers();
  });

  it("keeps button semantics for disabled, loading, and keyboard press", async () => {
    const user = setupUser();
    const onPress = vi.fn();

    const { rerender } = renderWithProviders(
      <AppButton onPress={onPress}>Save changes</AppButton>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    await act(async () => {
      button.focus();
      await user.keyboard("{Enter}");
    });

    await waitFor(() => {
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      button.blur();
    });
    rerender(<AppButton isDisabled>Save changes</AppButton>);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toHaveAttribute("data-disabled");

    rerender(<AppButton isLoading>Save changes</AppButton>);
    expect(screen.getByRole("button", { name: "Loading..." })).toHaveAttribute(
      "data-disabled",
    );
  });

  it("wires text field label, description, aria-label fallback, and invalid semantics", () => {
    const onChange = vi.fn();

    renderWithProviders(
      <>
        <AppTextField
          description="Use a monitored mailbox."
          errorMessage="Email is required."
          isRequired
          label="Customer email"
          name="customerEmail"
          onChange={onChange}
          type="email"
          value=""
        />
        <AppTextField
          ariaLabel="Workspace search"
          description="Compact utility search."
          name="workspaceSearch"
          onChange={onChange}
          value=""
        />
      </>,
    );

    const labeledField = screen.getByRole("textbox", {
      name: "Customer email",
    });
    expect(labeledField).toHaveAttribute("name", "customerEmail");
    expect(labeledField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Use a monitored mailbox.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: "Workspace search" }),
    ).toBeInTheDocument();
  });

  it("supports search semantics, value updates, clear behavior, and disabled state", async () => {
    function SearchHarness() {
      const [value, setValue] = useState("Siam");

      return (
        <>
          <AppSearchField
            description="Search request ID or supplier."
            label="Approval queue search"
            name="approvalQueueSearch"
            onChange={setValue}
            value={value}
          />
          <p>{`Search value: ${value}`}</p>
        </>
      );
    }

    const user = setupUser();
    const { rerender } = renderWithProviders(<SearchHarness />);

    const searchbox = screen.getByLabelText("Approval queue search");

    expect(screen.getByText("Search value: Siam")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    await waitFor(() => {
      expect(screen.getByText(/^Search value:\s*$/)).toBeInTheDocument();
    });

    await user.type(searchbox, "Bangkok");
    await waitFor(() => {
      expect(screen.getByText("Search value: Bangkok")).toBeInTheDocument();
    });

    rerender(
      <AppSearchField
        ariaLabel="Disabled search"
        isDisabled
        onChange={() => undefined}
        value=""
      />,
    );

    expect(screen.getByLabelText("Disabled search")).toHaveAttribute(
      "disabled",
    );
  });

  it("toggles switch by keyboard with switch semantics intact", async () => {
    function SwitchHarness() {
      const [isSelected, setIsSelected] = useState(false);

      return (
        <AppSwitchField
          description="Allow immediate downstream processing."
          isSelected={isSelected}
          label="Active"
          name="active"
          onChange={setIsSelected}
        />
      );
    }

    const user = setupUser();
    renderWithProviders(<SwitchHarness />);

    const toggle = screen.getByRole("switch", { name: /Active/ });
    await act(async () => {
      toggle.focus();
    });

    expect(toggle).not.toBeChecked();
    await act(async () => {
      await user.keyboard(" ");
    });
    await waitFor(() => {
      expect(toggle).toBeChecked();
    });
  });

  it("opens select, exposes listbox semantics, and supports keyboard selection", async () => {
    function SelectHarness() {
      const [selectedKey, setSelectedKey] = useState("ops");

      return (
        <AppSelectField
          description="Choose the owner."
          items={[
            { id: "ops", label: "Operations" },
            { id: "finance", label: "Finance" },
            { id: "sales", label: "Sales" },
          ]}
          data-testid="owner-select"
          label="Owner"
          name="owner"
          onSelectionChange={setSelectedKey}
          selectedKey={selectedKey}
        />
      );
    }

    const reactAriaUser = new User({
      advanceTimer: vi.advanceTimersByTime,
      interactionType: "keyboard",
    });
    renderWithProviders(<SelectHarness />);

    const select = reactAriaUser.createTester("Select", {
      interactionType: "keyboard",
      root: screen.getByTestId("owner-select"),
    });

    await act(async () => {
      await select.selectOption({ option: "Finance" });
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /finance/i }),
      ).toBeInTheDocument();
    });
  });

  it("opens and closes AppDialog with accessible title, escape, and action buttons", async () => {
    const user = setupUser();

    renderWithProviders(
      <AppDialog
        actions={
          <AppButton slot="close" variant="primary">
            Approve request
          </AppButton>
        }
        description="Capture the approval note before release."
        title="Approve Request"
        trigger={<AppButton variant="secondary">Open dialog</AppButton>}
      >
        <p>Decision Record</p>
      </AppDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(
      await screen.findByRole("dialog", { name: "Approve Request" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Approve Request" }),
      ).toBeNull();
    });

    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    await screen.findByRole("dialog", { name: "Approve Request" });
    await user.click(screen.getByRole("button", { name: "Approve request" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Approve Request" }),
      ).toBeNull();
    });
  });

  it("renders AppTable rows, empty state, selection updates, and sortable headers", async () => {
    const user = setupUser();

    function TableHarness({
      rows,
    }: {
      rows: Array<{ amount: string; amountValue: number; id: string }>;
    }) {
      const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
      const [sortDescriptor, setSortDescriptor] = useState<{
        column: string;
        direction: "ascending" | "descending";
      }>({
        column: "request",
        direction: "ascending",
      });

      const sortedRows = [...rows].sort((left, right) => {
        if (sortDescriptor.column === "amount") {
          const delta = left.amountValue - right.amountValue;
          return sortDescriptor.direction === "ascending" ? delta : -delta;
        }

        const delta = left.id.localeCompare(right.id);
        return sortDescriptor.direction === "ascending" ? delta : -delta;
      });

      return (
        <div>
          <p>{`Selected rows: ${selectedKeys.size}`}</p>
          <p>{`Sort: ${String(sortDescriptor.column)}:${sortDescriptor.direction}`}</p>
          <AppTable
            aria-label="Review table"
            onSelectionChange={(keys) =>
              setSelectedKeys(
                keys === "all"
                  ? new Set(rows.map((row) => row.id))
                  : new Set([...keys].map((key) => String(key))),
              )
            }
            onSortChange={(descriptor) =>
              setSortDescriptor(descriptor as typeof sortDescriptor)
            }
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
          >
            <AppTableHeader>
              <AppColumn id="request" isRowHeader>
                Request ID
              </AppColumn>
              <AppColumn allowsSorting id="amount">
                Amount
              </AppColumn>
            </AppTableHeader>
            <AppTableBody
              renderEmptyState={() => (
                <div className="px-4 py-6 text-center">No rows available.</div>
              )}
            >
              {sortedRows.map((row) => (
                <AppRow id={row.id} key={row.id}>
                  <AppCell>{row.id}</AppCell>
                  <AppCell>{row.amount}</AppCell>
                </AppRow>
              ))}
            </AppTableBody>
          </AppTable>
        </div>
      );
    }

    const rows = [
      { id: "PR-1001", amount: "THB 25,000", amountValue: 25000 },
      { id: "PR-1002", amount: "THB 70,000", amountValue: 70000 },
    ];

    const { rerender } = renderWithProviders(<TableHarness rows={rows} />);

    expect(screen.getByText("Selected rows: 0")).toBeInTheDocument();
    await user.click(screen.getByRole("row", { name: "PR-1002" }));
    await waitFor(() => {
      expect(screen.getByText("Selected rows: 1")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("columnheader", { name: /Amount/i }));
    await waitFor(() => {
      expect(screen.getByText("Sort: amount:ascending")).toBeInTheDocument();
    });

    rerender(<TableHarness rows={[]} />);
    expect(screen.getByText("No rows available.")).toBeInTheDocument();
  });

  it("submits semantic forms through AppForm", async () => {
    const user = setupUser();
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    function FormHarness() {
      const [value, setValue] = useState("OPS-001");

      return (
        <AppForm aria-label="Order form" onSubmit={onSubmit}>
          <AppTextField
            label="Reference"
            name="reference"
            onChange={setValue}
            value={value}
          />
          <AppButton type="submit">Submit</AppButton>
        </AppForm>
      );
    }

    renderWithProviders(<FormHarness />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Submit" }));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps controls stable under an RTL locale smoke case", () => {
    renderWithProviders(
      <div dir="rtl" lang="ar-AE">
        <AppTextField
          ariaLabel="البحث"
          description="حقل بحث"
          name="rtlSearch"
          onChange={() => undefined}
          value=""
        />
      </div>,
      { locale: "ar-AE" },
    );

    expect(screen.getByRole("textbox", { name: "البحث" })).toBeInTheDocument();
  });
});
