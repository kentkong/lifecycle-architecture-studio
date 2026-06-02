"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Brain,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Mail,
  MessageSquare,
  Share2,
  Sparkles,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/lib/types";

export const platformIconMap: Record<string, LucideIcon> = {
  salesforce: Users,
  snowflake: Database,
  hightouch: GitBranch,
  braze: MessageSquare,
  sfmc: Mail,
  iterable: Zap,
  segment: Share2,
  mparticle: Layers,
  openai: Sparkles,
  claude: Brain,
  "google-analytics": BarChart3,
  mixpanel: Activity,
  customer: UserCircle,
};

const categoryIconStyles: Record<
  PlatformCategory,
  { shell: string; icon: string; glow: string }
> = {
  crm: {
    shell: "platform-icon-marker--crm",
    icon: "text-[#5eead4]",
    glow: "shadow-[0_0_24px_rgba(45,212,191,0.28)]",
  },
  warehouse: {
    shell: "platform-icon-marker--warehouse",
    icon: "text-[#67e8f9]",
    glow: "shadow-[0_0_24px_rgba(0,229,255,0.28)]",
  },
  "reverse-etl": {
    shell: "platform-icon-marker--reverse-etl",
    icon: "text-[#c4b5fd]",
    glow: "shadow-[0_0_24px_rgba(124,58,237,0.28)]",
  },
  cdp: {
    shell: "platform-icon-marker--cdp",
    icon: "text-[#a5b4fc]",
    glow: "shadow-[0_0_24px_rgba(99,102,241,0.28)]",
  },
  engagement: {
    shell: "platform-icon-marker--engagement",
    icon: "text-[#f0abfc]",
    glow: "shadow-[0_0_24px_rgba(224,64,251,0.28)]",
  },
  "legacy-engagement": {
    shell: "platform-icon-marker--legacy",
    icon: "text-[#fcd34d]",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.22)]",
  },
  ai: {
    shell: "platform-icon-marker--ai",
    icon: "text-[#e9d5ff]",
    glow: "shadow-[0_0_28px_rgba(167,139,250,0.35)]",
  },
  analytics: {
    shell: "platform-icon-marker--analytics",
    icon: "text-[#86efac]",
    glow: "shadow-[0_0_24px_rgba(52,211,153,0.22)]",
  },
  customer: {
    shell: "platform-icon-marker--customer",
    icon: "text-white",
    glow: "shadow-[0_0_28px_rgba(255,255,255,0.18)]",
  },
};

type PlatformIconMarkerProps = {
  platformId: string;
  category: PlatformCategory;
  name: string;
  selected?: boolean;
  inline?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export function PlatformIconMarker({
  platformId,
  category,
  name,
  selected,
  inline,
  onClick,
  style,
}: PlatformIconMarkerProps) {
  const Icon = platformIconMap[platformId] ?? Cloud;
  const styles = categoryIconStyles[category];

  const content = (
    <>
      <span
        className={cn(
          "platform-icon-marker",
          styles.shell,
          selected && "platform-icon-marker--active",
          selected && styles.glow,
        )}
      >
        <Icon className={cn("h-6 w-6", styles.icon)} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="platform-node__label">{name}</span>
      <span className="platform-node__category">{category.replace("-", " ")}</span>
    </>
  );

  const className = cn(
    "platform-node group flex flex-col items-center gap-2.5 border-none bg-transparent p-0",
    inline ? "relative" : "absolute left-1/2 z-10 -translate-x-1/2",
    selected && "platform-node--selected",
  );

  if (!onClick) {
    return (
      <div style={style} className={className}>
        {content}
      </div>
    );
  }

  return (
    <button type="button" onClick={onClick} style={style} className={className}>
      {content}
    </button>
  );
}
