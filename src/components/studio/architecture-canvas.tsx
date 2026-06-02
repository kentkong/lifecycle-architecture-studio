"use client";

import { useMemo } from "react";
import { ConnectionLines } from "@/components/studio/connection-lines";
import { PlatformIconMarker } from "@/components/studio/platform-icons";
import { getPlatform } from "@/lib/platforms";
import type { StudioConnection, StudioNode } from "@/lib/types";

type ArchitectureCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 880;
const TOP_PADDING = 64;
const BOTTOM_PADDING = 64;

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
    <div className="architecture-canvas-shell">
      <div className="relative mx-auto h-[min(880px,calc(100vh-240px))] w-full max-w-[960px]">
        <div className="architecture-canvas-grid absolute inset-0">
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
              <PlatformIconMarker
                key={node.id}
                platformId={node.platformId}
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
    </div>
  );
}
