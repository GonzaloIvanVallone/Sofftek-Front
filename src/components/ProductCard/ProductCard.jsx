import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export default function ProductCard() {
  return (
    <div>
      <div>
          <Card style={{ width: '18rem', border:'solid', borderRadius: '15px 50px'}}>
          <Card.Img variant="top" src="./public/images/monitor1.jpeg" style={{width: '150px', height:'150px'}} />
          <Card.Body>
            <Card.Title>Monitor</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Link to= "/productDetail">
            <Button variant="dark">Descripcion</Button>
            </Link> 
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
