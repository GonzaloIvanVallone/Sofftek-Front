import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "../../redux/actions/indexActions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./ProductDetail.scss";

export const ProductDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cart = useSelector((state) => state.cart) || [];
  const [productToSend, setproductToSend] = useState({});
  const product = location.state?.product;

  const handleAddToCart = (quantity) => {
    if (isLoggedIn) {
      const totalQuantityInCart = cart.reduce(
        (total, cartProduct) =>
          cartProduct.idProduct === product.idProduct
            ? total + cartProduct.quantity
            : total,
        0
      );
      if (totalQuantityInCart + quantity <= product.productStock) {
        for (let i = 0; i < quantity; i++) {
          dispatch(addToCart({ ...product, quantity: 1 }));
        }
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
    } else {
      navigate("/NotLoggin", {
        state:
          "no puede añadir productos al carrito sin antes ingresar a su cuenta",
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
      navigate("/Buy", {
        state: { cart: [productToSend], comeFrom: "ProductDetail" },
      });
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
    <>
      <NavBar />
      <Container className="text-center">
        <Row>
          <Col>
            <Row>
              <div className="rounded">
                <Image
                  className="img p-3"
                  src={product.productImg}
                  alt="imagen del producto"
                />
              </div>
              <div>
                <ItemCount
                  initial={1}
                  stock={product.productStock}
                  onAdd={(quantity) => handleAddToCart(quantity)}
                  className="item-count"
                />
              <Button variant="success" onClick={handleBuyClick}>
                Buy
              </Button>
              </div>


            </Row>



          </Col>
          <Col className="border-left">
            <h3>{product.productName}</h3>
            <p>$ {product.productPrice}</p>
            <p>Stock: {product.productStock}</p>
            <p className="text-start">{product.description}</p>


          </Col>
        </Row>

        <Link to="/" className="btn link-redirect-cart">
          return
        </Link>
      </Container>
      <Footer />

    </>
  );
};
