import { categoryColors } from "@/lib/category-colors";
import { getPlatformLogoScale, getPlatformLogoSrc } from "@/lib/platform-logos";
import type { PlatformCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type PlatformLogoProps = {
  platformId: string;
  category?: PlatformCategory;
  variant?: "brand" | "tinted";
  className?: string;
  size?: "sm" | "md" | "lg" | "layer";
};

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  layer: "h-full w-full",
};

export function PlatformLogo({
  platformId,
  category,
  variant = "brand",
  className,
  size = "md",
}: PlatformLogoProps) {
  const src = getPlatformLogoSrc(platformId);
  if (!src) return null;

  const scale = getPlatformLogoScale(platformId);

  if (variant === "tinted" && category) {
    const palette = categoryColors[category];

    return (
      <span
        aria-hidden
        className={cn("platform-logo-tinted block", sizeClasses[size], className)}
        style={{
          backgroundColor: palette.fill,
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
          filter: `drop-shadow(0 0 8px ${palette.glow})`,
          transform: size === "layer" ? `scale(${scale})` : undefined,
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      className={cn("object-contain", sizeClasses[size], className)}
      style={{ transform: `scale(${scale})` }}
    />
  );
}
