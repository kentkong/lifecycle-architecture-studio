"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  return (
    <header className="studio-header-band studio-header-band--compact relative z-20 shrink-0 px-5 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 py-2">
        <h1 className="studio-hero-title studio-hero-title--compact">
          Lifecycle <span className="studio-hero-gradient">Architecture</span> Stack
        </h1>
        <div className="studio-badge hidden sm:inline-flex">Interactive Blueprint</div>
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
    <div className="relative z-20 shrink-0 border-b border-[rgba(255,255,255,0.05)] px-5 py-1.5 md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                "studio-example-pill studio-example-pill--compact",
                activeTemplateId === template.id && "studio-example-pill--active",
              )}
            >
              {template.name}
            </button>
          ))}
        </div>
        <button type="button" onClick={onOpenLibrary} className="studio-btn-pill studio-btn-pill--compact">
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}
