import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import "../styles/Products.css";
import Analytics from "../Analytics";
import { ANALYTIC_EVENTS } from "../constants/analytics.constants";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    Analytics.sendTrackEvent(ANALYTIC_EVENTS.VIEW_DETAILS, {
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
    });
    navigate(`/product/${product.id}`);
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

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/400x400?text=Product+Image";
        }}
      />
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">${product.price}</div>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-text">({product.rating})</span>
        </div>
        <div
          className={`stock-status ${
            product.inStock ? "in-stock" : "out-of-stock"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <button
          className="view-details-btn"
          onClick={handleViewDetails}
          disabled={!product.inStock}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
