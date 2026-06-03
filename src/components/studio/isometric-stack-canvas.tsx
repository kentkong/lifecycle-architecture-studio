"use client";

import { useMemo } from "react";
import { IsometricStackLayer } from "@/components/studio/isometric-stack-layer";
import { categoryColors, formatCategoryLabel } from "@/lib/category-colors";
import { getPlatform } from "@/lib/platforms";
import type { StudioNode } from "@/lib/types";
import { cn } from "@/lib/utils";

type IsometricStackCanvasProps = {
  nodes: StudioNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

const CANVAS_WIDTH = 880;
const LAYER_GAP = 54;
const STACK_TOP = 96;
const STACK_CENTER_X = CANVAS_WIDTH / 2;

type LayerLayout = {
  node: StudioNode;
  index: number;
  centerY: number;
  side: "left" | "right" | "bottom";
  platformName: string;
  category: string;
  lineColor: string;
};

function calloutSide(index: number, isCustomer: boolean): LayerLayout["side"] {
  if (isCustomer) return "bottom";
  return index % 2 === 0 ? "right" : "left";
}

export function IsometricStackCanvas({
  nodes,
  selectedNodeId,
  onSelectNode,
}: IsometricStackCanvasProps) {
  const layouts = useMemo(() => {
    return nodes
      .map((node, index) => {
        const platform = getPlatform(node.platformId);
        if (!platform) return null;

        const palette = categoryColors[platform.category];

        return {
          node,
          index,
          centerY: STACK_TOP + index * LAYER_GAP,
          side: calloutSide(index, platform.category === "customer"),
          platformName: platform.name,
          category: formatCategoryLabel(platform.category),
          lineColor: palette.line,
        } satisfies LayerLayout;
      })
      .filter(Boolean) as LayerLayout[];
  }, [nodes]);

  const canvasHeight = STACK_TOP + (nodes.length - 1) * LAYER_GAP + 140;

  const pctX = (x: number) => `${(x / CANVAS_WIDTH) * 100}%`;
  const pctY = (y: number) => `${(y / canvasHeight) * 100}%`;

  const calloutPaths = useMemo(() => {
    return layouts.map((layout) => {
      const layerX = STACK_CENTER_X;
      const layerY = layout.centerY + 8;

      if (layout.side === "right") {
        const labelX = CANVAS_WIDTH - 48;
        const labelY = layout.centerY;
        const midX = layerX + 130;
        return {
          id: layout.node.id,
          d: `M ${layerX + 92} ${layerY} L ${midX} ${layerY} L ${midX} ${labelY} L ${labelX} ${labelY}`,
          labelX,
          labelY,
          anchor: "end" as const,
        };
      }

      if (layout.side === "left") {
        const labelX = 48;
        const labelY = layout.centerY;
        const midX = layerX - 130;
        return {
          id: layout.node.id,
          d: `M ${layerX - 92} ${layerY} L ${midX} ${layerY} L ${midX} ${labelY} L ${labelX} ${labelY}`,
          labelX,
          labelY,
          anchor: "start" as const,
        };
      }

      const labelY = layout.centerY + 72;
      return {
        id: layout.node.id,
        d: `M ${layerX} ${layerY + 18} L ${layerX} ${labelY - 18}`,
        labelX: layerX,
        labelY,
        anchor: "middle" as const,
      };
    });
  }, [layouts]);

  return (
    <div className="iso-canvas relative mx-auto w-full max-w-[920px]">
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

          <line
            x1={STACK_CENTER_X}
            y1={STACK_TOP - 24}
            x2={STACK_CENTER_X}
            y2={STACK_TOP + (nodes.length - 1) * LAYER_GAP + 48}
            stroke="url(#iso-axis-gradient)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

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
                      : path.anchor === "start"
                        ? path.labelX + 4
                        : path.labelX
                  }
                  cy={path.labelY}
                  r="1.5"
                  fill={layout.lineColor}
                  opacity="0.7"
                />
              </g>
            );
          })}
        </svg>

        <div
          className="iso-canvas__stack absolute left-1/2 -translate-x-1/2"
          style={{ top: pctY(STACK_TOP - 20) }}
        >
          <div className="iso-canvas__glow pointer-events-none" aria-hidden="true" />
          {layouts.map((layout) => {
            const platform = getPlatform(layout.node.platformId);
            if (!platform) return null;

            return (
              <div
                key={layout.node.id}
                className="iso-canvas__layer-row flex justify-center"
                style={{ marginTop: layout.index === 0 ? 0 : -22 }}
              >
                <IsometricStackLayer
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

        {layouts.map((layout, i) => {
          const path = calloutPaths[i];
          const selected = selectedNodeId === layout.node.id;
          const labelTop = layout.side === "bottom" ? path.labelY - 8 : path.labelY - 18;

          return (
            <button
              key={`label-${layout.node.id}`}
              type="button"
              onClick={() => onSelectNode(layout.node.id)}
              className={cn(
                "iso-callout absolute max-w-[140px] text-left transition-opacity duration-300",
                selected ? "opacity-100" : "opacity-70 hover:opacity-95",
                layout.side === "right" && "iso-callout--right",
                layout.side === "left" && "iso-callout--left",
                layout.side === "bottom" && "iso-callout--bottom",
              )}
              style={{
                top: pctY(labelTop),
                ...(layout.side === "right"
                  ? { right: pctX(48), left: "auto" }
                  : layout.side === "left"
                    ? { left: pctX(48), right: "auto" }
                    : { left: "50%", right: "auto", transform: "translateX(-50%)" }),
              }}
            >
              <span className="iso-callout__category">{layout.category}</span>
              <span className="iso-callout__name">{layout.platformName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
