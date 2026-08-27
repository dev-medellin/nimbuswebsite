import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/register", "/login", "/download", "/wiki", "/shop", "/news", "/rankings", "/account"].map((path) => ({ url: `https://nimbusconquer.eu${path}`, lastModified: new Date() })); }
