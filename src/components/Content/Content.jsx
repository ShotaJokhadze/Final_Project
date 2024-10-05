import './Content.scss'
import Card from '../Card/Card'
// import { cardData } from '../../data'
import { useEffect, useState } from 'react';

const url = 'https://dummyjson.com/products'

export default function Content() {

  const [productList, setProductList] = useState([]);

  console.log("productList :", productList);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(url)
        const data = await response.json()


        const productsLimit = data.products.slice(0, 15)
        setProductList(productsLimit);
      } catch (error) {
        console.log(error);
        setProductList([]);
      }


    }

    fetchProducts();
  }, [])


  return (
    <>
      <div className="card-container">
        {productList.map((product) => (
          <Card key={product.id}
            src={product.images[0]}
            header={product.title}
            content={product.description}
          />
        ))}
      </div>
    </>
  )
}