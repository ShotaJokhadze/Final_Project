import './Blog.scss'

export default function Blog(props) {

  const { title_en, body_en, tags, likes, dislikes, views } = props

  return (
    <div className="blog-card">
      <h2 className="blog-title">{title_en}</h2>
      <p className="blog-body">{body_en}</p>
      <div className="blog-footer">
        <span className="blog-tags">
          {tags.split(',').map(tag => (
            <span key={tag} className="blog-tag">
              {tag}
            </span>
          ))}
        </span>
        <div className="blog-reactions">
          <span className="likes">Likes: {likes}</span>
          <span className="dislikes">Dislikes: {dislikes}</span>
          <span className="views">Views: {views}</span>
        </div>
      </div>
    </div>
  )
}
