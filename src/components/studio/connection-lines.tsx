"use client";

import type { StudioConnection } from "@/lib/types";

type ConnectionLinesProps = {
  connections: StudioConnection[];
  nodePositions: Record<string, { x: number; y: number }>;
  width: number;
  height: number;
};

export function ConnectionLines({
  connections,
  nodePositions,
  width,
  height,
}: ConnectionLinesProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.05)" />
          <stop offset="50%" stopColor="rgba(96,165,250,0.55)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0.05)" />
        </linearGradient>
      </defs>
      {connections.map((connection) => {
        const from = nodePositions[connection.from];
        const to = nodePositions[connection.to];
        if (!from || !to) return null;

        const startX = from.x;
        const startY = from.y + 36;
        const endX = to.x;
        const endY = to.y - 36;
        const midY = (startY + endY) / 2;

        return (
          <g key={`${connection.from}-${connection.to}`}>
            <path
              d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
              fill="none"
              stroke="rgba(96,165,250,0.12)"
              strokeWidth="3"
            />
            <path
              d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
              fill="none"
              stroke="url(#flow-gradient)"
              strokeWidth="2"
              strokeDasharray="6 10"
              className="connection-flow"
            />
          </g>
        );
      })}
    </svg>
  );
}
