import React from 'react'
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ProductModal from './ProductModal';


const Productdash = () => {

  const [product, setProduct] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [modal, setModal] = useState(false);


  const handleDelete = () => {console.log("delete")}

  const handleBlock=()=>{console.log("block")}

  //Mostrar modal
  const [productId, setProductId] = useState();

  const handleClick = (id) => {
    setModal(true);
    setProductId(id);
  }


  return (
    <div>
      <div>
        <h1>Products List</h1>
      </div>
      <div className='text-end'>
        <button className='btn btn-primary m-1 text-start ' onClick={handleClick}>Add New Products</button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Descrition</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((p, idx) => {
            return (
              <tr key={idx}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category_id}</td>
                <td><button onClick={handleDelete} ><i className="fa fa-trash" aria-hidden="true"></i></button>
                  <button onClick={handleBlock}><i className="fa fa-lock" aria-hidden="true"></i></button>
                </td>
              </tr>)
          })}
        </tbody>


      </Table>
      <ProductModal modal={modal} setModal={setModal} user={productId} />

    </div>
  )
}

export default Productdash
