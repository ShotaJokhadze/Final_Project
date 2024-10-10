import './Product.scss';

export default function Product(props) {

  const { title, description, category, price, rating, images, brand } = props

  const firstImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className="product-page">
      <div className="product-image">
        {firstImage ? (
          <img src={firstImage} alt={title} />
        ) : (
          <p className="product-image__fallback">No image available</p>
        )}
      </div>

      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <div className="product-category">{category}</div>
        <div className="product-description">{description}</div>
        <div className="product-feature brand"><p>Brand</p>{brand}</div>
        <div className="product-feature price"><p>Price</p>${price}</div>
        <div className="product-feature rating"><p>Rating</p>
          {rating}
        </div>
      </div>
    </div>
  );
}
