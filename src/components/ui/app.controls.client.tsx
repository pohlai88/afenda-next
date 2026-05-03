"use client";

import { cva } from "class-variance-authority";
import {
  Button,
  Cell,
  Column,
  Dialog,
  DialogTrigger,
  FieldError,
  Form,
  Heading,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Modal,
  ModalOverlay,
  Popover,
  Row,
  SearchField,
  Select,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableHeader,
  Text,
  TextField,
  type ButtonProps,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type SearchFieldProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";

type ButtonVariant = "primary" | "secondary";
type Density = "comfortable" | "compact";
type PanelTone = "default" | "contrast" | "muted";
type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";
type ToolbarTone = "default" | "contrast";
type AccessibleName =
  | { ariaLabel?: string; label: string }
  | { ariaLabel: string; label?: undefined };

type AppFieldBaseProps = AccessibleName & {
  description?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
};

type AppTextFieldProps = AppFieldBaseProps & {
  density?: Density;
  errorMessage?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: React.ComponentProps<typeof Input>["type"];
  value: string;
};

type AppSearchFieldProps = AccessibleName & {
  defaultValue?: SearchFieldProps["defaultValue"];
  description?: string;
  isDisabled?: boolean;
  name?: SearchFieldProps["name"];
  onChange?: SearchFieldProps["onChange"];
  placeholder?: string;
  value?: SearchFieldProps["value"];
};

type AppSelectFieldProps = AppFieldBaseProps & {
  "data-testid"?: string;
  density?: Density;
  errorMessage?: string;
  items: Array<{ id: string; label: string }>;
  onSelectionChange: (key: string) => void;
  placeholder?: string;
  selectedKey: string;
};

type AppSwitchFieldProps = AppFieldBaseProps & {
  isSelected: boolean;
  onChange: (value: boolean) => void;
};

type AppDialogProps = {
  actions?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  isDismissable?: boolean;
  title: string;
  trigger: React.ReactNode;
};

type AppTableProps = Omit<TableProps, "className"> & {
  children: React.ReactNode;
  className?: string;
};

type AppTableHeaderProps<T extends object> = Omit<
  TableHeaderProps<T>,
  "className"
> & {
  children: React.ReactNode;
  className?: string;
};

type AppColumnProps = Omit<ColumnProps, "className"> & {
  children: React.ReactNode;
  className?: string;
};

type AppTableBodyProps<T extends object> = Omit<
  TableBodyProps<T>,
  "className"
> & {
  children?: React.ReactNode;
  className?: string;
};

type AppRowProps<T extends object> = Omit<RowProps<T>, "className"> & {
  children: React.ReactNode;
  className?: string;
};

type AppCellProps = Omit<CellProps, "className"> & {
  children: React.ReactNode;
  className?: string;
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const fieldDescriptionClassName = "type-meta text-foreground-muted";
const fieldErrorClassName = "type-meta text-danger-strong";

export function AppButton({
  children,
  className = "",
  fullWidth = false,
  isLoading = false,
  selected = false,
  variant = "secondary",
  ...props
}: ButtonProps & {
  className?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  selected?: boolean;
  variant?: ButtonVariant;
}) {
  return (
    <Button
      // Preserve React Aria's onPress model through the shared button wrapper.
      className={cn(
        buttonVariants({ fullWidth, selected, variant }),
        className,
      )}
      isDisabled={props.isDisabled ?? isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
}

export function AppForm({
  children,
  className = "",
  validationBehavior = "aria",
  ...props
}: React.ComponentProps<typeof Form> & {
  className?: string;
}) {
  return (
    <Form
      className={cn("space-y-4", className)}
      validationBehavior={validationBehavior}
      {...props}
    >
      {children}
    </Form>
  );
}

export function AppTextField({
  ariaLabel,
  density = "comfortable",
  description,
  errorMessage,
  isDisabled = false,
  isRequired = false,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: AppTextFieldProps) {
  return (
    <TextField
      {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
      className="flex min-w-0 flex-col gap-2"
      isDisabled={isDisabled}
      isInvalid={Boolean(errorMessage)}
      isRequired={isRequired}
      {...(name !== undefined ? { name } : {})}
      onChange={onChange}
      validationBehavior="aria"
      value={value}
    >
      {label ? <Label className={fieldLabelVariants()}>{label}</Label> : null}
      {description ? (
        <Text className={fieldDescriptionClassName} slot="description">
          {description}
        </Text>
      ) : null}
      <Input
        className={fieldInputVariants({
          density,
          invalid: Boolean(errorMessage),
        })}
        {...(placeholder !== undefined ? { placeholder } : {})}
        type={type}
      />
      {errorMessage ? (
        <FieldError className={fieldErrorClassName}>{errorMessage}</FieldError>
      ) : null}
    </TextField>
  );
}

export function AppSearchField({
  ariaLabel,
  defaultValue,
  description,
  isDisabled = false,
  label,
  name,
  onChange,
  placeholder,
  value,
}: AppSearchFieldProps) {
  return (
    <SearchField
      {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
      className="flex min-w-0 flex-col gap-2"
      {...(defaultValue !== undefined ? { defaultValue } : {})}
      isDisabled={isDisabled}
      {...(name !== undefined ? { name } : {})}
      {...(onChange !== undefined ? { onChange } : {})}
      {...(value !== undefined ? { value } : {})}
    >
      {label ? <Label className={fieldLabelVariants()}>{label}</Label> : null}
      {description ? (
        <Text className={fieldDescriptionClassName} slot="description">
          {description}
        </Text>
      ) : null}
      <div className={searchFieldShellVariants()}>
        <span
          aria-hidden="true"
          className="type-meta text-foreground-muted shrink-0"
        >
          Search
        </span>
        <Input
          className="placeholder:text-foreground-muted min-w-0 flex-1 bg-transparent outline-none"
          {...(placeholder !== undefined ? { placeholder } : {})}
        />
        <Button
          className="rac-focus-ring text-foreground-muted hover:bg-field-hover hover:text-foreground rounded-(--radius-control) px-2 py-1 transition outline-none"
          slot="clear"
        >
          Clear
        </Button>
      </div>
    </SearchField>
  );
}

export function AppSwitchField({
  ariaLabel,
  description,
  isDisabled = false,
  isSelected,
  label,
  name,
  onChange,
}: AppSwitchFieldProps) {
  return (
    <Switch
      {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
      className={switchRootVariants()}
      isDisabled={isDisabled}
      isSelected={isSelected}
      {...(name !== undefined ? { name } : {})}
      onChange={onChange}
    >
      {({ isSelected }) => (
        <>
          <div className="min-w-0 flex-1 space-y-1">
            {label ? <div className={fieldLabelVariants()}>{label}</div> : null}
            {description ? (
              <Text className={fieldDescriptionClassName} slot="description">
                {description}
              </Text>
            ) : null}
          </div>
          <div className={switchTrackVariants({ selected: isSelected })}>
            <div className={switchThumbVariants({ selected: isSelected })} />
          </div>
        </>
      )}
    </Switch>
  );
}

export function AppDialog({
  actions,
  children,
  description,
  isDismissable = true,
  title,
  trigger,
}: AppDialogProps) {
  return (
    <DialogTrigger>
      {trigger}
      <ModalOverlay
        className="bg-overlay fixed inset-0 backdrop-blur-sm"
        isDismissable={isDismissable}
      >
        <Modal className="border-border-strong bg-surface-raised text-foreground fixed top-1/2 left-1/2 w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-(--radius-panel) border p-6 shadow-2xl outline-none">
          <Dialog className="outline-none">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Heading className="text-lg font-semibold" slot="title">
                  {title}
                </Heading>
                {description ? (
                  <p className="type-body-sm text-foreground-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              <AppButton
                className="text-foreground-muted hover:bg-surface hover:text-foreground border-transparent bg-transparent px-2 py-1"
                slot="close"
                variant="secondary"
              >
                Close
              </AppButton>
            </div>

            <div className="mt-6 space-y-4">{children}</div>

            {actions ? (
              <div className="mt-6 flex flex-wrap justify-end gap-2">
                {actions}
              </div>
            ) : null}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

export function AppSelectField({
  ariaLabel,
  "data-testid": testId,
  density = "comfortable",
  description,
  errorMessage,
  isDisabled = false,
  isRequired = false,
  items,
  label,
  name,
  onSelectionChange,
  placeholder = "Select an option",
  selectedKey,
}: AppSelectFieldProps) {
  return (
    <div className="border-border bg-surface min-w-0 space-y-2 rounded-(--radius-control) border p-4">
      <Select
        {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
        className="flex min-w-0 flex-col gap-2"
        {...(testId !== undefined ? { "data-testid": testId } : {})}
        isDisabled={isDisabled}
        isInvalid={Boolean(errorMessage)}
        isRequired={isRequired}
        {...(name !== undefined ? { name } : {})}
        onSelectionChange={(key) => {
          if (typeof key === "string") {
            onSelectionChange(key);
          }
        }}
        placeholder={placeholder}
        selectedKey={selectedKey}
        validationBehavior="aria"
      >
        {label ? <Label className={fieldLabelVariants()}>{label}</Label> : null}
        {description ? (
          <Text className={fieldDescriptionClassName} slot="description">
            {description}
          </Text>
        ) : null}
        <AppButton
          className={cn(selectTriggerVariants({ density }), "text-left")}
          fullWidth
          isDisabled={isDisabled}
          variant="secondary"
        >
          <SelectValue className="text-foreground-subtle min-w-0 flex-1 truncate" />
          <span aria-hidden="true" className="text-foreground-muted shrink-0">
            v
          </span>
        </AppButton>
        {errorMessage ? (
          <FieldError className={fieldErrorClassName}>
            {errorMessage}
          </FieldError>
        ) : null}
        <Popover className="border-border-strong bg-surface-raised text-foreground w-(--trigger-width) rounded-(--radius-panel) border p-2 shadow-2xl outline-none">
          <ListBox className="outline-none">
            {items.map((item) => (
              <ListBoxItem
                className="type-body-sm text-foreground-subtle focused:bg-field-hover focused:text-foreground selected:bg-accent-soft selected:text-foreground cursor-default rounded-(--radius-control) px-3 py-2 transition outline-none"
                id={item.id}
                key={item.id}
                textValue={item.label}
              >
                {item.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}

export function AppTable({
  children,
  className = "",
  ...props
}: AppTableProps) {
  return (
    <Table
      className={cn(
        "w-full min-w-176 border-separate border-spacing-0 outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </Table>
  );
}

export function AppTableHeader<T extends object>({
  children,
  className = "",
  ...props
}: AppTableHeaderProps<T>) {
  return (
    <TableHeader
      className={cn("bg-surface outline-none", className)}
      {...props}
    >
      {children}
    </TableHeader>
  );
}

export function AppColumn({
  children,
  className = "",
  ...props
}: AppColumnProps) {
  return (
    <Column
      className={cn(
        "type-label border-border bg-surface text-foreground px-3 py-2 text-left outline-none",
        props.allowsSorting && "cursor-default",
        className,
      )}
      {...props}
    >
      {props.allowsSorting ? (
        <div className="flex items-center gap-2">
          <span>{children}</span>
          <span
            aria-hidden="true"
            className="text-foreground-muted text-[0.75rem] leading-none"
          >
            <span className="sort-ascending:hidden">v</span>
            <span className="sort-ascending:inline hidden">^</span>
          </span>
        </div>
      ) : (
        children
      )}
    </Column>
  );
}

export function AppTableBody<T extends object>({
  children,
  className = "",
  ...props
}: AppTableBodyProps<T>) {
  return (
    <TableBody className={cn("bg-surface outline-none", className)} {...props}>
      {children}
    </TableBody>
  );
}

export function AppRow<T extends object>({
  children,
  className = "",
  ...props
}: AppRowProps<T>) {
  return (
    <Row
      className={({ isSelected }) =>
        cn(
          "border-border cursor-default outline-hidden transition",
          isSelected ? "bg-accent-soft" : "bg-surface hover:bg-surface-muted",
          className,
        )
      }
      {...props}
    >
      {children}
    </Row>
  );
}

export function AppCell({ children, className = "", ...props }: AppCellProps) {
  return (
    <Cell
      className={cn(
        "border-border text-foreground px-3 py-3 align-top outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </Cell>
  );
}

export function AppPanel({
  children,
  className = "",
  density = "comfortable",
  tone = "default",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  density?: Density;
  tone?: PanelTone;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(panelVariants({ density, tone }), className)} {...props}>
      {children}
    </div>
  );
}

export function AppStatus({
  children,
  className = "",
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: StatusTone;
}) {
  return (
    <span className={cn(statusVariants({ tone }), className)}>{children}</span>
  );
}

export function AppToolbar({
  children,
  className = "",
  density = "comfortable",
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  density?: Density;
  tone?: ToolbarTone;
}) {
  return (
    <div className={cn(toolbarVariants({ density, tone }), className)}>
      {children}
    </div>
  );
}

const buttonVariants = cva(
  "rac-focus-ring rac-disabled type-label inline-flex min-w-0 items-center justify-center rounded-(--radius-control) px-4 py-3 text-center outline-none transition pressed:translate-y-px",
  {
    variants: {
      fullWidth: {
        false: "",
        true: "w-full",
      },
      selected: {
        false: "",
        true: "",
      },
      variant: {
        primary:
          "bg-accent font-semibold text-accent-foreground hover:bg-accent-strong",
        secondary:
          "border border-border-strong bg-field font-medium text-foreground hover:bg-field-hover",
      },
    },
    compoundVariants: [
      {
        className: "border-accent-strong bg-accent-soft text-foreground",
        selected: true,
        variant: "secondary",
      },
      {
        className: "bg-accent-strong text-accent-foreground",
        selected: true,
        variant: "primary",
      },
    ],
    defaultVariants: {
      fullWidth: false,
      selected: false,
      variant: "secondary",
    },
  },
);

const fieldLabelVariants = cva("type-label min-w-0 text-foreground");

const fieldInputVariants = cva(
  "rac-focus-ring rac-disabled rac-invalid w-full min-h-[var(--control-height)] rounded-(--radius-control) border bg-field px-[var(--control-padding-x)] py-[var(--control-padding-y)] text-foreground outline-none transition placeholder:text-foreground-muted",
  {
    variants: {
      density: {
        comfortable:
          "[--control-height:var(--control-height-comfortable)] [--control-padding-x:var(--control-padding-x-comfortable)] [--control-padding-y:var(--control-padding-y-comfortable)]",
        compact:
          "[--control-height:var(--control-height-compact)] [--control-padding-x:var(--control-padding-x-compact)] [--control-padding-y:var(--control-padding-y-compact)]",
      },
      invalid: {
        false:
          "border-border-strong focus-visible:border-accent focus-visible:bg-field-hover focus-visible:ring-accent-ring",
        true: "border-danger focus-visible:border-danger focus-visible:ring-danger-ring",
      },
    },
    defaultVariants: {
      density: "comfortable",
      invalid: false,
    },
  },
);

const searchFieldShellVariants = cva(
  "rac-focus-ring rac-disabled flex min-h-[var(--control-height-comfortable)] items-center gap-3 rounded-(--radius-control) border border-border-strong bg-field px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] outline-none transition focus-within:border-accent focus-within:bg-field-hover focus-within:ring-accent-ring",
);

const switchRootVariants = cva(
  "rac-focus-ring rac-disabled flex min-w-0 items-center justify-between gap-4 rounded-(--radius-control) border border-border bg-surface p-4 text-foreground outline-none transition hover:bg-surface-muted",
);

const switchTrackVariants = cva(
  "relative h-7 w-12 shrink-0 rounded-full transition",
  {
    variants: {
      selected: {
        false: "bg-field-strong",
        true: "bg-accent",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const switchThumbVariants = cva(
  "absolute top-1 left-1 h-5 w-5 rounded-full bg-foreground transition-transform",
  {
    variants: {
      selected: {
        false: "translate-x-0",
        true: "translate-x-5",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const selectTriggerVariants = cva(
  "rac-focus-ring rac-disabled flex min-w-0 min-h-[var(--control-height)] items-center justify-between rounded-(--radius-control) border border-border-strong bg-field px-[var(--control-padding-x)] py-[var(--control-padding-y)] outline-none transition hover:bg-field-hover",
  {
    variants: {
      density: {
        comfortable:
          "[--control-height:var(--control-height-comfortable)] [--control-padding-x:var(--control-padding-x-comfortable)] [--control-padding-y:var(--control-padding-y-comfortable)]",
        compact:
          "[--control-height:var(--control-height-compact)] [--control-padding-x:var(--control-padding-x-compact)] [--control-padding-y:var(--control-padding-y-compact)]",
      },
    },
    defaultVariants: {
      density: "comfortable",
    },
  },
);

const panelVariants = cva("rounded-(--radius-panel) border", {
  variants: {
    density: {
      comfortable: "p-6",
      compact: "p-4",
    },
    tone: {
      default: "border-border bg-surface",
      contrast: "border-border bg-surface-raised",
      muted: "border-border bg-surface-muted",
    },
  },
  defaultVariants: {
    density: "comfortable",
    tone: "default",
  },
});

const statusVariants = cva(
  "type-meta inline-flex items-center rounded-full border px-2.5 py-1 font-semibold",
  {
    variants: {
      tone: {
        neutral: "border-border-strong bg-surface text-foreground-subtle",
        info: "border-info bg-info-soft text-info-strong",
        success: "border-success bg-success-soft text-success-strong",
        warning: "border-warning bg-warning-soft text-warning-strong",
        danger: "border-danger bg-danger-soft text-danger-strong",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

const toolbarVariants = cva(
  "grid items-end gap-3 rounded-(--radius-panel) border",
  {
    variants: {
      density: {
        comfortable: "p-5",
        compact: "p-4",
      },
      tone: {
        default: "border-border bg-surface",
        contrast: "border-border bg-surface-raised",
      },
    },
    defaultVariants: {
      density: "comfortable",
      tone: "default",
    },
  },
);
