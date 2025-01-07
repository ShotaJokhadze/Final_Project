export default function Product(props) {

  const { title, description, category, price, rating, images, brand } = props

  const firstImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className="flex items-center gap-9 w-full relative justify-center h-1/2">
      <div className="h-full w-1/2">
        {firstImage ? (
          <img className='h-full w-full block object-cover' src={firstImage} alt={title} />
        ) : (
          <p className="">No image available</p>
        )}
      </div>

      <div className="w-1/2 flex flex-col gap-3 justify-start">
        <h2 className="product-title">{title}</h2>
        <div className="bg-yellow-100 w-fit p-2 rounded-lg text-black">{category}</div>
        <div className="product-description">{description}</div>
        <div className="flex justify-between w-1/2"><p>Price</p>${price}</div>
      </div>
    </div>
  );
}
