"use client";

import { IsometricStackCanvas } from "@/components/studio/isometric-stack-canvas";
import type { StudioConnection, StudioNode } from "@/lib/types";

type ArchitectureCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

export function ArchitectureCanvas({
  nodes,
  selectedNodeId,
  onSelectNode,
}: ArchitectureCanvasProps) {
  return (
    <IsometricStackCanvas
      nodes={nodes}
      selectedNodeId={selectedNodeId}
      onSelectNode={onSelectNode}
    />
  );
}
