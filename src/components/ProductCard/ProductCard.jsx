import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductCard.scss";
import { NavItem } from "react-bootstrap";


export const ProductCard = ({
  idProduct,
  productImg,
  productName,
  productPrice,
  description
}) => {
  return (
    <div>
      <div>
        
        <Card
          className="center"
          style={{
            width: "18rem",
            height: "30rem",
            border: "solid",
            borderRadius: "15px 50px",
          }}
        >
          <Card.Img
            className="img-fluid w-75 text-center"
            variant="top"
            src={productImg}
            style={{ width: "250px", height: "250px" }}
          />
          <Card.Body>
            <Card.Title className="title">{productName}</Card.Title>
            <Card.Text className="card-text">
            {description +"..."}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Text className="price">${productPrice}</Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};
