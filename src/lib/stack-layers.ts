import type { PlatformCategory } from "./types";

export type StackLayer = {
  id: string;
  label: string;
  shortLabel: string;
  categories: PlatformCategory[];
};

export const stackLayers: StackLayer[] = [
  {
    id: "sources",
    label: "CRM & Data Sources",
    shortLabel: "Sources",
    categories: ["crm", "cdp", "analytics"],
  },
  {
    id: "warehouse",
    label: "Data Warehouse",
    shortLabel: "Warehouse",
    categories: ["warehouse"],
  },
  {
    id: "activation",
    label: "Reverse ETL & Activation",
    shortLabel: "Activation",
    categories: ["reverse-etl"],
  },
  {
    id: "engagement",
    label: "Engagement & Messaging",
    shortLabel: "Engagement",
    categories: ["engagement", "legacy-engagement"],
  },
  {
    id: "outcome",
    label: "AI & Customer Outcome",
    shortLabel: "Outcome",
    categories: ["ai", "customer"],
  },
];

export function getLayerForCategory(category: PlatformCategory): StackLayer {
  return (
    stackLayers.find((layer) => layer.categories.includes(category)) ?? stackLayers[0]
  );
}
