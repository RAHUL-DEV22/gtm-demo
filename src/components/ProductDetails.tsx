import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../constants/products";
import "../styles/Products.css";
import Analytics from "../Analytics";
import { ANALYTIC_EVENTS } from "../constants/analytics.constants";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleAddToCart = () => {
    console.log(`Product ${product?.name} added to cart`);
    Analytics.sendTrackEvent(ANALYTIC_EVENTS.ADD_TO_CART, {
      productId: product?.id,
      productName: product?.name,
      productCategory: product?.category,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆");
    }
    while (stars.length < 5) {
      stars.push("☆");
    }

    return stars.join("");
  };

  if (!product) {
    return (
      <div className="product-details-container">
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Products
        </button>
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button className="view-details-btn" onClick={handleBackClick}>
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Products
      </button>

      <div className="product-details">
        <img
          src={product.image}
          alt={product.name}
          className="product-details-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x400?text=Product+Image";
          }}
        />

        <div className="product-details-info">
          <div className="product-details-category">{product.category}</div>
          <h1 className="product-details-name">{product.name}</h1>
          <div className="product-details-price">${product.price}</div>

          <div className="product-details-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="rating-text">({product.rating} out of 5)</span>
          </div>

          <div
            className={`product-details-stock stock-status ${
              product.inStock ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </div>

          <div className="product-details-description">
            {product.description}
          </div>

          {product.inStock && (
            <button className="view-details-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
