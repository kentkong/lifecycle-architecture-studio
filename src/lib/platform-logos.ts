import { basePath } from "./base-path";

/** Logo assets keyed by platform id — used inside stack layers per active configuration. */
export const platformLogos: Record<string, string> = {
  salesforce: "/logos/salesforce.svg",
  snowflake: "/logos/snowflake.svg",
  hightouch: "/logos/hightouch-icon.svg",
  braze: "/logos/braze-icon.svg",
  sfmc: "/logos/sfmc.svg",
  iterable: "/logos/iterable.svg",
  segment: "/logos/segment.svg",
  mparticle: "/logos/mparticle.svg",
  openai: "/logos/openai.svg",
  claude: "/logos/anthropic.svg",
  mixpanel: "/logos/mixpanel.svg",
  customer: "/logos/customer.svg",
};

export function getPlatformLogoSrc(platformId: string): string | undefined {
  const path = platformLogos[platformId];
  return path ? `${basePath}${path}` : undefined;
}

/** Suggested logo scale per platform (some marks read better smaller). */
export const platformLogoScale: Partial<Record<string, number>> = {
  salesforce: 0.88,
  snowflake: 0.82,
  hightouch: 0.78,
  braze: 0.8,
  sfmc: 0.85,
  openai: 0.72,
  segment: 0.8,
  mixpanel: 0.78,
};

export function getPlatformLogoScale(platformId: string): number {
  return platformLogoScale[platformId] ?? 0.8;
}
