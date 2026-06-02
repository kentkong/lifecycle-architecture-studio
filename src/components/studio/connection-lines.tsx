"use client";

import { useEffect, useRef } from "react";
import type { StudioConnection } from "@/lib/types";

type ConnectionLinesProps = {
  connections: StudioConnection[];
  nodePositions: Record<string, { x: number; y: number }>;
  width: number;
  height: number;
  animationKey: string;
  horizontal?: boolean;
};

function AnimatedPath({
  d,
  delay,
  animationKey,
}: {
  d: string;
  delay: number;
  animationKey: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";

    requestAnimationFrame(() => {
      path.style.transition = `stroke-dashoffset 0.65s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
      path.style.strokeDashoffset = "0";
    });
  }, [d, delay, animationKey]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="url(#las-flow-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );
}

export function ConnectionLines({
  connections,
  nodePositions,
  width,
  height,
  animationKey,
  horizontal = true,
}: ConnectionLinesProps) {
  return (
    <svg
      className="las-canvas__svg pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="las-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.25)" />
          <stop offset="50%" stopColor="rgba(96,165,250,0.85)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0.25)" />
        </linearGradient>
        <marker
          id="las-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="rgba(96,165,250,0.7)" />
        </marker>
      </defs>

      {connections.map((connection, index) => {
        const from = nodePositions[connection.from];
        const to = nodePositions[connection.to];
        if (!from || !to) return null;

        let d: string;
        if (horizontal) {
          const startX = from.x + 52;
          const endX = to.x - 52;
          const y = from.y;
          const midX = (startX + endX) / 2;
          d = `M ${startX} ${y} C ${midX} ${y}, ${midX} ${y}, ${endX} ${y}`;
        } else {
          const startY = from.y + 52;
          const endY = to.y - 52;
          const x = from.x;
          const midY = (startY + endY) / 2;
          d = `M ${x} ${startY} C ${x} ${midY}, ${x} ${midY}, ${x} ${endY}`;
        }

        return (
          <g key={`${connection.from}-${connection.to}-${animationKey}`}>
            <path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />
            <AnimatedPath d={d} delay={index * 120} animationKey={animationKey} />
            {horizontal ? (
              <circle cx={to.x - 56} cy={to.y} r="2" fill="rgba(96,165,250,0.5)" />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
