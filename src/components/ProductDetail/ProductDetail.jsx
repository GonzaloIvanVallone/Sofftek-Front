import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/indexActions";



const ProductDetail = () => {
  const { id } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const product1 = allProducts.find(
    (product) => product.idProduct === parseInt(id, 10)
  );
 

  const handleAddToCart = () => {
    dispatch(addToCart(product1));
    console.log(cart)
  };


  return (
    <div>
      <div className="container-facher">
        <div className="container-img">
          <img
            className="img"
            src={product1.productImg}
            alt="imagen del producto"
          />
        </div>
        <div className="container-card-info">
          <h3>{product1.productName}</h3>
          <p>{product1.productPrice}</p>
          <p>{product1.productStock}</p>
          <p className="text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            vitae reprehenderit reiciendis cumque. Odio blanditiis cumque
            voluptatem earum dicta, iste sit itaque libero magni veritatis ex
            culpa commodi totam quidem.
          </p>
        </div>
      </div>
      <div>
        <button className="btn btn-success" onClick={handleAddToCart}>Comprar</button>
        
      </div>
    </div>
  );
};

export default ProductDetail;
