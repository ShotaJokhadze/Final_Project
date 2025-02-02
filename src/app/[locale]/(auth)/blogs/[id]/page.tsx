import { notFound } from "next/navigation";
import Blog from "../../../../../components/Blog/Blog";
import { BlogType } from "../../../../../types/blogs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

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

  return <Blog {...post} locale={locale}/>;
}
