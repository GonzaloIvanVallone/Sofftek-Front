import React from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "../../redux/actions/indexActions";
import { useNavigate, useLocation } from "react-router-dom";

export const ProductDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const product = location.state && location.state.product;

  const handleAddToCart = () => {
    if (product.productStock > 0) {
      dispatch(addToCart(product));
      Swal.fire({
        title: "¡Product added to cart!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "¡Out of stock!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleBuyClick = () => {
    isLoggedIn
      ? navigate("/Buy", { state: { cart: [product] } })
      : navigate("/NotLoggin", {
          state: "no puede comprar productos sin antes ingresar a su cuenta",
        });
  };

  const handleAddCartClick = () => {
    isLoggedIn
      ? handleAddToCart()
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
            <p className="text-start">{product.description}</p>
          </div>
        </div>
      </div>
      <div className="container_buttons">
        <div className="buttons_actions">
          <button className="btn btn-success" onClick={handleBuyClick}>
            Buy
          </button>
        </div>
        <div className="buttons_actions">
          <button className="btn btn-success" onClick={handleAddCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
