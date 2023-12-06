import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "../../redux/actions/indexActions";

export const ProductDetail = () => {
  const { id } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const product1 = allProducts.find(
    (product) => product.idProduct === parseInt(id, 10)
  );

  const handleAddToCart = () => {
    if (product1.productStock > 0) {
      // Dispatch de la acción addToCart
      dispatch(addToCart(product1));

      // Muestra una notificación
      Swal.fire({
        title: "¡Producto agregado al carrito!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Muestra una alerta si no hay suficiente stock
      Swal.fire({
        title: "¡Producto agotado!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
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
            <p className="text-start">
            {product.description}
            </p>
          </div>
        <div className="container-img">
          <img
            className="img"
            src={product1.productImg}
            alt="imagen del producto"
          />
        </div>
      </div>
      <div>
        <button className="btn btn-success" onClick={handleAddToCart}>Comprar</button>
      </div>
      <div></div>
    </div>
  );
};
