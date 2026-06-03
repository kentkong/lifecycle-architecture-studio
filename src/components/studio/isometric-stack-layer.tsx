"use client";

import { categoryColors } from "@/lib/category-colors";
import type { PlatformCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type IsometricStackLayerProps = {
  category: PlatformCategory;
  selected?: boolean;
  depth: number;
  total: number;
  onClick?: () => void;
};

export function IsometricStackLayer({
  category,
  selected,
  depth,
  total,
  onClick,
}: IsometricStackLayerProps) {
  const palette = categoryColors[category];
  const fade = 0.42 + (depth / Math.max(total - 1, 1)) * 0.38;
  const isCustomer = category === "customer";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "iso-layer group relative block w-[min(240px,58vw)] shrink-0 transition-transform duration-300",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
        selected && "iso-layer--selected -translate-y-1",
        isCustomer && "iso-layer--ghost",
      )}
      style={
        {
          "--layer-fill": palette.fill,
          "--layer-soft": palette.fillSoft,
          "--layer-edge": palette.edge,
          "--layer-glow": palette.glow,
          "--layer-fade": fade,
          zIndex: total - depth,
        } as React.CSSProperties
      }
    >
      <svg
        viewBox="0 0 240 52"
        className="iso-layer__svg w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`iso-top-${category}-${depth}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.85} />
            <stop offset="55%" stopColor={palette.fill} stopOpacity={fade * 0.55} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.35} />
          </linearGradient>
          <linearGradient id={`iso-left-${category}-${depth}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.22} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.08} />
          </linearGradient>
          <linearGradient id={`iso-right-${category}-${depth}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.12} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.28} />
          </linearGradient>
          <filter id={`iso-glow-${category}-${depth}`} x="-40%" y="-80%" width="180%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="120" cy="46" rx="88" ry="10" fill={palette.glow} opacity={selected ? 0.55 : 0.28} />

        <path
          d="M 28 28 L 120 12 L 212 28 L 120 44 Z"
          fill={`url(#iso-top-${category}-${depth})`}
          stroke={palette.edge}
          strokeWidth="0.75"
          filter={selected ? `url(#iso-glow-${category}-${depth})` : undefined}
        />
        <path
          d="M 28 28 L 28 34 L 120 50 L 120 44 Z"
          fill={`url(#iso-left-${category}-${depth})`}
          stroke={palette.edge}
          strokeWidth="0.5"
          strokeOpacity="0.35"
        />
        <path
          d="M 212 28 L 212 34 L 120 50 L 120 44 Z"
          fill={`url(#iso-right-${category}-${depth})`}
          stroke={palette.edge}
          strokeWidth="0.5"
          strokeOpacity="0.35"
        />

        <path
          d="M 52 22 L 120 10 L 188 22"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
