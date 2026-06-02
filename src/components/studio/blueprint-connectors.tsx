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

function strokeForLayer(layerIndex: number, selected: boolean): string {
  const { top } = getStackLayerColors(layerIndex);
  return selected ? top : `${top}55`;
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
      const row = container.querySelector<HTMLElement>(`[data-connect-app="${app.id}"]`);
      const logo = row?.querySelector<HTMLElement>(".las-platform-row__logo");
      const tier = container.querySelector<HTMLElement>(`[data-connect-diamond="${app.layerIndex}"]`);
      if (!logo || !tier) continue;

      const logoRect = logo.getBoundingClientRect();
      const tierRect = tier.getBoundingClientRect();

      const x1 = logoRect.right - containerRect.left + 1;
      const y1 = logoRect.top + logoRect.height / 2 - containerRect.top;
      const x2 = tierRect.left - containerRect.left - 2;
      const y2 = y1;

      const path = `M ${x1} ${y1} L ${x2} ${y2}`;
      const length = x2 - x1;

      if (length <= 0) continue;

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
        const delay = index * 40 + 160;

        return (
          <path
            key={`${animationKey}-${id}`}
            d={path}
            fill="none"
            stroke={strokeForLayer(layerIndex, selected)}
            strokeWidth={selected ? 1.25 : 0.85}
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
