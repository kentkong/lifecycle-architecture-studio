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
      <span className="las-iso__connect" aria-hidden="true" />

      <svg viewBox="0 0 500 80" preserveAspectRatio="xMidYMid meet" className="las-iso__svg" aria-hidden="true">
        <g className="las-iso__slab" opacity={opacity}>
          <path d="M 398 54 L 442 16 L 452 20 L 408 58 Z" fill={colors.side} />
          <path d="M 36 54 L 398 54 L 388 68 L 26 68 Z" fill={colors.front} />
          <path
            d="M 52 12 L 432 12 Q 444 12 448 18 L 412 52 Q 408 56 398 56 L 44 56 Q 36 56 32 50 L 48 18 Q 52 12 58 12 Z"
            fill={colors.top}
          />
        </g>

        <text
          x="88"
          y="42"
          className="las-iso__text"
          fill={active ? colors.label : "rgba(255,255,255,0.5)"}
          fontSize="13"
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
