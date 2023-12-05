import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProductDetail.scss";
import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";

export const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state && location.state.product;

  const handleBuyClick = () => {
    // Use useNavigate to navigate to the '/comprar' route
    navigate("/comprar", { state: { product } });
  };

  return (
    <div className="container-product-deteil mt-1 mb-3">
      {/*<NavBar />*/}
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate vitae reprehenderit reiciendis cumque. Odio blanditiis
              cumque voluptatem earum dicta, iste sit itaque libero magni
              veritatis ex culpa commodi totam quidem.
            </p>
          </div>
        </div>
        <div className="button-payment">
          <button className="btn-detail btn btn-success" onClick={handleBuyClick}>
            Comprar
          </button>
          <button className="btn-detail btn btn-success">Add to Cart</button>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
      <div></div>
    </div>
  );
};
