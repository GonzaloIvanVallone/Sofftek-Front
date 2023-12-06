import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductDetail.scss";
import { Footer } from "../Footer/Footer";

export const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const product = location.state && location.state.product;

  const handleBuyClick = () => {
    // Use useNavigate to navigate to the '/comprar' route
    isLoggedIn
      ? navigate("/Buy", { state: { product } })
      : navigate("/NotLoggin", {
          state: "no puede comprar productos sin antes ingresar a su cuenta",
        });
    // navigate("/Buy", { state: { product } });
  };

  const handleAddCarClick = () => {
    isLoggedIn
      ? navigate("/cart")
      : navigate("/NotLoggin", {
          state:
            "no puede agregar productos al carrito sin antes ingresar a su cuenta",
        });
  };

  return (
    <div className="container-product-deteil mt-1 mb-3">
      <div className="container-facher">
        <div className="container-information">
          <div className="container-img">
            <img
              className="img"
              src={product.productImg}
              alt="imagen del producto"
            />
          </div>
          <div className="container-card-info">
            <h3>{product.productName}</h3>
            <p>$ {product.productPrice}</p>
            <p>Stock: {product.productStock}</p>
            <p className="text-start">
            {product.description}
            </p>
          </div>
        </div>
        <div className="button-payment">
          <button
            className="btn-detail btn btn-success"
            onClick={handleBuyClick}
          >
            Buy
          </button>
          <button
            className="btn-detail btn btn-success"
            onClick={handleAddCarClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="footer-container">{/* <Footer /> */}</div>
      </div>
      <div></div>
    </div>
  );
};
