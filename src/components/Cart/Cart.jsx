import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../../redux/actions/indexActions";
import "../Cart/Cart.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const preferenceId = useSelector((state) => state.idPreference);
  const [groupedCart, setGroupedCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const grouped = cart.reduce((acc, product) => {
      const productId = product.idProduct;
      if (acc[productId]) {
        acc[productId].quantity += 1;
        acc[productId].totalPrice += product.productPrice;
      } else {
        acc[productId] = {
          quantity: 1,
          totalPrice: product.productPrice,
          ...product,
        };
      }
      return acc;
    }, {});
    setGroupedCart(grouped);
    const total = Object.values(grouped).reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    Swal.fire({
      title: "¡Product deleted!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleBuyClick = () => {
    isLoggedIn
      ? navigate("/Buy", { state: { cart: groupedCart, comeFrom: "cart" } })
      : navigate("/NotLoggin", {
        state: "no puede comprar productos sin antes ingresar a su cuenta",
      });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      {Object.keys(groupedCart).length === 0 ? (
        <div className="empty-cart">
          <h1>THE CART IS EMPTY</h1>
          <Link to="/">
            <button className="btn btn-primary">START BUYING</button>
          </Link>
        </div>
      ) : (
        <div className="cart-item-conteiner p-1">
          <Row>
            <Col>
              <h1 className="dash">PURCHASE SUMMARY</h1>
            </Col>
          </Row>
          {Object.values(groupedCart).map((groupedProduct) => (
            <Row key={groupedProduct.idProduct} className="cart-item">
              <Col md={2} className="">
                <img
                  src={groupedProduct.productImg}
                  alt={groupedProduct.productName}
                />
              </Col>
              <Col md={2}>
                <h3 className="cart-item-name">{groupedProduct.productName}</h3>
              </Col>
              <Col md={4} className="cart-item-price">
                <h4 className="cart-item-name">
                  Cantidad: {groupedProduct.quantity} - ${groupedProduct.totalPrice.toFixed(2)}
                </h4>
              </Col>
              <Col md={2} className="cart-item-info">
                <button
                  onClick={() => handleRemoveFromCart(groupedProduct.idProduct)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </Col>
            </Row>
          ))}
          <Row className="total">
            <Col>
              <h3>TOTAL: ${totalPrice.toFixed(2)}</h3>
            </Col>
          </Row>
          <Row className="buttons_actions">
            <button className="btn btn-success btn-buy" onClick={handleBuyClick}>
              BUY
            </button>
          </Row>
          <Row>
            <button onClick={goHome} className="btn btn-primary btn-back">
              GO BACK
            </button>
          </Row>

        </div>
      )}
    </div>
  );
};
