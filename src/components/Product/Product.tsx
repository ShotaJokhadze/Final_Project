import { Product as ProductInterface } from "../../types/product";

interface ProductProps extends ProductInterface {
  locale?: string;  // Made optional to maintain compatibility
}

const Product: React.FC<ProductProps> = ({ 
  title, 
  description, 
  brand, 
  price, 
  image, 
  title_ge, 
  description_ge,
  locale 
}) => {
  
  // Use localized content based on the locale
  const localizedTitle = locale === 'ka' ? title_ge : title;
  const localizedDescription = locale === 'ka' ? description_ge : description;

  return (
    <div className="flex items-center gap-9 w-full relative justify-center h-1/2">
      <div className="h-full w-1/2">      
          <img 
            className='h-full w-full block object-cover' 
            src={image} 
            alt={localizedTitle} 
          />
      </div>

      <div className="w-1/2 flex flex-col gap-3 justify-start">
        <h2 className="product-title">{localizedTitle}</h2>
        <div className="bg-yellow-100 w-fit p-2 rounded-lg text-black">{brand}</div>
        <div className="product-description">{localizedDescription}</div>
        <div className="flex justify-between w-1/2">
          <p>Price</p>${price}
        </div>
      </div>
    </div>
  );
};

export default Product;