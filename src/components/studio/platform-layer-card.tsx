"use client";

import { PlatformLogo } from "@/components/studio/platform-logo";
import { getPlatformBrand } from "@/lib/platform-brands";
import { cn } from "@/lib/utils";

type PlatformLayerCardProps = {
  nodeId: string;
  platformId: string;
  name: string;
  layerLabel: string;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
};

export function PlatformLayerCard({
  nodeId,
  platformId,
  name,
  layerLabel,
  selected,
  onClick,
  index = 0,
}: PlatformLayerCardProps) {
  const brand = getPlatformBrand(platformId);

  return (
    <button
      type="button"
      onClick={onClick}
      data-connect-app={nodeId}
      className={cn(
        "las-platform-row",
        selected && "las-platform-row--selected",
        `las-platform-row--delay-${Math.min(index, 5)}`,
      )}
      style={
        {
          "--row-accent": brand.accent,
          animationDelay: `${index * 50 + 180}ms`,
        } as React.CSSProperties
      }
    >
      <PlatformLogo platformId={platformId} size="md" active={selected} tone="blueprint" />
      <span className="las-platform-row__text">
        <span className="las-platform-row__name">{name}</span>
        <span className="las-platform-row__layer">{layerLabel}</span>
      </span>
    </button>
  );
}
