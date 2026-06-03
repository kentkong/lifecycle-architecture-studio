import type { ArchitectureTemplate, StudioConnection, StudioNode } from "./types";

export const architectureTemplates: ArchitectureTemplate[] = [
  {
    id: "legacy-enterprise",
    name: "Legacy Enterprise Marketing Stack",
    description:
      "Traditional enterprise architecture commonly used by large organizations running Salesforce Marketing Cloud as a centralized marketing platform.",
    platformIds: ["salesforce", "sfmc", "email-sms", "customer"],
  },
  {
    id: "modern-composable",
    name: "Modern Composable Customer Engagement Stack",
    description:
      "Modern warehouse-centric architecture increasingly adopted by enterprise marketing and customer success teams.",
    platformIds: ["salesforce", "snowflake", "hightouch", "braze", "customer"],
  },
  {
    id: "ai-powered-lifecycle",
    name: "AI-Powered Lifecycle Stack",
    description:
      "Modern AI-enabled customer engagement architecture focused on personalization and intelligent automation.",
    platformIds: ["salesforce", "snowflake", "hightouch", "braze", "ai-services", "customer"],
  },
  {
    id: "product-led-growth",
    name: "Product-Led Growth Stack",
    description: "Common architecture for SaaS companies relying heavily on product usage data.",
    platformIds: ["product-events", "segment", "snowflake", "braze", "customer"],
  },
  {
    id: "enterprise-cdp",
    name: "Enterprise Customer Data Platform",
    description: "Multi-source customer intelligence architecture used by large enterprises.",
    platformIds: [
      "crm-data",
      "product-data",
      "support-data",
      "financial-data",
      "snowflake",
      "hightouch",
      "braze",
    ],
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
    architectureTemplates[1]
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
