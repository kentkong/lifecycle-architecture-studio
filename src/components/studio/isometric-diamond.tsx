"use client";

import { cn } from "@/lib/utils";

type ToneVariant = "blue" | "green";

const PALETTES: Record<
  ToneVariant,
  { top: string; mid: string; side: string; edge: string }
> = {
  blue: {
    top: "#38bdf8",
    mid: "#2563eb",
    side: "#1e40af",
    edge: "rgba(56,189,248,0.22)",
  },
  green: {
    top: "#2dd4bf",
    mid: "#14b8a6",
    side: "#0f766e",
    edge: "rgba(45,212,191,0.2)",
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
  const variant: ToneVariant = index % 2 === 0 ? "blue" : "green";
  const palette = PALETTES[variant];
  const zIndex = total - index;
  const slabOpacity = active ? 0.52 : 0.32;

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
      }}
    >
      <svg viewBox="0 0 320 172" className="las-iso__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.top} stopOpacity="0.28" />
            <stop offset="55%" stopColor={palette.mid} stopOpacity="0.18" />
            <stop offset="100%" stopColor={palette.side} stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.mid} stopOpacity="0.24" />
            <stop offset="100%" stopColor={palette.side} stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.side} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <g className="las-iso__slab" opacity={slabOpacity}>
          <polygon points={LEFT_FACE} fill={`url(#left-${uid})`} />
          <polygon points={RIGHT_FACE} fill={`url(#right-${uid})`} />
          <polygon
            points={TOP}
            fill={`url(#top-${uid})`}
            stroke={palette.edge}
            strokeWidth="1"
          />
          <polygon
            points={TOP_INNER}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.65"
          />
        </g>

        <text
          x="160"
          y="74"
          textAnchor="middle"
          className="las-iso__text"
          fill={active ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.45)"}
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.06em"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
