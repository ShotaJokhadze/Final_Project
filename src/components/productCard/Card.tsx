import Image from 'next/image';
import { ProductButton } from '../Button/Buttons';
import { FC } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { Product } from '../../types/product';

const Card: FC<Product> = ({ id, title, description, price, image, brand }) => {
  return (
    <>
      <div className="w-full h-1/2 relative">
        <Image
          src={image}
          alt=""
          className="w-full h-full block object-contain"
          width={0}
          height={0}
          sizes="100vw"
        />
        <span className="absolute top-2 left-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">
          {brand}
        </span>
      </div>
      <div className="h-1/2 w-full p-3 text-center flex flex-col gap-1 justify-between">
        <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>{title}</h3>
        <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{description}</p>
        <span className='text-lg font-bold text-gray-900 dark:text-gray-100'>{price}$</span>
        <div className="buttons flex justify-center items-center gap-5">
          <ProductButton id={id} data-cy='view-product-button'/>
          <AddToCartButton productId={id}/>
        </div>
      </div>
    </>
  );
};

export default Card;