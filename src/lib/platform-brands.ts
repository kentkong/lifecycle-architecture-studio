import type { PlatformCategory } from "./types";

export type PlatformBrand = {
  accent: string;
  accentSoft: string;
  glow: string;
  logo: string;
  logoMark?: string;
  invert?: boolean;
  wordmark?: boolean;
};

const brands: Record<string, PlatformBrand> = {
  salesforce: {
    accent: "#00A1E0",
    accentSoft: "rgba(0, 161, 224, 0.12)",
    glow: "rgba(0, 161, 224, 0.45)",
    logo: "/logos/salesforce.svg",
  },
  snowflake: {
    accent: "#29B5E8",
    accentSoft: "rgba(41, 181, 232, 0.12)",
    glow: "rgba(41, 181, 232, 0.45)",
    logo: "/logos/snowflake.svg",
  },
  hightouch: {
    accent: "#1EC677",
    accentSoft: "rgba(30, 198, 119, 0.12)",
    glow: "rgba(30, 198, 119, 0.45)",
    logo: "/logos/hightouch-mark.svg",
    logoMark: "/logos/hightouch-icon.svg",
    wordmark: true,
  },
  braze: {
    accent: "#EE2D24",
    accentSoft: "rgba(238, 45, 36, 0.12)",
    glow: "rgba(238, 45, 36, 0.45)",
    logo: "/logos/braze.svg",
    logoMark: "/logos/braze-icon.svg",
    wordmark: true,
  },
  sfmc: {
    accent: "#FE9339",
    accentSoft: "rgba(254, 147, 57, 0.12)",
    glow: "rgba(254, 147, 57, 0.45)",
    logo: "/logos/sfmc.svg",
  },
  iterable: {
    accent: "#662D91",
    accentSoft: "rgba(102, 45, 145, 0.14)",
    glow: "rgba(102, 45, 145, 0.45)",
    logo: "/logos/iterable.svg",
  },
  segment: {
    accent: "#52BD95",
    accentSoft: "rgba(82, 189, 149, 0.12)",
    glow: "rgba(82, 189, 149, 0.45)",
    logo: "/logos/segment.svg",
  },
  mparticle: {
    accent: "#E85D4C",
    accentSoft: "rgba(232, 93, 76, 0.12)",
    glow: "rgba(232, 93, 76, 0.45)",
    logo: "/logos/mparticle.svg",
  },
  openai: {
    accent: "#FFFFFF",
    accentSoft: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(255, 255, 255, 0.3)",
    logo: "/logos/openai.svg",
    invert: true,
  },
  claude: {
    accent: "#D97757",
    accentSoft: "rgba(217, 119, 87, 0.12)",
    glow: "rgba(217, 119, 87, 0.45)",
    logo: "/logos/anthropic.svg",
  },
  "google-analytics": {
    accent: "#F9AB00",
    accentSoft: "rgba(249, 171, 0, 0.12)",
    glow: "rgba(249, 171, 0, 0.45)",
    logo: "/logos/google-analytics.svg",
  },
  mixpanel: {
    accent: "#7856FF",
    accentSoft: "rgba(120, 86, 255, 0.12)",
    glow: "rgba(120, 86, 255, 0.45)",
    logo: "/logos/mixpanel.svg",
  },
  customer: {
    accent: "#94A3B8",
    accentSoft: "rgba(148, 163, 184, 0.1)",
    glow: "rgba(148, 163, 184, 0.35)",
    logo: "/logos/customer.svg",
  },
};

export const categoryAccent: Record<PlatformCategory, string> = {
  crm: "#00A1E0",
  warehouse: "#29B5E8",
  "reverse-etl": "#1EC677",
  cdp: "#52BD95",
  engagement: "#662D91",
  "legacy-engagement": "#FE9339",
  ai: "#D97757",
  analytics: "#7856FF",
  customer: "#94A3B8",
};

export function getPlatformBrand(platformId: string): PlatformBrand {
  return (
    brands[platformId] ?? {
      accent: "#60A5FA",
      accentSoft: "rgba(96, 165, 250, 0.12)",
      glow: "rgba(96, 165, 250, 0.4)",
      logo: "/logos/customer.svg",
    }
  );
}
