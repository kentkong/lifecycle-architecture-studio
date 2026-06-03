import { getPlatformLogoScale, getPlatformLogoSrc } from "@/lib/platform-logos";
import { cn } from "@/lib/utils";

type PlatformLogoProps = {
  platformId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
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
