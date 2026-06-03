"use client";

import type { ReactNode } from "react";
import { basePath } from "@/lib/base-path";

type StudioArchitecturePanelProps = {
  children: ReactNode;
};

export function StudioArchitecturePanel({ children }: StudioArchitecturePanelProps) {
  return (
    <section className="studio-architecture-panel relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/textures/slate-stone-1920.jpg`}
        alt=""
        aria-hidden
        className="studio-architecture-panel__texture pointer-events-none absolute inset-0 h-full w-full object-cover object-[18%_top]"
        draggable={false}
      />
      <div className="studio-architecture-panel__scrim pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
