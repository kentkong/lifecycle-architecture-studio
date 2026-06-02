"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudioHeader() {
  return (
    <header className="studio-header-band studio-header-band--compact relative z-20 shrink-0">
      <div className="studio-stage">
        <div className="studio-stage__grid py-2">
          <div className="studio-stage__apps las-apps-col">
            <h1 className="studio-hero-title studio-hero-title--compact las-apps-col__text">
              Lifecycle <span className="studio-hero-gradient">Architecture</span> Stack
            </h1>
            <span className="las-apps-col__logo-slot" aria-hidden="true" />
          </div>
          <div className="studio-badge studio-stage__stack hidden sm:inline-flex justify-self-end">
            Interactive Blueprint
          </div>
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
    <div className="relative z-20 shrink-0 border-b border-[rgba(255,255,255,0.05)]">
      <div className="studio-stage">
        <div className="studio-stage__grid py-1.5">
          <div className="studio-stage__apps las-apps-col">
            <div className="las-apps-col__text flex flex-wrap gap-1.5">
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
            <span className="las-apps-col__logo-slot" aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={onOpenLibrary}
            className="studio-btn-pill studio-btn-pill--compact studio-stage__stack justify-self-end"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
