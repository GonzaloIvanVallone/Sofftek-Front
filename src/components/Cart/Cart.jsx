import React from 'react';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/actions/indexActions';
import './Cart.css';
import { removeFromCart } from '../../redux/actions/indexActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";




export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [groupedCart, setGroupedCart] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    
    const goHome = () => {
        navigate('/');
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
      const total = Object.values(grouped).reduce((sum, product) => sum + product.totalPrice, 0);
    setTotalPrice(total);
        }, [cart]);
  


        const handleRemoveFromCart = (productId) => {
            dispatch(removeFromCart(productId));
            Swal.fire({
              title: "¡Producto eliminado!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
        }


        useEffect(() => {
         
            localStorage.setItem('cart', JSON.stringify(cart));
          }, [cart]);

          
          return (
            <div>
              <h1>Carrito de Compras</h1>
              {Object.keys(groupedCart).length === 0 ? (
                <div>
                  <p>El carrito está vacío.</p>
                  <Link to="/">
                    <button>Comenzar a Comprar</button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="row">
                    {Object.values(groupedCart).map((groupedProduct) => (
                      <div key={groupedProduct.idProduct} className="cart-item">
                        <img src={groupedProduct.productImg} alt={groupedProduct.productName} />
                        <h5>{groupedProduct.productName}</h5>
                        <p>
                          Cantidad: {groupedProduct.quantity} - ${groupedProduct.totalPrice.toFixed(2)}
                        </p>
                        <div className="cart-item-info">
                          <button onClick={() => handleRemoveFromCart(groupedProduct.idProduct)}>
                            Eliminar del carrito
                          </button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <p>Total de la compra: ${totalPrice.toFixed(2)}</p>
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
        



