"use client";

import { PlatformLogo } from "@/components/studio/platform-logo";
import { getPlatformBrand } from "@/lib/platform-brands";
import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/lib/types";

const categoryLabels: Record<PlatformCategory, string> = {
  crm: "CRM",
  warehouse: "Warehouse",
  "reverse-etl": "Reverse ETL",
  cdp: "CDP",
  engagement: "Engagement",
  "legacy-engagement": "Legacy ESP",
  ai: "AI",
  analytics: "Analytics",
  customer: "Outcome",
};

type PlatformNodeProps = {
  platformId: string;
  name: string;
  category: PlatformCategory;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
};

export function PlatformNode({
  platformId,
  name,
  category,
  selected,
  onClick,
  index = 0,
}: PlatformNodeProps) {
  const brand = getPlatformBrand(platformId);

  const content = (
    <>
      <PlatformLogo platformId={platformId} size="md" active={selected} variant="mark" />
      <span className="las-node__name">{name}</span>
      <span
        className="las-node__category"
        style={{ color: selected ? brand.accent : undefined }}
      >
        {categoryLabels[category]}
      </span>
    </>
  );

  const className = cn(
    "las-node",
    selected && "las-node--selected",
    `las-node--delay-${Math.min(index, 5)}`,
  );

  if (!onClick) {
    return (
      <div className={className} style={{ "--node-accent": brand.accent, "--node-glow": brand.glow } as React.CSSProperties}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{ "--node-accent": brand.accent, "--node-glow": brand.glow } as React.CSSProperties}
    >
      {content}
    </button>
  );
}
