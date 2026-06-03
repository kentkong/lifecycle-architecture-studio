"use client";

import type { CSSProperties, ReactNode } from "react";
import { basePath } from "@/lib/base-path";

type StudioHeroBannerProps = {
  children: ReactNode;
};

export function StudioHeroBanner({ children }: StudioHeroBannerProps) {
  const heroStyle: CSSProperties = {
    backgroundImage: `linear-gradient(180deg, rgba(8, 10, 13, 0.28) 0%, rgba(8, 10, 13, 0.62) 55%, rgba(8, 10, 13, 0.82) 100%), url("${basePath}/hero-banner-bg.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center 22%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className="studio-hero relative z-20 min-h-[200px] overflow-hidden border-b border-white/6"
      style={heroStyle}
    >
      <div className="relative">{children}</div>
    </section>
  );
}
