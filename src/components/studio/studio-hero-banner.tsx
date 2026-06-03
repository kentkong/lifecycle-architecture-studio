"use client";

import type { CSSProperties, ReactNode } from "react";
import { basePath } from "@/lib/base-path";

type StudioHeroBannerProps = {
  children: ReactNode;
};

export function StudioHeroBanner({ children }: StudioHeroBannerProps) {
  const texture = `${basePath}/textures/slate-stone-1920.jpg`;

  const heroStyle: CSSProperties = {
    backgroundColor: "#151a1f",
    backgroundImage: `linear-gradient(180deg, rgba(14, 17, 20, 0.35) 0%, rgba(14, 17, 20, 0.92) 100%), radial-gradient(ellipse 80% 60% at 70% 10%, rgba(59, 130, 246, 0.05), transparent 55%), url("${texture}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover, cover, cover",
    backgroundPosition: "18% top, center top, 18% top",
  };

  return (
    <section
      className="studio-hero relative z-20 overflow-hidden border-b border-white/[0.07]"
      style={heroStyle}
    >
      <div className="relative">{children}</div>
    </section>
  );
}
