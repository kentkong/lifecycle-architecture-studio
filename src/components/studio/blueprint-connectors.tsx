"use client";

import { useCallback, useEffect, useState } from "react";
import { getStackLayerColors } from "@/lib/stack-colors";

export type AppConnectorSpec = {
  id: string;
  layerIndex: number;
  selected: boolean;
};

type ConnectorLine = {
  id: string;
  layerIndex: number;
  selected: boolean;
  path: string;
  length: number;
};

type BlueprintConnectorsProps = {
  apps: AppConnectorSpec[];
  containerRef: React.RefObject<HTMLElement | null>;
  animationKey: string;
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

function strokeForLayer(layerIndex: number, selected: boolean): string {
  const { top } = getStackLayerColors(layerIndex);
  return selected ? top : `${top}44`;
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
      const slab = container.querySelector<HTMLElement>(
        `[data-connect-diamond="${app.layerIndex}"] .las-iso__svg`,
      );
      if (!appEl || !slab) continue;

      const appRect = appEl.getBoundingClientRect();
      const slabRect = slab.getBoundingClientRect();

      const x1 = appRect.right - containerRect.left + 2;
      const y1 = appRect.top + appRect.height / 2 - containerRect.top;
      const x2 = slabRect.left - containerRect.left - 4;
      const y2 = slabRect.top + slabRect.height / 2 - containerRect.top;

      const path = buildPath(x1, y1, x2, y2);
      const length = Math.hypot(x2 - x1, y2 - y1) * 1.12;

      next.push({
        id: app.id,
        layerIndex: app.layerIndex,
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
      {lines.map(({ id, layerIndex, selected, path, length }, index) => {
        const delay = index * 50 + 180;

        return (
          <path
            key={`${animationKey}-${id}`}
            d={path}
            fill="none"
            stroke={strokeForLayer(layerIndex, selected)}
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
