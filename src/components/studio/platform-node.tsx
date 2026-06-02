"use client";

import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/lib/types";

const categoryStyles: Record<PlatformCategory, string> = {
  crm: "border-blue-400/35 bg-blue-500/10 text-blue-100",
  warehouse: "border-sky-400/35 bg-sky-500/10 text-sky-100",
  "reverse-etl": "border-cyan-400/35 bg-cyan-500/10 text-cyan-100",
  cdp: "border-indigo-400/35 bg-indigo-500/10 text-indigo-100",
  engagement: "border-violet-400/35 bg-violet-500/10 text-violet-100",
  "legacy-engagement": "border-amber-400/35 bg-amber-500/10 text-amber-100",
  ai: "border-purple-400/35 bg-purple-500/10 text-purple-100",
  analytics: "border-emerald-400/35 bg-emerald-500/10 text-emerald-100",
  customer: "border-white/25 bg-white/8 text-white",
};

type PlatformNodeProps = {
  name: string;
  category: PlatformCategory;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export function PlatformNode({ name, category, selected, onClick, style }: PlatformNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={cn(
        "group absolute left-1/2 z-10 w-[min(280px,72vw)] -translate-x-1/2 rounded-2xl border px-5 py-4 text-left backdrop-blur-md transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]",
        categoryStyles[category],
        selected && "ring-2 ring-blue-400/60 shadow-[0_0_48px_rgba(59,130,246,0.18)]",
      )}
    >
      <span className="block text-[11px] uppercase tracking-[0.18em] text-white/45">
        {category.replace("-", " ")}
      </span>
      <span className="mt-1 block text-lg font-medium tracking-tight">{name}</span>
    </button>
  );
}
