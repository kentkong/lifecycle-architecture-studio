"use client";

import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  return (
    <header className="relative z-20 border-b border-white/6 px-6 py-5 md:px-10">
      <div className="mx-auto flex max-w-[1400px] items-start justify-between gap-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-blue-300/70">
            <Layers3 className="h-3.5 w-3.5" />
            Interactive architecture explorer
          </div>
          <h1 className="text-3xl font-medium tracking-[-0.03em] text-white md:text-[2.35rem]">
            Lifecycle Architecture Studio
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55 md:text-[15px]">
            Explore modern AI-powered customer engagement ecosystems.
          </p>
        </div>
        <div className="hidden rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-xs text-white/45 md:block">
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
  onOpenLibrary: () => void;
};

export function TemplateBar({
  templates,
  activeTemplateId,
  onSelect,
  onOpenLibrary,
}: TemplateBarProps) {
  return (
    <div className="relative z-20 border-b border-white/6 px-6 py-4 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-left transition duration-300",
                activeTemplateId === template.id
                  ? "border-blue-400/35 bg-blue-500/12 text-white shadow-[0_0_24px_rgba(59,130,246,0.12)]"
                  : "border-white/8 bg-white/[0.02] text-white/55 hover:border-white/14 hover:text-white/80",
              )}
            >
              <span className="block text-sm font-medium">{template.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenLibrary}
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:border-blue-400/25 hover:text-white"
        >
          Add platform
        </button>
      </div>
    </div>
  );
}
