"use client";

import { useCallback, useEffect, useState } from "react";

export type AppConnectorSpec = {
  id: string;
  layerIndex: number;
  tone: "blue" | "green";
  selected: boolean;
};

type ConnectorLine = {
  id: string;
  tone: "blue" | "green";
  selected: boolean;
  path: string;
  length: number;
};

type BlueprintConnectorsProps = {
  apps: AppConnectorSpec[];
  containerRef: React.RefObject<HTMLElement | null>;
  animationKey: string;
};

const TONE_COLORS = {
  blue: {
    stroke: "rgba(100, 160, 210, 0.28)",
    strokeSelected: "rgba(125, 190, 235, 0.55)",
  },
  green: {
    stroke: "rgba(90, 180, 165, 0.26)",
    strokeSelected: "rgba(110, 205, 185, 0.52)",
  },
};

function buildPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const bend = Math.min(Math.abs(dx) * 0.38, 56);
  const c1x = x1 + bend;
  const c1y = y1;
  const c2x = x2 - bend;
  const c2y = y2;
  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

export function BlueprintConnectors({
  apps,
  containerRef,
  animationKey,
}: BlueprintConnectorsProps) {
  const [lines, setLines] = useState<ConnectorLine[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const next: ConnectorLine[] = [];

    for (const app of apps) {
      const appEl = container.querySelector<HTMLElement>(`[data-connect-app="${app.id}"]`);
      const diamond = container.querySelector<HTMLElement>(
        `[data-connect-diamond="${app.layerIndex}"] .las-iso__svg`,
      );
      if (!appEl || !diamond) continue;

      const appRect = appEl.getBoundingClientRect();
      const diamondRect = diamond.getBoundingClientRect();

      const x1 = appRect.right - containerRect.left + 2;
      const y1 = appRect.top + appRect.height / 2 - containerRect.top;
      const x2 = diamondRect.left - containerRect.left - 4;
      const y2 = diamondRect.top + diamondRect.height / 2 - containerRect.top;

      const path = buildPath(x1, y1, x2, y2);
      const length = Math.hypot(x2 - x1, y2 - y1) * 1.12;

      next.push({
        id: app.id,
        tone: app.tone,
        selected: app.selected,
        path,
        length,
      });
    }

    setSize({ width: containerRect.width, height: containerRect.height });
    setLines(next);
  }, [apps, containerRef]);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);

    window.addEventListener("resize", measure);
    const timer = window.setTimeout(measure, 600);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, [measure, animationKey, containerRef]);

  if (size.width === 0 || lines.length === 0) return null;

  return (
    <svg
      className="las-blueprint__connectors"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      aria-hidden="true"
    >
      {lines.map(({ id, tone, selected, path, length }, index) => {
        const colors = TONE_COLORS[tone];
        const stroke = selected ? colors.strokeSelected : colors.stroke;
        const delay = index * 50 + 180;

        return (
          <path
            key={`${animationKey}-${id}`}
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth={selected ? 1 : 0.75}
            strokeLinecap="round"
            strokeDasharray={`${length} ${length}`}
            className="las-connector__line"
            style={{
              ["--conn-length" as string]: length,
              animationDelay: `${delay}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}
