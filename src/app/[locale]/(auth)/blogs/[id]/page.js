import Blog from "../../components/Blog/Blog";

const url = "https://dummyjson.com/posts";

export async function generateStaticParams() {
  const res = await fetch(url);
  const data = await res.json();

  return data.posts.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`${url}/${id}`);
  const data = await res.json();

  return data;
}

export default async function ProductPage({ params }) {
  const post = await getProduct(params.id);

  return <Blog {...post} />;
}
