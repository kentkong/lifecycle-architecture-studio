"use client";

import { cn } from "@/lib/utils";
import { getStackLayerColors } from "@/lib/stack-colors";

type IsometricDiamondProps = {
  label: string;
  active?: boolean;
  index: number;
  total: number;
  animationKey: string;
  stacked?: boolean;
};

/** Rounded isometric slab — Binmile-style flat blue stack. */
export function IsometricDiamond({
  label,
  active,
  index,
  total,
  stacked = false,
}: IsometricDiamondProps) {
  const colors = getStackLayerColors(index);
  const zIndex = total - index;
  const opacity = active ? 1 : 0.58;

  return (
    <div
      className={cn("las-iso", stacked && "las-iso--stacked", active && "las-iso--lit")}
      style={{
        animationDelay: `${index * 70}ms`,
        zIndex,
        ["--iso-i" as string]: index,
      }}
    >
      <svg viewBox="0 0 340 72" className="las-iso__svg" aria-hidden="true">
        <g className="las-iso__slab" opacity={opacity}>
          {/* Right side */}
          <path d="M 278 48 L 308 18 L 316 22 L 286 52 Z" fill={colors.side} />
          {/* Front lip */}
          <path d="M 28 48 L 278 48 L 270 60 L 20 60 Z" fill={colors.front} />
          {/* Top — rounded isometric plate */}
          <path
            d="M 44 12 L 304 12 Q 314 12 318 18 L 288 48 Q 284 52 278 52 L 34 52 Q 28 52 24 46 L 40 18 Q 44 12 50 12 Z"
            fill={colors.top}
          />
        </g>

        <text
          x="64"
          y="38"
          className="las-iso__text"
          fill={active ? colors.label : "rgba(255,255,255,0.5)"}
          fontSize="11"
          fontWeight="500"
          letterSpacing="0.01em"
          transform="skewX(-16)"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
