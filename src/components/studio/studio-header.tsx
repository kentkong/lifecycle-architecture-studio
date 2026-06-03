"use client";

import { basePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export const studioLabelClass = "studio-micro-label";

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
          <div className={cn(studioEyebrowClass, "mb-2")}>
            Interactive architecture explorer
          </div>
          <div className="flex items-center gap-2.5">
            <StudioLogoMark />
            <h1 className="text-2xl font-medium tracking-[-0.03em] text-white md:text-[2rem]">
              Lifecycle Architecture Studio
            </h1>
          </div>
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
      <div className="studio-template-row flex flex-nowrap items-center gap-x-2 overflow-x-auto pb-0.5">
        {templates.map((template, index) => (
          <span key={template.id} className="flex shrink-0 items-center gap-x-2">
            {index > 0 ? <span className={cn(studioEyebrowClass, "opacity-40")}>·</span> : null}
            <button
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                studioEyebrowClass,
                "studio-template-link transition duration-300",
                activeTemplateId === template.id
                  ? "text-white"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              {template.name}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
