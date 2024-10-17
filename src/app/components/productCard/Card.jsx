import { ProductButton } from '../Button/Buttons'
import './Cards.scss'
import Image from 'next/image'

export default function Card(props) {

  const { id, src, header, content, price } = props

  return (
    <div className="card">
      <div className="card-img">
        <Image src={src} alt="" width={100} priority
          height={100} />
      </div>
      <div className="card-descr">
        <h3>{header}</h3>
        <p>{content}</p>
        <span>{price}</span>
        <div className="buttons">
          <ProductButton id={id} />
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
