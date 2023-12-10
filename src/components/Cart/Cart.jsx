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
        {Object.keys(groupedCart).length === 0 ? (
        <div className="empty-cart">
          <h1>THE CART IS EMPTY</h1>
          <Link to="/">
            <button className="btn btn-primary">START BUYING</button>
          </Link>
        </div>
      ) : (
        <div>
          <div>
              <h1>PURCHASE SUMMARY</h1>
          </div>      
          <div className="cart-item-conteiner">
            {Object.values(groupedCart).map((groupedProduct) => (
              <div key={groupedProduct.idProduct} className="cart-item">
              <div className='cart-item-img'>
                <img src={groupedProduct.productImg} alt={groupedProduct.productName} />
              </div>
              <div className='cart-item-name'>
                <h3>{groupedProduct.productName}</h3>
              </div>
              <div className='cart-item-price'>
                <h4>
                Cantidad: {groupedProduct.quantity} - ${groupedProduct.totalPrice.toFixed(2)}
                </h4>
              </div>      
              <div className="cart-item-info">
                <button onClick={() => handleRemoveFromCart(groupedProduct.idProduct)} className="btn btn-danger">
                  Remove
                </button>
              </div>
            </div>
            ))}
            <div className='total'>
                <h3>TOTAL: ${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="buttons_actions">
              <button className="btn btn-success" onClick={handleBuyClick}>
                BUY
              </button>
              <button onClick={goHome} className="btn btn-primary">GO BACK</button>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
