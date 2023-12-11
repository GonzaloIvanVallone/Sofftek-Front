import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import ProductModal from "./ProductModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/indexActions";

const Productdash = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState();

  const handleDelete = (idProduct) => {
    dispatch(deleteProduct(idProduct));
  };

  const handleUpdate = (product) => {
    setModal(true);
    setProduct(product);
  };

  const handleClick = () => {
    setModal(true);
    setProduct();
  };

  return (
    <div>
      <div>
        <h1>Products List</h1>
      </div>
      <div className="text-end">
        <button
          className="btn btn-primary m-1 text-start "
          onClick={() => handleClick()}
        >
          Add New Product
        </button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((p, idx) => {
            return (
              <tr key={idx}>
                <td>{p.productName}</td>
                <td>{p.description}</td>
                <td>{p.productPrice}</td>
                <td>{p.productStock}</td>
                <td>{p.typeCategory.category}</td>
                <td>
                  <button onClick={() => handleDelete(p.idProduct)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>Delete
                  </button>
                  <button onClick={() => handleUpdate(p)}>
                    <i className="fa fa-lock" aria-hidden="true"></i>Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ProductModal modal={modal} setModal={setModal} productGive={product} />
    </div>
  );
};

export default Productdash;
