import type { MetadataRoute } from "next";

const BASE_URL = "https://miwim.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/docs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const whitepaperPages = [
    "introduction", "problem", "solution", "architecture", "tokenomics", "roadmap", "team",
  ].map((slug) => ({
    url: `${BASE_URL}/docs/whitepaper/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const technicalPages = [
    "architecture-overview", "node-roles", "residential-routing",
    "privacy-model", "token-pricing", "provider-agent", "smart-routing", "api-reference",
  ].map((slug) => ({
    url: `${BASE_URL}/docs/technical/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const communityPages = [
    "getting-started", "run-a-node", "links",
  ].map((slug) => ({
    url: `${BASE_URL}/docs/community/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...whitepaperPages, ...technicalPages, ...communityPages];
}
