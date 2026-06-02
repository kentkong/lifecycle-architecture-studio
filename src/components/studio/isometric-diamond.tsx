"use client";

import { cn } from "@/lib/utils";

type IsometricDiamondProps = {
  label: string;
  active?: boolean;
  index: number;
  total: number;
  animationKey: string;
};

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
      className={cn("las-iso", active && "las-iso--active", active && "las-iso--lit")}
      style={{
        animationDelay: `${index * 120}ms`,
        zIndex,
        ["--iso-i" as string]: index,
      }}
    >
      <div className="las-iso__halo" aria-hidden="true" />
      <div className="las-iso__beam" aria-hidden="true" />

      <svg viewBox="0 0 320 148" className="las-iso__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.72" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id={`shine-${uid}`} cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={`aura-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.13
                      0 0 0 0 0.83
                      0 0 0 0 0.93
                      0 0 0 0.65 0"
            />
          </filter>
          <filter id={`glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="160"
          cy="74"
          rx="130"
          ry="48"
          fill={`url(#top-${uid})`}
          filter={`url(#aura-${uid})`}
          opacity={active ? 0.85 : 0.45}
        />

        <g filter={`url(#glow-${uid})`} className="las-iso__body">
          <polygon
            points="160,14 278,68 160,122 42,68"
            fill={`url(#top-${uid})`}
            stroke={active ? "#a5f3fc" : "rgba(165,243,252,0.55)"}
            strokeWidth="2"
          />
          <polygon
            points="160,14 278,68 160,122 42,68"
            fill={`url(#shine-${uid})`}
            stroke="none"
          />
          <polygon
            points="42,68 160,122 160,138 42,84"
            fill={`url(#left-${uid})`}
          />
          <polygon
            points="160,122 278,68 278,84 160,138"
            fill={`url(#right-${uid})`}
          />
          <polygon
            points="160,32 236,68 160,104 84,68"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="14"
            x2="160"
            y2="138"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.75"
          />
        </g>

        <text
          x="160"
          y="72"
          textAnchor="middle"
          className="las-iso__text"
          fill={active ? "#f0fdff" : "rgba(224,242,254,0.88)"}
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.12em"
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
