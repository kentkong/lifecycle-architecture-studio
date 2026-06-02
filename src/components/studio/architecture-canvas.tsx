"use client";

import { StackBlueprint } from "@/components/studio/stack-blueprint";
import type { StudioConnection, StudioNode } from "@/lib/types";

type ArchitectureCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  animationKey: string;
  onSelectNode: (nodeId: string) => void;
};

export function ArchitectureCanvas({
  nodes,
  selectedNodeId,
  animationKey,
  onSelectNode,
}: ArchitectureCanvasProps) {
  return (
    <div className="las-canvas-wrap">
      <StackBlueprint
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        animationKey={animationKey}
        onSelectNode={onSelectNode}
      />
    </div>
  );
}
