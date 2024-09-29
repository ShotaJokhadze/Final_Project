import img1 from '../../assets/image1.jpg'
import img2 from '../../assets/image2.jpg'
import img3 from '../../assets/image3.jpg'
import img4 from '../../assets/image4.jpg'
import './Content.scss'
import Card from '../Card/Card'


export default function Content() {
  return (
    <>
      <div className="card-container">
        <Card
          src={img1}
          header='Product 1'
          content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.' />
        <Card
          src={img2}
          header='Product 2'
          content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.' />
        <Card
          src={img3}
          header='Product 3'
          content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.' />
        <Card
          src={img4}
          header='Product 4'
          content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.' />
      </div>
    </>
  )
}
