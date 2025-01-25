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
  const res = await fetch(`${baseUrl}/api/blogs/${id}`,
    { cache: 'default' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post with ID: ${id}`);
  }

  return res.json();
}


interface BlogPostPageProps {
  params: {
    id: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  try {
    const post = await getBlogPost(params.id);

    return <Blog {...post} />;
  } catch (error) {
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>An unexpected error occurred</div>;
  }
};

export default BlogPostPage;
