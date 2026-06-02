"use client";

import { basePath } from "@/lib/base-path";
import { getPlatformBrand } from "@/lib/platform-brands";
import { cn } from "@/lib/utils";

type PlatformLogoProps = {
  platformId: string;
  size?: "sm" | "md" | "lg" | "xl";
  active?: boolean;
  variant?: "mark" | "wordmark";
  tone?: "brand" | "blueprint";
  className?: string;
};

const sizeMap = {
  sm: { box: "h-8 w-8", img: "h-5 w-5", word: "h-5 max-w-[72px]" },
  md: { box: "h-12 w-12", img: "h-7 w-7", word: "h-6 max-w-[88px]" },
  lg: { box: "h-16 w-16", img: "h-9 w-9", word: "h-8 max-w-[120px]" },
  xl: { box: "h-24 w-24", img: "h-14 w-14", word: "h-10 max-w-[160px]" },
};

export function PlatformLogo({
  platformId,
  size = "md",
  active = false,
  variant = "mark",
  tone = "brand",
  className,
}: PlatformLogoProps) {
  const brand = getPlatformBrand(platformId);
  const sizes = sizeMap[size];
  const src = basePath + (variant === "mark" && brand.logoMark ? brand.logoMark : brand.logo);
  const isWordmark = variant === "wordmark";

  return (
    <span
      className={cn(
        "las-logo",
        active && "las-logo--active",
        tone === "blueprint" && "las-logo--blueprint",
        className,
      )}
      style={
        {
          "--logo-accent": brand.accent,
          "--logo-glow": brand.glow,
          "--logo-soft": brand.accentSoft,
        } as React.CSSProperties
      }
    >
      <span
        className={cn(
          "las-logo__frame",
          sizes.box,
          isWordmark && variant === "wordmark" && "las-logo__frame--wide",
          tone === "blueprint" && "las-logo__frame--blueprint",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className={cn(
            "las-logo__img object-contain",
            isWordmark ? sizes.word : sizes.img,
            brand.invert && "las-logo__img--invert",
          )}
          draggable={false}
        />
      </span>
    </span>
  );
}
