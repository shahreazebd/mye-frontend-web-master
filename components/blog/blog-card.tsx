import Image from "next/image";
import Link from "next/link";

import { Blog } from "@/lib/get-blogs";

import { BlogAuthorInfo } from "./blog-author-info";

interface Props {
  blogData: Blog;
}

export default function BlogCard(props: Props) {
  return (
    <Link href={`/blog/${props?.blogData?.slug}`}>
      <section className="relative h-[500px] rounded-lg shadow-lg dark:border">
        <Image
          className="h-[250px] w-full rounded-t-lg object-cover"
          src={props?.blogData?.image || ""}
          alt={props?.blogData?.title}
          width={500}
          height={100}
        />

        <section className="mx-8 mt-8">
          <p className="mt-3 text-[19px] font-black leading-6">
            {props?.blogData?.title}
          </p>

          <BlogAuthorInfo
            className="absolute bottom-8"
            author={props?.blogData?.author}
            createdAt={props?.blogData?.createdAt}
          />
        </section>
      </section>
    </Link>
  );
}
