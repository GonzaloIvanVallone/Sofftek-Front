import React from "react";
import { useState } from "react";


export const ItemCount = ({ initial , stock, onAdd}) => {
    const [quantity, setQuantity] = useState(initial);
  
    const handleIncrease = () => {
      if (quantity < stock) {
        setQuantity(quantity + 1);
      }
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleAddToCart = () => {
      onAdd(quantity);
    };
  
    return (
      <div className="item-count-container">
        <div className="item-count-buttons">
          <button onClick={handleDecrease} className="btn btn-secondary">
            -
          </button>
          <span className="item-count">{quantity}</span>
          <button onClick={handleIncrease} className="btn btn-secondary">
            +
          </button>
        </div>
        <button onClick={handleAddToCart} className="btn btn-success">
          Add to Cart
        </button>
      </div>
    );
  };