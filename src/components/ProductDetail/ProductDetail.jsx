import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";

export const ProductDetail = () => {
  const { id } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const product1 = allProducts.find(
    (product) => product.idProduct === parseInt(id, 10)
  );

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
        <button className="btn btn-success">Comprar</button>
      </div>
      <div></div>
    </div>
  );
};
