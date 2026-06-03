export type PlatformCategory =
  | "crm"
  | "warehouse"
  | "reverse-etl"
  | "cdp"
  | "engagement"
  | "legacy-engagement"
  | "ai"
  | "analytics"
  | "customer";

export type Platform = {
  id: string;
  name: string;
  category: PlatformCategory;
  categoryLabel?: string;
  purpose: string;
  capabilities: string[];
  strengths: string[];
  limitations: string[];
  useCases: string[];
  integrations: string[];
  bestFor: string;
  typicalUsers: string;
};

export type ArchitectureTemplate = {
  id: string;
  name: string;
  description: string;
  /** Linear fallback when stackOrder and connections are not defined. */
  platformIds?: string[];
  /** Vertical stack order in the canvas (top → bottom). */
  stackOrder?: string[];
  /** Hub-and-spoke or branched connection graph between node ids. */
  connections?: StudioConnection[];
};

export type StudioNode = {
  id: string;
  platformId: string;
};

export type StudioConnection = {
  from: string;
  to: string;
};

export type StudioState = {
  templateId: string;
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
};
