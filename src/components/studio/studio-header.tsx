"use client";

import { Layers3 } from "lucide-react";
import { basePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export const studioLabelClass =
  "text-[10px] font-normal uppercase tracking-[0.2em] leading-[1.5]";

export const studioEyebrowClass = cn(studioLabelClass, "text-blue-300/70");

export const studioEyebrowWhiteClass = cn(studioLabelClass, "text-white");

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
          <div className={cn(studioEyebrowClass, "mb-2 flex items-center gap-2")}>
            <Layers3 className="h-3 w-3 shrink-0" />
            Interactive architecture explorer
          </div>
          <div className="flex items-center gap-2.5">
            <StudioLogoMark />
            <h1 className="text-2xl font-medium tracking-[-0.03em] text-white md:text-[2rem]">
              Lifecycle Architecture Studio
            </h1>
          </div>
          <p className={cn(studioEyebrowWhiteClass, "mt-2 max-w-xl")}>
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
      <div className="studio-template-row flex flex-nowrap items-center gap-1 overflow-x-auto pb-0.5">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "studio-template-pill shrink-0 rounded-full border px-2 py-0.5 transition duration-300",
              studioLabelClass,
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

type StudioFlowLabelProps = {
  label: string;
};

export function StudioFlowLabel({ label }: StudioFlowLabelProps) {
  return (
    <p className={cn(studioEyebrowClass, "relative z-10 px-0 pb-4 pt-1")}>{label}</p>
  );
}
