import './Blogs.scss';
// import { blogPosts } from '../../../../data';

export default function Blogs() {
  return (
    <div className="blog-page">
      <h2>Our Blogs</h2>
      <div className="blog-list">
        {/* {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <div className="blog-img">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button className="read-more-button">Read More</button>
            </div>

          </div>
        ))} */}
      </div>
    </div>
  );
}
