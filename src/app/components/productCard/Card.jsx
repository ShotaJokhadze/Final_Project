import { ProductButton } from '../Button/Buttons'
import Image from 'next/image'

export default function Card(props) {

  const { id, src, header, content, price } = props

  return (
    <>
      <div className="w-full h-1/2">
        {/* <Image src={src} alt="" width={100} priority
          height={100} /> */}
      </div>
      <div className="h-1/2 w-full p-3 text-center flex flex-col g-1">
        <h3>{header}</h3>
        <p className='line-clamp-2 overflow-ellipsis'>{content}</p>
        <span>{price}$</span>
        <div className="buttons flex justify-center items-center gap-5">
          <ProductButton id={id} />
        </div>
      </div>
    </>


  )
}
