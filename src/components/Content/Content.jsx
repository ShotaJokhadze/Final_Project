import './Content.scss'
import Card from '../Card/Card'
import { cardData } from '../../data'


export default function Content() {
  return (
    <>
      <div className="card-container">
        {cardData.map((card, index) => (
          <Card
            key={index}
            src={card.src}
            header={card.header}
            content={card.content}
          />
        ))}
      </div>
    </>
  )
}
