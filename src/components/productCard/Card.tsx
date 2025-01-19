import { ProductButton } from '../Button/Buttons';
import Image from 'next/image';
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
        <img src={image} alt="" className='w-full h-full block object-contain'/>
      </div>
      <div className="h-1/2 w-full p-3 text-center flex flex-col gap-1">
        <h3>{header}</h3>
        <p className='line-clamp-2 overflow-ellipsis'>{content}</p>
        <span>{price}$</span>
        <div className="buttons flex justify-center items-center gap-5">
          <ProductButton id={id} />
        </div>
      </div>
    </>
  );
};

export default Card;
