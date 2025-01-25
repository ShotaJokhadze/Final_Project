import Image from 'next/image';
import { ProductButton } from '../Button/Buttons';
import { FC } from 'react';

interface CardProps {
  id: number;
  header: string;
  content: string;
  price: number;
  image: string
}

const Card: FC<CardProps> = ({ id, header, content, price, image }) => {
  return (
    <>
      <div className="w-full h-1/2">
        <Image
          src={image}
          alt=""
          className="w-full h-full block object-contain"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="h-1/2 w-full p-3 text-center flex flex-col gap-1 justify-between">
        <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>{header}</h3>
        <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{content}</p>
        <span className='text-lg font-bold text-gray-900 dark:text-gray-100'>{price}$</span>
        <div className="buttons flex justify-center items-center gap-5">
          <ProductButton id={id}/>
        </div>
      </div>
    </>
  );
};

export default Card;
