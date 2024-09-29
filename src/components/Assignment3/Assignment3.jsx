import './Assignment3.scss'

export default function Assignment3() {

  const obj = {
    id: '10002',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with our durable, eco-friendly water bottle.',
    price: 14.99,
    currency: 'USD',
    imageURL: 'https://example.com/images/product-10002.jpg',
  };

  const rows = Object.keys(obj).map((key, index) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{obj[key]}</td>
      <td>{index}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Product Details</h2>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
