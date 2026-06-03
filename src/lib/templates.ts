import type { ArchitectureTemplate, StudioConnection, StudioNode } from "./types";

function connect(from: string, to: string): StudioConnection {
  return { from, to };
}

function fanIn(sources: string[], hub: string): StudioConnection[] {
  return sources.map((source) => connect(source, hub));
}

function fanOut(hub: string, targets: string[]): StudioConnection[] {
  return targets.map((target) => connect(hub, target));
}

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
      "Snowflake acts as the source of truth. Hightouch activates audiences into Braze, BI, and advertising platforms for engagement, reporting, and acquisition.",
    stackOrder: [
      "salesforce",
      "product-data",
      "support-data",
      "web-events",
      "snowflake",
      "hightouch",
      "braze",
      "bi-platforms",
      "advertising-platforms",
      "customer",
    ],
    connections: [
      ...fanIn(["salesforce", "product-data", "support-data", "web-events"], "snowflake"),
      connect("snowflake", "hightouch"),
      ...fanOut("hightouch", ["braze", "bi-platforms", "advertising-platforms"]),
      connect("braze", "customer"),
    ],
  },
  {
    id: "ai-powered-lifecycle",
    name: "AI-Powered Lifecycle Stack",
    description:
      "AI enriches warehouse data alongside Snowflake — supporting segmentation, personalization, content, recommendations, and insights before activation through Braze.",
    stackOrder: [
      "salesforce",
      "product-events",
      "support-data",
      "snowflake",
      "openai",
      "claude",
      "hightouch",
      "braze",
      "customer",
    ],
    connections: [
      ...fanIn(["salesforce", "product-events", "support-data"], "snowflake"),
      connect("snowflake", "openai"),
      connect("snowflake", "claude"),
      connect("openai", "hightouch"),
      connect("claude", "hightouch"),
      connect("hightouch", "braze"),
      connect("braze", "customer"),
    ],
  },
  {
    id: "product-led-growth",
    name: "Product-Led Growth Stack",
    description:
      "Segment captures behavioural events from web, mobile, and backend systems. Snowflake stores customer intelligence. Braze activates lifecycle journeys.",
    stackOrder: [
      "web-app",
      "mobile-app",
      "backend-events",
      "segment",
      "snowflake",
      "braze",
      "customer",
    ],
    connections: [
      ...fanIn(["web-app", "mobile-app", "backend-events"], "segment"),
      connect("segment", "snowflake"),
      connect("snowflake", "braze"),
      connect("braze", "customer"),
    ],
  },
  {
    id: "customer-360",
    name: "Customer 360 Stack",
    description:
      "Demonstrates how organizations unify CRM, commerce, support, product, and marketing data into a single customer view before activation across engagement, ads, and BI.",
    stackOrder: [
      "salesforce",
      "commerce-data",
      "support-data",
      "product-usage",
      "marketing-data",
      "snowflake",
      "customer-360",
      "hightouch",
      "braze",
      "advertising-platforms",
      "bi-platforms",
      "customer",
    ],
    connections: [
      ...fanIn(
        ["salesforce", "commerce-data", "support-data", "product-usage", "marketing-data"],
        "snowflake",
      ),
      connect("snowflake", "customer-360"),
      connect("customer-360", "hightouch"),
      ...fanOut("hightouch", ["braze", "advertising-platforms", "bi-platforms"]),
      connect("braze", "customer"),
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

function buildFromTemplate(template: ArchitectureTemplate): {
  nodes: StudioNode[];
  connections: StudioConnection[];
} {
  if (template.stackOrder && template.connections) {
    return {
      nodes: template.stackOrder.map((platformId) => ({ id: platformId, platformId })),
      connections: template.connections,
    };
  }

  return buildLinearArchitecture(template.platformIds ?? []);
}

export function getTemplate(id: string): ArchitectureTemplate {
  return (
    architectureTemplates.find((template) => template.id === id) ??
    architectureTemplates[1]
  );
}

export function createStateFromTemplate(templateId: string) {
  const template = getTemplate(templateId);
  const { nodes, connections } = buildFromTemplate(template);
  return {
    templateId: template.id,
    nodes,
    connections,
    selectedNodeId: null as string | null,
  };
}
