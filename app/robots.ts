import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dashboard",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
  };
}
