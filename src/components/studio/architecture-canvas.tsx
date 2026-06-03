"use client";

import { IsometricStackCanvas } from "@/components/studio/isometric-stack-canvas";
import type { StudioConnection, StudioNode } from "@/lib/types";

type ArchitectureCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  description?: string;
};

export function ArchitectureCanvas({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  description,
}: ArchitectureCanvasProps) {
  return (
    <IsometricStackCanvas
      nodes={nodes}
      connections={connections}
      selectedNodeId={selectedNodeId}
      onSelectNode={onSelectNode}
      description={description}
    />
  );
}
