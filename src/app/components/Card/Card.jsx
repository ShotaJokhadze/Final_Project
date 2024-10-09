import './Cards.scss'


export default function Card(props) {

  const { src, header, content } = props

  return (
    <div className="card">
      <div className="card-img">
        <img src={src} alt="" />
      </div>
      <div className="card-descr">
        <h3>{header}</h3>
        <p>{content}</p>
        <div className="buttons">
          <a href='#'>View Product</a>
          <a href='#'>Add to Cart</a>
        </div>
      </div>
    </div>
  )
}
