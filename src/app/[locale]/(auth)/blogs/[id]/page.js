import Blog from "../../../../components/Blog/Blog";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data = await res.json();

  return data.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getBlogPost(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${id}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post with ID: ${id}`);
  }

  const data = await res.json();
  return data;
}

export default async function BlogPostPage({ params }) {
  try {
    const post = await getBlogPost(params.id);
    console.log(post);

    return <Blog {...post} />;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
