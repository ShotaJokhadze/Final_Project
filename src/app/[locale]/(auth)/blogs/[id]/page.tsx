import Blog from "../../../../components/Blog/Blog";

interface BlogPost {
  id: number;
  title_en: string;
  body_en: string;
  category_en: string;
  likes: number;
  dislikes: number;
  views: number;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data: BlogPost[] = await res.json();

  return data.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getBlogPost(id: string): Promise<BlogPost> {
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
