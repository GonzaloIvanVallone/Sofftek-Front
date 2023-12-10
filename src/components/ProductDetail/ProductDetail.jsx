import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "../../redux/actions/indexActions";
import { useNavigate, useLocation } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";

export const ProductDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cart = useSelector((state) => state.cart) || [];
  const [productToSend, setproductToSend] = useState({});
  const product = location.state && location.state.product;

  const handleAddToCart = (quantity) => {
    const totalQuantityInCart = cart.reduce(
      (total, cartProduct) =>
        cartProduct.idProduct === product.idProduct
          ? total + cartProduct.quantity
          : total,
      0
    );
    if (totalQuantityInCart + quantity <= product.productStock) {
      dispatch(addToCart({ ...product, quantity }));
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
    const updatedProductToSend = {
      ...product,
      totalPrice: product.productPrice,
      quantity: 1,
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
      <div className="Product-Detail">        
        <div className="container-facher">
          <div className="container-information">
            <div>
                <div className="container-img">              
                  <img
                    className="img"
                    src={product.productImg}
                    alt="imagen del producto"
        

                  /><ItemCount
                  initial={1} 
                  stock={product.productStock}
                  onAdd={(quantity) => handleAddToCart(quantity)}
                />              
                <div>              
            </div>
          </div>
        </div>        
        <div className="container-card-info">
              <h3>{product.productName}</h3>
              <p>$ {product.productPrice}</p>
              <p>Stock: {product.productStock}</p>
              <p className="text-start">{product.description}</p>
             
            </div>
          </div>
        </div>
        
      </div>
      <div className="container_buttons">
          <div className="buttons_actions">
            <button className="btn btn-success" onClick={handleBuyClick}>
              Buy
            </button>
          </div>
          
        </div>      
    </div>
  );
};
