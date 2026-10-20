import { Metadata } from "next";

import { getBlogs } from "@/lib/get-blogs";
import BlogCard from "@/components/blog/blog-card";
import BlogHero from "@/components/blog/blog-hero";
import { BlogPagination } from "@/components/blog/blog-pagination";

export const metadata: Metadata = {
  title: "Blog | Manage Your E-commerce",
  description: "Blog page",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const resolvedParams = searchParams ? await searchParams : {};
  const page = Number(resolvedParams.page) || 1;
  const limit = 10;

  const allBlogs = await getBlogs(page, limit);
  const pagination = allBlogs?.pagination;

  return (
    <section>
      <BlogHero />
      <section className="container mt-12">
        {!allBlogs || allBlogs?.data?.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs available at the moment. Please try again later.
          </p>
        ) : (
          <>
            <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
              {allBlogs.data.map((blog) => (
                <BlogCard key={blog.id} blogData={blog} />
              ))}
            </section>

            {pagination && pagination.totalPages > 1 && (
              <BlogPagination pagination={pagination} />
            )}
          </>
        )}
      </section>
    </section>
  );
}
