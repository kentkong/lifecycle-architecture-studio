"use client";

import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  return (
    <header className="relative z-10 px-0 py-4 md:py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-300/70">
            <Layers3 className="h-3 w-3" />
            Interactive architecture explorer
          </div>
          <h1 className="text-2xl font-medium tracking-[-0.03em] text-white md:text-[2rem]">
            Lifecycle Architecture Studio
          </h1>
          <p className="studio-hero__tagline mt-1.5 max-w-xl text-[13px] font-semibold leading-snug tracking-[-0.01em] md:text-sm">
            Explore modern AI-powered customer engagement ecosystems.
          </p>
        </div>
        <div className="hidden shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/45 md:block">
          ByteByteGo for Martech & AI Architecture
        </div>
      </div>
    </header>
  );
}

type TemplateBarProps = {
  templates: { id: string; name: string; description: string }[];
  activeTemplateId: string;
  onSelect: (templateId: string) => void;
};

export function TemplateBar({ templates, activeTemplateId, onSelect }: TemplateBarProps) {
  return (
    <div className="relative z-10 border-t border-white/5 px-0 py-3">
      <div className="studio-template-row flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-0.5">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "studio-template-pill shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium transition duration-300",
              activeTemplateId === template.id
                ? "studio-template-pill--active text-white"
                : "text-blue-200/75 hover:text-blue-100",
            )}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
