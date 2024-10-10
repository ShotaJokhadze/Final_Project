import "./Blogs.scss";
import { PostsButton } from "../components/Button/Buttons";

const url = "https://dummyjson.com/posts";

async function getBlogs() {
  const res = await fetch(url);
  const data = await res.json();
  return data.posts;
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="blog-page">
      <h2>Our Blogs</h2>
      <div className="blog-list">
        {blogs.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <PostsButton id={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
