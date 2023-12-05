import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ProductDetail.css";
import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const product = location.state && location.state.product;

  const handleBuyClick = () => {
    // Use useNavigate to navigate to the '/comprar' route
    navigate("/comprar", { state: { product } });
    console.log("holaaaaaa: " + navigate);
  };

  return (
    <div className="container-product-deteil">
      <NavBar />
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
            <p>{product.productPrice}</p>
            <p>{product.productStock}</p>
            <p className="text-start">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate vitae reprehenderit reiciendis cumque. Odio blanditiis
              cumque voluptatem earum dicta, iste sit itaque libero magni
              veritatis ex culpa commodi totam quidem.
            </p>
          </div>
        </div>
        <div className="button-payment">
          <button className="btn btn-success" onClick={handleBuyClick}>
            Comprar
          </button>
        </div>

        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
