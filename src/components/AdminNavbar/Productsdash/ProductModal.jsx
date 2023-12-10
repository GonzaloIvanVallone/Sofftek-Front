import React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  getAllProducts,
  createProduct,
  updateProduct,
} from "../../../redux/actions/indexActions";

const ProductModal = ({ modal, setModal, productGive }) => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.allCategories);
  const [product, setProduct] = useState({
    productName: "",
    productStock: 0,
    productImg: "",
    description: "",
    productPrice: 0,
    typeCategory: {
      idCategory: 0,
      categoryName: "",
    },
  });

  const isUpdateMode = !!productGive;

  useEffect(() => {
    if (isUpdateMode) {
      setProduct(productGive);
    } else {
      setProduct({
        productName: "",
        productStock: 0,
        productImg: "",
        description: "",
        productPrice: 0,
        typeCategory: {
          idCategory: 0,
          categoryName: "",
        },
      });
    }
  }, [isUpdateMode, productGive]);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    isUpdateMode
      ? dispatch(updateProduct(product))
      : dispatch(createProduct(product));
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setModal(false);
  };

  useEffect(() => {
    dispatch(getAllCategories()), dispatch(getAllProducts());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = allCategories.find(
      (category) => category.category === selectedCategoryName
    );
    const selectedCategoryId = selectedCategory
      ? selectedCategory.idCategory
      : null;
    setProduct((prevProduct) => ({
      ...prevProduct,
      typeCategory: {
        idCategory: selectedCategoryId,
        categoryName: selectedCategoryName,
      },
    }));
  };

  return (
    <Modal show={modal}>
      <ModalHeader style={{ display: "block" }}>
        <h4>Create product</h4>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="productImg"
              value={product.productImg}
              onChange={handleChange}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
            />
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              name="productStock"
              value={product.productStock}
              onChange={handleChange}
            />
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={handleCategoryChange}>
              {allCategories
                .filter((category) => category.category !== "all")
                .map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.category}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn" onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
        <Button className="btn" onClick={() => setModal(false)}>
          {" "}
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
