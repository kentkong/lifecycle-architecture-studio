"use client";

import { cn } from "@/lib/utils";

type GlowVariant = "blue" | "green";

const PALETTES: Record<
  GlowVariant,
  { top: string; mid: string; side: string; edge: string; glow: string }
> = {
  blue: {
    top: "#38bdf8",
    mid: "#2563eb",
    side: "#1e40af",
    edge: "rgba(56,189,248,0.45)",
    glow: "rgba(56,189,248,0.55)",
  },
  green: {
    top: "#2dd4bf",
    mid: "#14b8a6",
    side: "#0f766e",
    edge: "rgba(45,212,191,0.45)",
    glow: "rgba(45,212,191,0.55)",
  },
};

type IsometricDiamondProps = {
  label: string;
  active?: boolean;
  index: number;
  total: number;
  animationKey: string;
  stacked?: boolean;
};

const TOP = "160,16 268,70 160,124 52,70";
const TOP_INNER = "160,34 238,70 160,106 82,70";
const LEFT_FACE = "52,70 160,124 160,158 52,104";
const RIGHT_FACE = "160,124 268,70 268,104 160,158";

export function IsometricDiamond({
  label,
  active,
  index,
  total,
  animationKey,
  stacked = false,
}: IsometricDiamondProps) {
  const uid = `${animationKey}-${index}`;
  const variant: GlowVariant = index % 2 === 0 ? "blue" : "green";
  const palette = PALETTES[variant];
  const zIndex = total - index;

  return (
    <div
      className={cn(
        "las-iso",
        stacked && "las-iso--stacked",
        active && "las-iso--lit",
        variant === "blue" ? "las-iso--blue" : "las-iso--green",
      )}
      style={{
        animationDelay: `${index * 80}ms`,
        zIndex,
        ["--iso-i" as string]: index,
        ["--iso-glow" as string]: palette.glow,
      }}
    >
      <div className="las-iso__glow" aria-hidden="true" />

      <svg viewBox="0 0 320 172" className="las-iso__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.top} stopOpacity="0.42" />
            <stop offset="55%" stopColor={palette.mid} stopOpacity="0.28" />
            <stop offset="100%" stopColor={palette.side} stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.mid} stopOpacity="0.38" />
            <stop offset="100%" stopColor={palette.side} stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.side} stopOpacity="0.32" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.45" />
          </linearGradient>
          <filter id={`edge-glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="las-iso__slab" opacity={active ? 0.88 : 0.72} filter={`url(#edge-glow-${uid})`}>
          <polygon points={LEFT_FACE} fill={`url(#left-${uid})`} />
          <polygon points={RIGHT_FACE} fill={`url(#right-${uid})`} />
          <polygon
            points={TOP}
            fill={`url(#top-${uid})`}
            stroke={palette.edge}
            strokeWidth="1.25"
          />
          <polygon
            points={TOP_INNER}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.75"
          />
        </g>

        <text
          x="160"
          y="74"
          textAnchor="middle"
          className="las-iso__text"
          fill="rgba(255,255,255,0.88)"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.06em"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
