export interface Blog {
  alt: string;
  author: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  slug: string;
  title: string;
  updatedAt: string;
  website: string;
}

export interface BlogResponse {
  message: string;
  data: Blog[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

interface BlogBySlug {
  data: {
    alt: string;
    author: string;
    content: string;
    createdAt: string;
    description: string;
    id: string;
    image: string;
    keywords: string;
    slug: string;
    status: string;
    title: string;
    updatedAt: string;
    website: string;
  };
}

export async function getBlogs(
  page: number,
  limit: number
): Promise<BlogResponse | null> {
  try {
    const res = await fetch(
      `https://blog.evidentbd.com/api/blogs?website=MYE&page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      return null;
    }

    const data: BlogResponse = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogBySlug | null> {
  try {
    const res = await fetch(`https://blog.evidentbd.com/api/blogs/MYE/${slug}`);

    if (!res.ok) {
      return null;
    }

    const data: BlogBySlug = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
