import { ProductButton } from '../Button/Buttons';
import Image from 'next/image';
import { FC } from 'react';

interface CardProps {
  id: number;
  src?: string;
  header: string;
  content: string;
  price: number;
}

const Card: FC<CardProps> = ({ id, src, header, content, price }) => {
  return (
    <>
      <div className="w-full h-1/2">
        {/* <Image src={src || '/placeholder.png'} alt={header} width={100} priority height={100} /> */}
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
