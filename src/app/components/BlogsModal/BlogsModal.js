import "./BlogsModal.scss";

const BlogsModal = ({
  isOpen,
  onClose,
  title,
  body,
  setTitle,
  setBody,
  onSubmit,
  action,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{action === "create" ? "Create New Blog" : "Edit Blog Post"}</h2>
        <div className="post-content">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Post Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button onClick={onSubmit}>
          {action === "create" ? "Add Blog" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default BlogsModal;
