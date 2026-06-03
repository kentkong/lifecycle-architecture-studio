"use client";

import { useMemo } from "react";
import { IsometricStackLayer } from "@/components/studio/isometric-stack-layer";
import { PlatformLogo } from "@/components/studio/platform-logo";
import { categoryColors, formatCategoryLabel } from "@/lib/category-colors";
import { getPlatform } from "@/lib/platforms";
import { getCustomerNode, getStackLayerNodes } from "@/lib/stack-nodes";
import type { StudioConnection, StudioNode } from "@/lib/types";
import { cn } from "@/lib/utils";

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
const LAYER_HALF_WIDTH = 128;

type LayerLayout = {
  node: StudioNode;
  index: number;
  centerY: number;
  side: "left" | "right";
  platformName: string;
  category: string;
  lineColor: string;
};

function calloutSide(index: number): LayerLayout["side"] {
  return index % 2 === 0 ? "right" : "left";
}

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

        const palette = categoryColors[platform.category];

        return {
          node,
          index,
          centerY: STACK_TOP + index * LAYER_GAP,
          side: calloutSide(index),
          platformName: platform.name,
          category: formatCategoryLabel(platform.category),
          lineColor: palette.line,
        } satisfies LayerLayout;
      })
      .filter(Boolean) as LayerLayout[];
  }, [stackNodes]);

  const customerPlatform = customerNode ? getPlatform(customerNode.platformId) : null;
  const canvasHeight =
    STACK_TOP + Math.max(stackNodes.length - 1, 0) * LAYER_GAP + (customerPlatform ? 118 : 72);

  const pctX = (x: number) => `${(x / CANVAS_WIDTH) * 100}%`;
  const pctY = (y: number) => `${(y / canvasHeight) * 100}%`;

  const calloutPaths = useMemo(() => {
    return layouts.map((layout) => {
      const layerX = STACK_CENTER_X;
      const layerY = layout.centerY + 14;

      if (layout.side === "right") {
        const labelX = CANVAS_WIDTH - 44;
        const labelY = layout.centerY;
        const midX = layerX + 148;
        return {
          id: layout.node.id,
          d: `M ${layerX + LAYER_HALF_WIDTH} ${layerY} L ${midX} ${layerY} L ${midX} ${labelY} L ${labelX} ${labelY}`,
          labelX,
          labelY,
          anchor: "end" as const,
        };
      }

      const labelX = 44;
      const labelY = layout.centerY;
      const midX = layerX - 148;
      return {
        id: layout.node.id,
        d: `M ${layerX - LAYER_HALF_WIDTH} ${layerY} L ${midX} ${layerY} L ${midX} ${labelY} L ${labelX} ${labelY}`,
        labelX,
        labelY,
        anchor: "start" as const,
      };
    });
  }, [layouts]);

  const axisBottom =
    layouts.length > 0
      ? layouts[layouts.length - 1].centerY + 52
      : STACK_TOP + 48;

  const customerLabelY = axisBottom + 36;

  return (
    <div className="iso-canvas relative mx-auto w-full max-w-[980px]">
      <div className="canvas-grid iso-canvas__grid absolute inset-0 rounded-[28px] border border-white/6" />

      <div
        className="iso-canvas__stage relative mx-auto w-full"
        style={{ height: canvasHeight, maxWidth: CANVAS_WIDTH }}
      >
        <svg
          className="iso-canvas__lines pointer-events-none absolute inset-0 h-full w-full"
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

          {calloutPaths.map((path, i) => {
            const layout = layouts[i];
            return (
              <g key={path.id}>
                <path
                  d={path.d}
                  fill="none"
                  stroke={layout.lineColor}
                  strokeWidth="0.75"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx={
                    path.anchor === "end"
                      ? path.labelX - 4
                      : path.labelX + 4
                  }
                  cy={path.labelY}
                  r="1.5"
                  fill={layout.lineColor}
                  opacity="0.7"
                />
              </g>
            );
          })}

          {customerPlatform && customerNode && layouts.length > 0 ? (
            <g>
              <path
                d={`M ${STACK_CENTER_X} ${axisBottom} L ${STACK_CENTER_X} ${customerLabelY - 20}`}
                fill="none"
                stroke={categoryColors.customer.line}
                strokeWidth="0.75"
                strokeOpacity="0.45"
                strokeDasharray="4 6"
              />
              <circle
                cx={STACK_CENTER_X}
                cy={customerLabelY - 20}
                r="1.5"
                fill={categoryColors.customer.line}
                opacity="0.6"
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

        {layouts.map((layout, i) => {
          const path = calloutPaths[i];
          const selected = selectedNodeId === layout.node.id;

          return (
            <button
              key={`label-${layout.node.id}`}
              type="button"
              onClick={() => onSelectNode(layout.node.id)}
              className={cn(
                "iso-callout absolute max-w-[148px] text-left transition-opacity duration-300",
                selected ? "opacity-100" : "opacity-70 hover:opacity-95",
                layout.side === "right" && "iso-callout--right",
                layout.side === "left" && "iso-callout--left",
              )}
              style={{
                top: pctY(path.labelY - 18),
                ...(layout.side === "right"
                  ? { right: pctX(44), left: "auto" }
                  : { left: pctX(44), right: "auto" }),
              }}
            >
              <span className="iso-callout__category">{layout.category}</span>
              <span className="iso-callout__name">
                <PlatformLogo platformId={layout.node.platformId} size="sm" className="iso-callout__logo" />
                {layout.platformName}
              </span>
            </button>
          );
        })}

        {customerPlatform && customerNode ? (
          <button
            type="button"
            onClick={() => onSelectNode(customerNode.id)}
            className={cn(
              "iso-callout iso-callout--bottom absolute max-w-[200px] transition-opacity duration-300",
              selectedNodeId === customerNode.id ? "opacity-100" : "opacity-65 hover:opacity-90",
            )}
            style={{
              top: pctY(customerLabelY - 10),
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span className="iso-callout__category">customer</span>
            <span className="iso-callout__name">
              <PlatformLogo platformId={customerNode.platformId} size="sm" className="iso-callout__logo" />
              {customerPlatform.name}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
