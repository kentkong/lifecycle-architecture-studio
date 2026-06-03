import { categoryColors, type CategoryPalette } from "./category-colors";
import type { PlatformCategory } from "./types";

export type PlatformPalette = CategoryPalette;

/** Brand-adjacent hues — one unique color per platform for shapes and connector lines. */
const platformFills: Record<string, string> = {
  salesforce: "#00A1E0",
  snowflake: "#29B5E8",
  hightouch: "#0D9488",
  braze: "#EE2D24",
  sfmc: "#E8883A",
  iterable: "#6D5AE6",
  segment: "#43AF79",
  mparticle: "#7C3AED",
  openai: "#10A37F",
  claude: "#D97757",
  mixpanel: "#7856FF",
  customer: "#CBD5E1",
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function edgeColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * 0.45);
  return `rgba(${mix(r)}, ${mix(g)}, ${mix(b)}, 0.72)`;
}

export function buildPlatformPalette(fill: string): PlatformPalette {
  return {
    fill,
    fillSoft: rgba(fill, 0.38),
    edge: edgeColor(fill),
    glow: rgba(fill, 0.32),
    line: fill,
  };
}

const platformPalettes = Object.fromEntries(
  Object.entries(platformFills).map(([id, fill]) => [id, buildPlatformPalette(fill)]),
) as Record<string, PlatformPalette>;

export function getPlatformColors(platformId: string, category?: PlatformCategory): PlatformPalette {
  if (platformPalettes[platformId]) return platformPalettes[platformId];
  if (category) return categoryColors[category];
  return categoryColors.crm;
}
