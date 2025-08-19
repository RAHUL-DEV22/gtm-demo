import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../constants/products';
import '../styles/Products.css';

const ProductList: React.FC = () => {
  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of {PRODUCTS.length} products</p>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
