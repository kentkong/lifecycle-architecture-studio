"use client";

import { basePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export const studioLabelClass = "studio-micro-label";

export const studioTemplateLabelClass = "studio-template-label";

export const studioEyebrowClass = cn(studioLabelClass, "text-blue-300/70");

function StudioLogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${basePath}/studio-logo.svg`}
      alt=""
      aria-hidden
      className={cn("h-7 w-7 shrink-0", className)}
      draggable={false}
    />
  );
}

export function StudioHeader() {
  return (
    <header className="relative z-10 px-0 py-4 md:py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <StudioLogoMark />
            <h1 className="studio-title">Lifecycle Architecture Studio</h1>
          </div>
          <p className={cn(studioEyebrowClass, "mt-2")}>Interactive architecture explorer</p>
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
    <div className="relative z-10 mt-5 px-0 pb-3">
      <div className="studio-template-list" role="tablist" aria-label="Architecture templates">
        {templates.map((template) => {
          const isActive = activeTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              role="tab"
              onClick={() => onSelect(template.id)}
              aria-selected={isActive}
              className={cn(
                studioTemplateLabelClass,
                "studio-template-tag",
                isActive && "studio-template-tag--active",
              )}
            >
              {template.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type StudioFlowLabelProps = {
  label: string;
};

export function StudioFlowLabel({ label }: StudioFlowLabelProps) {
  return (
    <p className={cn(studioEyebrowClass, "relative z-10 px-0 pb-4 pt-1")}>{label}</p>
  );
}
