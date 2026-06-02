"use client";

import { cn } from "@/lib/utils";

type IsometricDiamondProps = {
  label: string;
  active?: boolean;
  index: number;
  animationKey: string;
};

export function IsometricDiamond({ label, active, index, animationKey }: IsometricDiamondProps) {
  const uid = `${animationKey}-${index}`;

  return (
    <div
      className={cn("las-iso", active && "las-iso--active")}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <svg
        viewBox="0 0 240 108"
        className="las-iso__svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
          </linearGradient>
          <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={active ? `url(#glow-${uid})` : undefined}>
          <polygon
            points="120,12 208,52 120,92 32,52"
            fill={`url(#top-${uid})`}
            stroke={active ? "#67e8f9" : "rgba(103,232,249,0.45)"}
            strokeWidth="1.5"
          />
          <polygon
            points="32,52 120,92 120,102 32,62"
            fill={`url(#left-${uid})`}
          />
          <polygon
            points="120,92 208,52 208,62 120,102"
            fill={`url(#right-${uid})`}
          />
          <polygon
            points="120,22 188,52 120,82 52,52"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.75"
          />
        </g>

        <text
          x="120"
          y="56"
          textAnchor="middle"
          className="las-iso__text"
          fill={active ? "#e0f2fe" : "rgba(226,232,240,0.75)"}
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
