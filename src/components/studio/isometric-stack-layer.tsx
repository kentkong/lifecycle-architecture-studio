"use client";

import { categoryColors } from "@/lib/category-colors";
import { getPlatformLogoScale, getPlatformLogoSrc } from "@/lib/platform-logos";
import type { PlatformCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type IsometricStackLayerProps = {
  platformId: string;
  category: PlatformCategory;
  selected?: boolean;
  depth: number;
  total: number;
  onClick?: () => void;
};

export function IsometricStackLayer({
  platformId,
  category,
  selected,
  depth,
  total,
  onClick,
}: IsometricStackLayerProps) {
  const palette = categoryColors[category];
  const fade = 0.42 + (depth / Math.max(total - 1, 1)) * 0.38;
  const uid = `${platformId}-${depth}`;
  const logoSrc = getPlatformLogoSrc(platformId);
  const logoScale = getPlatformLogoScale(platformId);
  const logoW = 132 * logoScale;
  const logoH = 30 * logoScale;
  const logoX = 160 - logoW / 2;
  const logoY = 38 - logoH / 2 - 2;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "iso-layer group relative block w-full shrink-0 transition-transform duration-300",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
        selected && "iso-layer--selected -translate-y-1",
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
        viewBox="0 0 320 76"
        className="iso-layer__svg w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`iso-top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.9} />
            <stop offset="50%" stopColor={palette.fill} stopOpacity={fade * 0.58} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.32} />
          </linearGradient>
          <linearGradient id={`iso-left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.38} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.12} />
          </linearGradient>
          <linearGradient id={`iso-right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.fill} stopOpacity={fade * 0.28} />
            <stop offset="100%" stopColor={palette.fill} stopOpacity={fade * 0.1} />
          </linearGradient>
          <clipPath id={`iso-face-${uid}`}>
            <path d="M 36 38 L 160 16 L 284 38 L 160 60 Z" />
          </clipPath>
          <filter id={`iso-glow-${uid}`} x="-40%" y="-80%" width="180%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="160" cy="66" rx="118" ry="12" fill={palette.glow} opacity={selected ? 0.6 : 0.32} />

        <path
          d="M 36 38 L 160 16 L 284 38 L 160 60 Z"
          fill={`url(#iso-top-${uid})`}
          stroke={palette.edge}
          strokeWidth="0.85"
          filter={selected ? `url(#iso-glow-${uid})` : undefined}
        />
        <path
          d="M 36 38 L 36 50 L 160 72 L 160 60 Z"
          fill={`url(#iso-left-${uid})`}
          stroke={palette.edge}
          strokeWidth="0.55"
          strokeOpacity="0.4"
        />
        <path
          d="M 284 38 L 284 50 L 160 72 L 160 60 Z"
          fill={`url(#iso-right-${uid})`}
          stroke={palette.edge}
          strokeWidth="0.55"
          strokeOpacity="0.4"
        />
        <path
          d="M 64 30 L 160 18 L 256 30"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.85"
          strokeLinecap="round"
        />

        {logoSrc ? (
          <g clipPath={`url(#iso-face-${uid})`}>
            <ellipse cx="160" cy="38" rx="72" ry="18" fill="rgba(255,255,255,0.07)" />
            <image
              href={logoSrc}
              x={logoX}
              y={logoY}
              width={logoW}
              height={logoH}
              preserveAspectRatio="xMidYMid meet"
              opacity="0.94"
            />
          </g>
        ) : null}
      </svg>
    </button>
  );
}
