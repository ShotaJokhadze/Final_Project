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
        <button>Add to Cart</button>
      </div>
    </div>
  )
}
