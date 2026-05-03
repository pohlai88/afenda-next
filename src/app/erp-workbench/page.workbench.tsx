"use client";

import { useState } from "react";

import {
  ContractCoverageTable,
  WorkbenchHeaderLink,
  WorkbenchItemCard,
  WorkbenchSectionFilter,
  WorkbenchSection,
} from "@/components/ui/app-controls.workbench";
import { WorkbenchInspector } from "@/erp-workbench/workbench-inspector";
import {
  APPROVED_PRIMITIVE_ITEMS,
  getWorkbenchItemsByCategory,
  WORKBENCH_ITEMS,
} from "@/erp-workbench/workbench-registry";

const sectionContent = {
  primitive: {
    description:
      "Approved shared UI primitives built on React Aria and already in Afenda use.",
    id: "primitives",
    title: "Primitives",
  },
  pattern: {
    description:
      "Approved ERP compositions that combine existing controls into repeatable workflow shapes.",
    id: "patterns",
    title: "Patterns",
  },
  scene: {
    description:
      "A realistic ERP workflow slice that proves the system under operational pressure.",
    id: "scenes",
    title: "Scenes",
  },
  contract: {
    description:
      "The compact approval matrix for shared controls, their states, and their source paths.",
    id: "contract",
    title: "Contract Coverage",
  },
} as const;

export default function ErpWorkbenchPage() {
  const fallbackItem = WORKBENCH_ITEMS[0];
  if (!fallbackItem) {
    throw new Error("ERP Workbench requires at least one registered item.");
  }

  const [selectedItemId, setSelectedItemId] = useState(fallbackItem.id);
  const [activeCategory, setActiveCategory] = useState<
    "all" | keyof typeof sectionContent
  >("all");

  const selectedItem =
    WORKBENCH_ITEMS.find((item) => item.id === selectedItemId) ?? fallbackItem;
  const visibleCategories =
    activeCategory === "all"
      ? (Object.keys(sectionContent) as Array<keyof typeof sectionContent>)
      : [activeCategory];

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="border-border flex flex-wrap items-end justify-between gap-4 border-b pb-6">
          <div className="space-y-2">
            <p className="type-kicker text-accent-strong">Afenda internal UI</p>
            <h1 className="type-page-title">ERP Workbench</h1>
            <p className="type-body-sm text-foreground-muted max-w-2xl">
              Single inspection surface for approved shared controls, ERP
              compositions, and workflow scenes.
            </p>
          </div>
          <WorkbenchHeaderLink />
        </div>

        <nav className="flex flex-wrap gap-3">
          {Object.values(sectionContent).map((section) => (
            <a
              className="type-label border-border-strong bg-surface hover:bg-field-hover rounded-[var(--radius-control)] border px-4 py-3 transition"
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title}
            </a>
          ))}
        </nav>

        <WorkbenchSectionFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-8">
            {visibleCategories.map((category) => (
              <WorkbenchSection
                description={sectionContent[category].description}
                id={sectionContent[category].id}
                key={category}
                title={sectionContent[category].title}
              >
                <div
                  className={
                    category === "primitive"
                      ? "grid gap-4 xl:grid-cols-2"
                      : "grid gap-4"
                  }
                >
                  {getWorkbenchItemsByCategory(category).map((item) => (
                    <WorkbenchItemCard
                      isSelected={item.id === selectedItem.id}
                      item={item}
                      key={item.id}
                      onInspect={setSelectedItemId}
                    />
                  ))}
                  {category === "contract" ? (
                    <ContractCoverageTable
                      items={APPROVED_PRIMITIVE_ITEMS}
                      onInspect={setSelectedItemId}
                      selectedItemId={selectedItem.id}
                    />
                  ) : null}
                </div>
              </WorkbenchSection>
            ))}
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <WorkbenchInspector item={selectedItem} />
          </aside>
        </div>
      </div>
    </main>
  );
}
