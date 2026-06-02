"use client";

import { cn } from "@/lib/utils";

type IsometricDiamondProps = {
  label: string;
  active?: boolean;
  index: number;
  total: number;
  animationKey: string;
};

/** Top-face corners + extrusion depth (thick glass slab) */
const TOP = "160,18 272,72 160,126 48,72";
const TOP_INNER = "160,36 244,72 160,108 76,72";
const LEFT_FACE = "48,72 160,126 160,168 48,114";
const RIGHT_FACE = "160,126 272,72 272,114 160,168";
const CIRCUIT_TOP = "M48,72 L160,18 L272,72 L160,126 Z";
const CIRCUIT_LEFT = "M48,72 L48,114 L160,168";
const CIRCUIT_RIGHT = "M272,72 L272,114 L160,168 L160,126";

export function IsometricDiamond({
  label,
  active,
  index,
  total,
  animationKey,
}: IsometricDiamondProps) {
  const uid = `${animationKey}-${index}`;
  const zIndex = total - index;

  return (
    <div
      className={cn("las-iso", active && "las-iso--lit")}
      style={{
        animationDelay: `${index * 100}ms`,
        zIndex,
        ["--iso-i" as string]: index,
        ["--row-i" as string]: index,
      }}
    >
      <div className="las-iso__halo" aria-hidden="true" />

      <svg viewBox="0 0 320 188" className="las-iso__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id={`circuit-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
          </linearGradient>
          <filter id={`soft-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="las-iso__slab" opacity={active ? 0.92 : 0.78}>
          {/* Side faces — thick extrusion */}
          <polygon points={LEFT_FACE} fill={`url(#left-${uid})`} />
          <polygon points={RIGHT_FACE} fill={`url(#right-${uid})`} />

          {/* Top glass face */}
          <polygon
            points={TOP}
            fill={`url(#top-${uid})`}
            stroke="rgba(45,212,191,0.28)"
            strokeWidth="1"
          />
          <polygon
            points={TOP_INNER}
            fill="none"
            stroke="rgba(56,189,248,0.15)"
            strokeWidth="0.75"
          />

          {/* Bottom edge highlight */}
          <line
            x1="48"
            y1="114"
            x2="160"
            y2="168"
            stroke="rgba(52,211,153,0.2)"
            strokeWidth="0.75"
          />
          <line
            x1="160"
            y1="168"
            x2="272"
            y2="114"
            stroke="rgba(56,189,248,0.18)"
            strokeWidth="0.75"
          />
        </g>

        {/* Circuit traces */}
        <g className="las-iso__circuits" filter={`url(#soft-${uid})`}>
          <path
            d={CIRCUIT_TOP}
            fill="none"
            stroke={`url(#circuit-${uid})`}
            strokeWidth="1.25"
            strokeDasharray="5 9"
            className="las-iso__circuit las-iso__circuit--a"
          />
          <path
            d={CIRCUIT_LEFT}
            fill="none"
            stroke={`url(#circuit-${uid})`}
            strokeWidth="1"
            strokeDasharray="4 8"
            className="las-iso__circuit las-iso__circuit--b"
          />
          <path
            d={CIRCUIT_RIGHT}
            fill="none"
            stroke={`url(#circuit-${uid})`}
            strokeWidth="1"
            strokeDasharray="4 8"
            className="las-iso__circuit las-iso__circuit--c"
          />
          {/* Circuit nodes */}
          <circle cx="160" cy="18" r="2.5" fill="#2dd4bf" opacity="0.65" className="las-iso__node" />
          <circle cx="48" cy="72" r="2" fill="#38bdf8" opacity="0.5" className="las-iso__node" />
          <circle cx="272" cy="72" r="2" fill="#38bdf8" opacity="0.5" className="las-iso__node" />
          <circle cx="160" cy="168" r="2.5" fill="#34d399" opacity="0.55" className="las-iso__node" />
        </g>

        <text
          x="160"
          y="76"
          textAnchor="middle"
          className="las-iso__text"
          fill={active ? "rgba(186,230,253,0.92)" : "rgba(148,163,184,0.75)"}
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.14em"
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
