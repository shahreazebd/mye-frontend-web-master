import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogBySlug, getBlogs } from "@/lib/get-blogs";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPreviewer } from "@/components/blog-previewer";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const singleBlog = await getBlogBySlug(slug);
  const blog = singleBlog?.data;

  return {
    title: blog?.title || "Blog",
    description: blog?.description || "Read our latest blog posts",
    keywords: blog?.keywords || "blog, articles, news",
    openGraph: {
      images: [
        { url: blog?.image || "/opengraph-image.png", alt: blog?.alt || "Blog Image" },
      ],
    },
    // alternates: {
    //   canonical: `https://www.attendancekeeper.net/blog/${slug}`,
    // },
  };
}

export default async function Blog({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  const blog = data?.data;

  if (!blog) {
    notFound();
  }

  return (
    <Card>
      <CardContent className="px-6">
        <article className="prose mx-auto max-w-4xl px-4 py-32 font-sans">
          <BlogPreviewer content={blog.content} />
        </article>
      </CardContent>
    </Card>
  );
}

export const revalidate = 120;

export async function generateStaticParams() {
  const blogResponse = await getBlogs(1, 100);
  const blogs = blogResponse?.data ?? [];

  return blogs.map((blog) => ({ slug: blog.slug }));
}
