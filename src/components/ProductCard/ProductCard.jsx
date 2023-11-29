import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export const ProductCard = ({idProduct,productImg,productName,productPrice}) => {
  return (
    <div>
      <div key={idProduct}>
          <Card style={{ width: '18rem', border:'solid', borderRadius: '15px 50px'}}>
          <Card.Img variant="top" src={productImg} style={{width: '150px', height:'150px'}} />
          <Card.Body>
            <Card.Title>{productName}</Card.Title>
            <Card.Text>${productPrice}</Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
