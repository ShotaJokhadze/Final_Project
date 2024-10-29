import "./ProductsModal.scss";

export default function ProductsModal({
  isOpen,
  onClose,
  title,
  body,
  price,
  image,
  setTitle,
  setBody,
  setPrice,
  setImage,
  onSubmit,
  action,
}) {
  if (!isOpen) {
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{action === "create" ? "Create New Product" : "Edit Product"}</h2>
        <div className="post-content">
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            required
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button onClick={onSubmit}>
          {action === "create" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
