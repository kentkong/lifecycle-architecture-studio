import { getPlatformLogoScale, getPlatformLogoSrc } from "@/lib/platform-logos";
import { cn } from "@/lib/utils";

type PlatformLogoProps = {
  platformId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function PlatformLogo({ platformId, className, size = "md" }: PlatformLogoProps) {
  const src = getPlatformLogoSrc(platformId);
  if (!src) return null;

  const scale = getPlatformLogoScale(platformId);

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
