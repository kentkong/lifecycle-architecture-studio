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
          "--card-glow": brand.glow,
          animationDelay: `${index * 70 + 360}ms`,
        } as React.CSSProperties
      }
    >
      <span className="las-platform-card__sheen" aria-hidden="true" />
      <span className="las-platform-card__logo-wrap">
        <PlatformLogo platformId={platformId} size="sm" active={selected} tone="blueprint" />
      </span>
      <span className="las-platform-card__name">{name}</span>
    </button>
  );
}
