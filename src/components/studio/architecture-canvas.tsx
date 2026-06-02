"use client";

import { useMemo } from "react";
import { ConnectionLines } from "@/components/studio/connection-lines";
import { PlatformNode } from "@/components/studio/platform-node";
import { getPlatform } from "@/lib/platforms";
import type { StudioConnection, StudioNode } from "@/lib/types";

type ArchitectureCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 920;
const TOP_PADDING = 80;
const BOTTOM_PADDING = 80;

export function ArchitectureCanvas({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
}: ArchitectureCanvasProps) {
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const usableHeight = CANVAS_HEIGHT - TOP_PADDING - BOTTOM_PADDING;
    const step = nodes.length > 1 ? usableHeight / (nodes.length - 1) : 0;

    nodes.forEach((node, index) => {
      positions[node.id] = {
        x: CANVAS_WIDTH / 2,
        y: TOP_PADDING + step * index,
      };
    });

    return positions;
  }, [nodes]);

  return (
    <div className="relative mx-auto h-[min(920px,calc(100vh-220px))] w-full max-w-[960px]">
      <div className="canvas-grid absolute inset-0 rounded-[28px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="relative h-full w-full">
        <ConnectionLines
          connections={connections}
          nodePositions={nodePositions}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        {nodes.map((node) => {
          const platform = getPlatform(node.platformId);
          if (!platform) return null;
          const position = nodePositions[node.id];
          return (
            <PlatformNode
              key={node.id}
              name={platform.name}
              category={platform.category}
              selected={selectedNodeId === node.id}
              onClick={() => onSelectNode(node.id)}
              style={{
                top: `${(position.y / CANVAS_HEIGHT) * 100}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
