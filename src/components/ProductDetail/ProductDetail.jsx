import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "../../redux/actions/indexActions";
import { useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";

export const ProductDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cart = useSelector((state) => state.cart) || [];
  const [productToSend, setproductToSend] = useState({});
  const product = location.state && location.state.product;

  const handleAddToCart = () => {
    const totalQuantityInCart = cart.reduce(
      (total, cartProduct) =>
        cartProduct.idProduct === product.idProduct
          ? total + cartProduct.quantity
          : total,
      0
    );
    if (totalQuantityInCart < product.productStock) {
      dispatch(addToCart({ ...product, quantity: 1 }));
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

  useEffect(() => {
    // Aquí puedes agregar lógica para modificar o agregar nuevos atributos a productToSend
    // Por ejemplo, podrías añadir una nueva propiedad llamada 'totalPrice'

    const updatedProductToSend = {
      ...product,
      totalPrice: product.productPrice,
      quantity: 1,
      // Agrega otros atributos según sea necesario
    };

    setproductToSend(updatedProductToSend);
  }, [product]);

  const handleBuyClick = () => {
    if (isLoggedIn) {
      navigate("/Buy", { state: { cart: [productToSend] } });
    } else {
      navigate("/NotLoggin", {
        state: "no puede comprar productos sin antes ingresar a su cuenta",
      });
    }
  };

  const handleAddCartClick = () => {
    isLoggedIn
      ? handleAddToCart()
      : navigate("/NotLoggin", {
          state:
            "You cannot add products to the cart without first logging into your account.",
        });
  };

  return (
    <div className="container-product-deteil mt-1 mb-3">
      <NavBar />
      <div className="Product-Detail">
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
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};
