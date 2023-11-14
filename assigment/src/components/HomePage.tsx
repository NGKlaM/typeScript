import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  image: string;
  name: string;
  price: number;
  details: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the server
    axios.get('/api/products').then((response) => {
      // Set the products in state
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {/* Display the products */}
      {products.map((product) => (
        <div key={product.name}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.details}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
