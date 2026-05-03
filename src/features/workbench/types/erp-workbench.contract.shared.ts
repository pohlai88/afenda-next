export type WorkbenchItemCategory =
  | "primitive"
  | "pattern"
  | "scene"
  | "contract";

export type WorkbenchItemStatus = "approved" | "draft" | "deprecated";

export type WorkbenchItem = {
  id: string;
  name: string;
  category: WorkbenchItemCategory;
  status: WorkbenchItemStatus;
  sourcePath: string;
  ariaPrimitives: string[];
  states: string[];
  tokens: string[];
  useWhen: string[];
  doNotUseWhen: string[];
  render: () => React.ReactNode;
};
