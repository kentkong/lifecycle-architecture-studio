"use client";

import { ChevronRight } from "lucide-react";
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
        {templates.map((template, index) => {
          const isActive = activeTemplateId === template.id;

          return (
            <span key={template.id} className="flex shrink-0 items-center gap-x-2">
              {index > 0 ? (
                <ChevronRight
                  className="studio-template-separator h-2.5 w-2.5 shrink-0"
                  aria-hidden
                />
              ) : null}
              <button
                type="button"
                onClick={() => onSelect(template.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  studioLabelClass,
                  "studio-template-link transition duration-300",
                  isActive
                    ? "studio-template-link--active text-blue-300"
                    : "text-blue-300/45 hover:text-blue-300/70",
                )}
              >
                {template.name}
              </button>
            </span>
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
