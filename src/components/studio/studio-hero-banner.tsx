"use client";

import type { ReactNode } from "react";
import { basePath } from "@/lib/base-path";

type StudioHeroBannerProps = {
  children: ReactNode;
};

export function StudioHeroBanner({ children }: StudioHeroBannerProps) {
  return (
    <section className="studio-hero relative z-20 border-b border-white/[0.07] px-6 md:px-10">
      <div className="studio-hero__inner relative mx-auto max-w-[980px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/textures/slate-stone-1920.jpg`}
          alt=""
          aria-hidden
          className="studio-hero__texture pointer-events-none absolute inset-0 h-full w-full object-cover object-[18%_top]"
          draggable={false}
        />
        <div className="studio-hero__scrim pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
