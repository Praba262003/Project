import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch product details');
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="product-details">
      {product && (
        <>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p>Stock: {product.stock}</p>
          <p>Brand: {product.brand}</p>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
