import type { ArchitectureTemplate, StudioConnection, StudioNode } from "./types";

export const architectureTemplates: ArchitectureTemplate[] = [
  {
    id: "enterprise-marketing",
    name: "Enterprise Marketing Stack",
    description: "CRM → warehouse → reverse ETL → modern engagement → customer.",
    platformIds: ["salesforce", "snowflake", "hightouch", "braze", "customer"],
  },
  {
    id: "legacy-enterprise",
    name: "Legacy Enterprise Stack",
    description: "Salesforce-native marketing automation without warehouse activation.",
    platformIds: ["salesforce", "sfmc", "customer"],
  },
  {
    id: "ai-powered-lifecycle",
    name: "AI-Powered Lifecycle Stack",
    description: "Modern stack with AI-assisted content and journey intelligence.",
    platformIds: ["salesforce", "snowflake", "hightouch", "braze", "openai", "customer"],
  },
  {
    id: "cdp-analytics",
    name: "CDP & Analytics Stack",
    description: "Event collection, analytics, and engagement orchestration.",
    platformIds: ["segment", "snowflake", "mixpanel", "braze", "customer"],
  },
];

export function buildLinearArchitecture(platformIds: string[]): {
  nodes: StudioNode[];
  connections: StudioConnection[];
} {
  const nodes: StudioNode[] = platformIds.map((platformId) => ({
    id: platformId,
    platformId,
  }));

  const connections: StudioConnection[] = [];
  for (let i = 0; i < platformIds.length - 1; i += 1) {
    connections.push({ from: platformIds[i], to: platformIds[i + 1] });
  }

  return { nodes, connections };
}

export function getTemplate(id: string): ArchitectureTemplate {
  return (
    architectureTemplates.find((template) => template.id === id) ??
    architectureTemplates[0]
  );
}

export function createStateFromTemplate(templateId: string) {
  const template = getTemplate(templateId);
  const { nodes, connections } = buildLinearArchitecture(template.platformIds);
  return {
    templateId: template.id,
    nodes,
    connections,
    selectedNodeId: null as string | null,
  };
}
