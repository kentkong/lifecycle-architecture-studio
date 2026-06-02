"use client";

import { PlatformLogo } from "@/components/studio/platform-logo";
import { getPlatformBrand } from "@/lib/platform-brands";
import { cn } from "@/lib/utils";

type PlatformLayerCardProps = {
  platformId: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
};

export function PlatformLayerCard({
  platformId,
  name,
  selected,
  onClick,
  index = 0,
}: PlatformLayerCardProps) {
  const brand = getPlatformBrand(platformId);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "las-platform-card",
        selected && "las-platform-card--selected",
        `las-platform-card--delay-${Math.min(index, 5)}`,
      )}
      style={
        {
          "--card-accent": brand.accent,
          animationDelay: `${index * 60 + 200}ms`,
        } as React.CSSProperties
      }
    >
      <PlatformLogo platformId={platformId} size="sm" active={selected} tone="blueprint" />
      <span className="las-platform-card__info">
        <span className="las-platform-card__name">{name}</span>
      </span>
    </button>
  );
}
