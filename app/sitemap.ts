import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getChallenges, getCoaches, getProducts } from "@/lib/data/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [challenges, coaches, products] = await Promise.all([
    getChallenges(),
    getCoaches(),
    getProducts(),
  ]);

  const staticRoutes = [
    "",
    "/training",
    "/classes",
    "/challenges",
    "/community",
    "/coaches",
    "/store",
    "/about",
    "/contact",
    "/join",
    "/privacy",
    "/cookies",
    "/terms",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...challenges.map((c) => ({ url: `${base}/challenges/${c.slug}`, lastModified: new Date() })),
    ...coaches.map((c) => ({ url: `${base}/coaches/${c.slug}`, lastModified: new Date() })),
    ...products.map((p) => ({ url: `${base}/store/${p.slug}`, lastModified: new Date() })),
  ];
}
