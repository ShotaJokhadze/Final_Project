import { ProductButton } from '../Button/Buttons'
import './Cards.scss'


export default function Card(props) {

  const { id, src, header, content, price } = props

  return (
    <div className="card">
      <div className="card-img">
        <img src={src} alt="" />
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
