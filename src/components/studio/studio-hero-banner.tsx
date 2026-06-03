"use client";

import type { ReactNode } from "react";

type StudioHeroBannerProps = {
  children: ReactNode;
};

export function StudioHeroBanner({ children }: StudioHeroBannerProps) {
  return (
    <section className="studio-hero relative z-20 overflow-hidden border-b border-white/[0.07] px-6 md:px-10">
      <div className="studio-hero__backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div className="studio-hero__inner relative mx-auto max-w-[980px]">{children}</div>
    </section>
  );
}
