import type { PlatformCategory } from "./types";

export type CategoryPalette = {
  fill: string;
  fillSoft: string;
  edge: string;
  glow: string;
  line: string;
};

export const categoryColors: Record<PlatformCategory, CategoryPalette> = {
  crm: {
    fill: "#3b82f6",
    fillSoft: "rgba(59, 130, 246, 0.38)",
    edge: "rgba(147, 197, 253, 0.55)",
    glow: "rgba(59, 130, 246, 0.28)",
    line: "rgba(147, 197, 253, 0.42)",
  },
  warehouse: {
    fill: "#0ea5e9",
    fillSoft: "rgba(14, 165, 233, 0.36)",
    edge: "rgba(125, 211, 252, 0.55)",
    glow: "rgba(14, 165, 233, 0.26)",
    line: "rgba(125, 211, 252, 0.4)",
  },
  "reverse-etl": {
    fill: "#06b6d4",
    fillSoft: "rgba(6, 182, 212, 0.34)",
    edge: "rgba(103, 232, 249, 0.52)",
    glow: "rgba(6, 182, 212, 0.24)",
    line: "rgba(103, 232, 249, 0.38)",
  },
  cdp: {
    fill: "#6366f1",
    fillSoft: "rgba(99, 102, 241, 0.34)",
    edge: "rgba(165, 180, 252, 0.52)",
    glow: "rgba(99, 102, 241, 0.24)",
    line: "rgba(165, 180, 252, 0.38)",
  },
  engagement: {
    fill: "#8b5cf6",
    fillSoft: "rgba(139, 92, 246, 0.36)",
    edge: "rgba(196, 181, 253, 0.55)",
    glow: "rgba(139, 92, 246, 0.26)",
    line: "rgba(196, 181, 253, 0.4)",
  },
  "legacy-engagement": {
    fill: "#f59e0b",
    fillSoft: "rgba(245, 158, 11, 0.32)",
    edge: "rgba(252, 211, 77, 0.5)",
    glow: "rgba(245, 158, 11, 0.22)",
    line: "rgba(252, 211, 77, 0.36)",
  },
  ai: {
    fill: "#a855f7",
    fillSoft: "rgba(168, 85, 247, 0.36)",
    edge: "rgba(216, 180, 254, 0.55)",
    glow: "rgba(168, 85, 247, 0.26)",
    line: "rgba(216, 180, 254, 0.4)",
  },
  analytics: {
    fill: "#10b981",
    fillSoft: "rgba(16, 185, 129, 0.32)",
    edge: "rgba(110, 231, 183, 0.5)",
    glow: "rgba(16, 185, 129, 0.22)",
    line: "rgba(110, 231, 183, 0.36)",
  },
  customer: {
    fill: "#e2e8f0",
    fillSoft: "rgba(226, 232, 240, 0.14)",
    edge: "rgba(255, 255, 255, 0.28)",
    glow: "rgba(255, 255, 255, 0.1)",
    line: "rgba(255, 255, 255, 0.3)",
  },
};

export function formatCategoryLabel(category: PlatformCategory) {
  return category.replace("-", " ");
}
