import { MetadataRoute } from "next";

import { getBlogs } from "@/lib/get-blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs(1, 100);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const mainEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shipments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  if (!blogs) return mainEntries;

  const blogsEntries: MetadataRoute.Sitemap = await blogs?.data?.map((blog) => {
    return {
      url: `${BASE_URL}/blog/${blog?.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });

  return mainEntries.concat(blogsEntries);
}
