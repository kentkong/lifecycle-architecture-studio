"use client";

import { cn } from "@/lib/utils";

/** Per-layer blue tier — bright top → deep bottom (Binmile-style) */
const TIERS = [
  { top: "#5eead4", mid: "#38bdf8", side: "#0ea5e9", edge: "rgba(94,234,212,0.35)" },
  { top: "#38bdf8", mid: "#3b82f6", side: "#2563eb", edge: "rgba(56,189,248,0.32)" },
  { top: "#3b82f6", mid: "#2563eb", side: "#1d4ed8", edge: "rgba(59,130,246,0.28)" },
  { top: "#2563eb", mid: "#1d4ed8", side: "#1e40af", edge: "rgba(37,99,235,0.25)" },
  { top: "#1d4ed8", mid: "#1e3a8a", side: "#172554", edge: "rgba(29,78,216,0.22)" },
];

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
const CIRCUIT = "M52,70 L160,16 L268,70 L160,124 Z";

export function IsometricDiamond({
  label,
  active,
  index,
  total,
  animationKey,
  stacked = false,
}: IsometricDiamondProps) {
  const uid = `${animationKey}-${index}`;
  const tier = TIERS[Math.min(index, TIERS.length - 1)];
  const zIndex = total - index;

  return (
    <div
      className={cn("las-iso", stacked && "las-iso--stacked", active && "las-iso--lit")}
      style={{
        animationDelay: `${index * 80}ms`,
        zIndex,
        ["--iso-i" as string]: index,
      }}
    >
      <svg viewBox="0 0 320 172" className="las-iso__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tier.top} stopOpacity="0.55" />
            <stop offset="55%" stopColor={tier.mid} stopOpacity="0.38" />
            <stop offset="100%" stopColor={tier.side} stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={tier.mid} stopOpacity="0.5" />
            <stop offset="100%" stopColor={tier.side} stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={tier.side} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id={`circuit-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        <g className="las-iso__slab" opacity={active ? 0.95 : 0.82}>
          <polygon points={LEFT_FACE} fill={`url(#left-${uid})`} />
          <polygon points={RIGHT_FACE} fill={`url(#right-${uid})`} />
          <polygon
            points={TOP}
            fill={`url(#top-${uid})`}
            stroke={tier.edge}
            strokeWidth="1"
          />
          <polygon points={TOP_INNER} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
        </g>

        <path
          d={CIRCUIT}
          fill="none"
          stroke={`url(#circuit-${uid})`}
          strokeWidth="1"
          strokeDasharray="4 7"
          className="las-iso__circuit"
          opacity="0.45"
        />

        <text
          x="160"
          y="74"
          textAnchor="middle"
          className="las-iso__text"
          fill="rgba(255,255,255,0.92)"
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
