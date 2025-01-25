import { notFound } from "next/navigation";
import Blog from "../../../../../components/Blog/Blog";
import { BlogType } from "../../../../../types/blogs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/api/blogs`);

    if (!res.ok) {
      console.error("Failed to fetch blog posts");
      return [];
    }

    const data: BlogType[] = await res.json();

    return data.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}


async function getBlogPost(id: string): Promise<BlogType> {
  const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
    cache : 'no-store'
  }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post with ID: ${id}`);
  }

  return res.json();
}


interface BlogPostPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id, locale } = params;  // Extract both id and locale
  const post = await getBlogPost(id);

  if (!post) {
    return notFound();
  }

  // Pass both the product data and locale to the Product component
  return <Blog {...post} locale={locale}/>;
}
