import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./CartWidget.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const CartWidget = ({ itemCount }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  function handleCart() {
    navigate("/cart");
  }

  return (
    <Button className="button justify-content-center" onClick={handleCart}>
      <FontAwesomeIcon icon={faShoppingCart} />
      &nbsp;
      {itemCount > 0 && <span className="badge bg-secondary">{itemCount}</span>}
      <p>{totalQuantity}</p>
    </Button>
  );
};

CartWidget.propTypes = {
  itemCount: PropTypes.number, 
};
