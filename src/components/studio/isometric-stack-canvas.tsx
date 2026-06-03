"use client";

import { useMemo } from "react";
import { IsometricStackLayer } from "@/components/studio/isometric-stack-layer";
import { getPlatformColors } from "@/lib/platform-colors";
import { getPlatform } from "@/lib/platforms";
import { getCustomerNode, getStackLayerNodes } from "@/lib/stack-nodes";
import type { StudioConnection, StudioNode } from "@/lib/types";

type IsometricStackCanvasProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

const CANVAS_WIDTH = 920;
const LAYER_GAP = 62;
const STACK_TOP = 88;
const STACK_CENTER_X = CANVAS_WIDTH / 2;

export function IsometricStackCanvas({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
}: IsometricStackCanvasProps) {
  const stackNodes = useMemo(
    () => getStackLayerNodes(nodes, connections),
    [nodes, connections],
  );

  const customerNode = useMemo(() => getCustomerNode(nodes), [nodes]);

  const layouts = useMemo(() => {
    return stackNodes
      .map((node, index) => {
        const platform = getPlatform(node.platformId);
        if (!platform) return null;

        return {
          node,
          index,
          centerY: STACK_TOP + index * LAYER_GAP,
        };
      })
      .filter(Boolean) as { node: StudioNode; index: number; centerY: number }[];
  }, [stackNodes]);

  const customerPlatform = customerNode ? getPlatform(customerNode.platformId) : null;
  const canvasHeight =
    STACK_TOP + Math.max(stackNodes.length - 1, 0) * LAYER_GAP + (customerPlatform ? 118 : 72);

  const pctY = (y: number) => `${(y / canvasHeight) * 100}%`;

  const axisBottom =
    layouts.length > 0
      ? layouts[layouts.length - 1].centerY + 52
      : STACK_TOP + 48;

  const customerLabelY = axisBottom + 36;

  return (
    <div className="iso-canvas relative mx-auto w-full">
      <div
        className="iso-canvas__stage relative mx-auto w-full"
        style={{ height: canvasHeight, maxWidth: CANVAS_WIDTH }}
      >
        <svg
          className="iso-canvas__lines pointer-events-none absolute inset-0 z-[1] h-full w-full"
          viewBox={`0 0 ${CANVAS_WIDTH} ${canvasHeight}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="iso-axis-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(147, 197, 253, 0.05)" />
              <stop offset="35%" stopColor="rgba(96, 165, 250, 0.22)" />
              <stop offset="70%" stopColor="rgba(167, 139, 250, 0.22)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.08)" />
            </linearGradient>
          </defs>

          {layouts.length > 1 ? (
            <line
              x1={STACK_CENTER_X}
              y1={STACK_TOP - 20}
              x2={STACK_CENTER_X}
              y2={axisBottom}
              stroke="url(#iso-axis-gradient)"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
          ) : null}

          {customerPlatform && customerNode && layouts.length > 0 ? (
            <g>
              <path
                d={`M ${STACK_CENTER_X} ${axisBottom} L ${STACK_CENTER_X} ${customerLabelY - 20}`}
                fill="none"
                stroke={getPlatformColors("customer", "customer").fill}
                strokeWidth="1.35"
                strokeDasharray="4 6"
              />
              <circle
                cx={STACK_CENTER_X}
                cy={customerLabelY - 20}
                r="2"
                fill={getPlatformColors("customer", "customer").fill}
                opacity="0.85"
              />
            </g>
          ) : null}
        </svg>

        <div className="iso-canvas__stack-wrap absolute left-1/2 -translate-x-1/2" style={{ top: pctY(STACK_TOP - 28) }}>
          <div className="iso-canvas__stack">
            <div className="iso-canvas__glow pointer-events-none" aria-hidden="true" />
            {layouts.map((layout) => {
              const platform = getPlatform(layout.node.platformId);
              if (!platform) return null;

              return (
                <div
                  key={layout.node.id}
                  className="iso-canvas__layer-row flex justify-center"
                  style={{ marginTop: layout.index === 0 ? 0 : -26 }}
                >
                  <IsometricStackLayer
                    platformId={layout.node.platformId}
                    platformName={platform.name}
                    category={platform.category}
                    selected={selectedNodeId === layout.node.id}
                    depth={layout.index}
                    total={layouts.length}
                    onClick={() => onSelectNode(layout.node.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
