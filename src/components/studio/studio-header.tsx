"use client";

import { Plus } from "lucide-react";
import { StudioEyebrow } from "@/components/ui/studio-eyebrow";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  return (
    <header className="studio-header-band relative z-20 px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] items-start justify-between gap-6 py-6">
        <div>
          <StudioEyebrow text="Understanding the components of" />
          <h1 className="studio-hero-title">
            Lifecycle <span className="studio-hero-gradient">Architecture</span> Stack
          </h1>
          <p className="studio-hero-lead mt-2 max-w-2xl">
            Explore how CRM, data, activation, engagement, and AI platforms connect in modern
            customer lifecycle ecosystems.
          </p>
        </div>
        <div className="studio-badge hidden md:inline-flex">Interactive Blueprint</div>
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
    <div className="relative z-20 border-b border-[rgba(255,255,255,0.06)] px-6 py-4 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                "studio-example-pill",
                activeTemplateId === template.id && "studio-example-pill--active",
              )}
            >
              {template.name}
            </button>
          ))}
        </div>
        <button type="button" onClick={onOpenLibrary} className="studio-btn-pill">
          <Plus className="h-4 w-4" />
          Add platform
        </button>
      </div>
    </div>
  );
}
