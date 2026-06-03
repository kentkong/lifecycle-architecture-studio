import { getPlatform } from "./platforms";
import type { StudioConnection, StudioNode } from "./types";

/** Platforms that sit on the connected stack axis (systems only — not Customer). */
export function getStackLayerNodes(
  nodes: StudioNode[],
  connections: StudioConnection[],
): StudioNode[] {
  const connectedIds = new Set<string>();
  for (const connection of connections) {
    connectedIds.add(connection.from);
    connectedIds.add(connection.to);
  }

  return nodes.filter((node) => {
    if (!connectedIds.has(node.id)) return false;
    const platform = getPlatform(node.platformId);
    if (!platform || platform.category === "customer") return false;
    return true;
  });
}

export function getCustomerNode(nodes: StudioNode[]): StudioNode | null {
  return nodes.find((node) => getPlatform(node.platformId)?.category === "customer") ?? null;
}
