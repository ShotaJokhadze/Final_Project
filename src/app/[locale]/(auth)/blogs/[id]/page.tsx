import Blog from "../../../../../components/Blog/Blog";
import { BlogType } from "../../../../../types/blogs";


export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data: BlogType[] = await res.json();

  return data.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getBlogPost(id: string): Promise<BlogType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${id}`);

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
    console.log(post);

    return <Blog {...post} />;
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
};

export default BlogPostPage;
