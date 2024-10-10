import './Blog.scss'

export default function Blog(props) {

  const { title, body, tags, reactions, views } = props

  return (
    <div className="blog-card">
      <h2 className="blog-title">{title}</h2>
      <p className="blog-body">{body}</p>
      <div className="blog-footer">
        <span className="blog-tags">
          {tags.map(tag => (
            <span key={tag} className="blog-tag">{tag}</span>
          ))}
        </span>
        <div className="blog-reactions">
          <span className="likes">Likes: {reactions.likes}</span>
          <span className="dislikes">Dislikes: {reactions.dislikes}</span>
          <span className="views">Views: {views}</span>
        </div>
      </div>
    </div>
  )
}
