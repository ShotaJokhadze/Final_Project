import "./Blogs.scss";
import { PostsButton } from "../../../components/Button/Buttons";
async function fetchBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}
export default async function BlogsPage() {
  let blogs = [];
  let fetchError = null;

  try {
    blogs = await fetchBlogs();
  } catch (error) {
    fetchError = error.message;
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h2>Our Blogs</h2>
      </div>

      <div className="blog-list">
        {fetchError && <p>{fetchError}</p>}

        {blogs &&
          blogs.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-content">
                <h2>{post.title_en}</h2>
                <p>{post.body_en}</p>
                <div className="blog-buttons">
                  <PostsButton id={post.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
