import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const encryptedProducts = encryptData(response.data.products);
      setProducts(encryptedProducts);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  // Encrypt product data (e.g., title field)
  const encryptData = (data) => {
    return data.map((product) => {
      const encryptedProduct = { ...product };
      encryptedProduct.title = CryptoJS.AES.encrypt(product.title, 'secret_key').toString();
      return encryptedProduct;
    });
  };

  // Decrypt product title
  const decryptData = (cipherText) => {
    return CryptoJS.AES.decrypt(cipherText, 'secret_key').toString(CryptoJS.enc.Utf8);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={decryptData(product.title)} />
          <h2>{decryptData(product.title)}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p>Rating: {product.rating}</p>
          <Link to={`/product/${product.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default App;
