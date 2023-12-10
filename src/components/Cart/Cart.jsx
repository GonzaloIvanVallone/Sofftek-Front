import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../../redux/actions/indexActions";
import "./Cart.css";
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

  console.log("preferenceId:" + preferenceId);

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
      ? navigate("/Buy", { state: { cart: groupedCart } })
      : navigate("/NotLoggin", {
          state: "no puede comprar productos sin antes ingresar a su cuenta",
        });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <h1>Cart</h1>
      {Object.keys(groupedCart).length === 0 ? (
        <div>
          <p>The cart is empty</p>
          <Link to="/">
            <button>Start buying</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="row">
            {Object.values(groupedCart).map((groupedProduct) => (
              <div key={groupedProduct.idProduct} className="cart-item">
                <img
                  src={groupedProduct.productImg}
                  alt={groupedProduct.productName}
                />
                <h5>{groupedProduct.productName}</h5>
                <p>
                  Quantity: {groupedProduct.quantity} - $
                  {groupedProduct.totalPrice.toFixed(2)}
                </p>
                <div className="cart-item-info">
                  <button
                    onClick={() =>
                      handleRemoveFromCart(groupedProduct.idProduct)
                    }
                  >
                    Remove for cart
                  </button>
                </div>
              </div>
            ))}
            <div>
              <p>Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="buttons_actions">
              <button className="btn btn-success" onClick={handleBuyClick}>
                Buy
              </button>
            </div>
            <div>
              <button onClick={goHome}>Go Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
