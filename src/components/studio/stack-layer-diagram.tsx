"use client";

import { getPlatform } from "@/lib/platforms";
import { getPlatformBrand } from "@/lib/platform-brands";
import { cn } from "@/lib/utils";
import type { StudioNode } from "@/lib/types";

type StackDiamondProps = {
  label: string;
  accent: string;
  active?: boolean;
  index: number;
};

export function StackDiamond({ label, accent, active, index }: StackDiamondProps) {
  return (
    <div
      className={cn("las-diamond", active && "las-diamond--active")}
      style={
        {
          "--diamond-accent": accent,
          animationDelay: `${index * 80}ms`,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 120 70" className="las-diamond__shape" aria-hidden="true">
        <defs>
          <linearGradient id={`dg-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <polygon
          points="60,4 116,35 60,66 4,35"
          fill={`url(#dg-${index})`}
          stroke={accent}
          strokeWidth="1.5"
          strokeOpacity={active ? 0.9 : 0.45}
        />
        <polygon
          points="60,14 96,35 60,56 24,35"
          fill="none"
          stroke={accent}
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />
      </svg>
      <span className="las-diamond__label">{label}</span>
    </div>
  );
}

const layerLabels = ["Sources", "Warehouse", "Activation", "Engagement", "Outcome"];

type StackLayerDiagramProps = {
  nodes: StudioNode[];
  selectedNodeId: string | null;
  animationKey: string;
};

export function StackLayerDiagram({ nodes, selectedNodeId, animationKey }: StackLayerDiagramProps) {
  const layers = layerLabels.map((label, layerIndex) => {
    const layerNodes = nodes.filter((node) => {
      const platform = getPlatform(node.platformId);
      if (!platform) return false;
      const cat = platform.category;
      if (layerIndex === 0) return cat === "crm" || cat === "cdp" || cat === "analytics";
      if (layerIndex === 1) return cat === "warehouse";
      if (layerIndex === 2) return cat === "reverse-etl";
      if (layerIndex === 3) return cat === "engagement" || cat === "legacy-engagement" || cat === "ai";
      return cat === "customer";
    });

    const active = layerNodes.some((n) => n.id === selectedNodeId);
    const accent =
      layerNodes.length > 0
        ? getPlatformBrand(layerNodes[0].platformId).accent
        : "#60A5FA";

    return { label, accent, active, count: layerNodes.length };
  });

  return (
    <div className="las-stack" key={animationKey}>
      <p className="las-stack__eyebrow">Data flow layers</p>
      <div className="las-stack__layers">
        {layers.map((layer, index) => (
          <StackDiamond
            key={layer.label}
            label={layer.count > 0 ? `${layer.label} · ${layer.count}` : layer.label}
            accent={layer.accent}
            active={layer.active}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
