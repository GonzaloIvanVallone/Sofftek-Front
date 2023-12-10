import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
} from "react-bootstrap";
import {
  newCategory,
  updateCategory,
} from "../../../redux/actions/indexActions";
import { useDispatch } from "react-redux";

const CategoryModal = ({ modal, setModal, categoryGive }) => {
  const dispatch = useDispatch();
  const [category, setcategory] = useState({
    category: "",
  });

  const isUpdateMode = !!categoryGive;

  useEffect(() => {
    if (isUpdateMode) {
      setcategory(categoryGive);
    } else {
      setcategory({
        category: "",
      });
    }
  }, [isUpdateMode, categoryGive]);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (category) {
      isUpdateMode
        ? dispatch(updateCategory(category))
        : dispatch(newCategory(category));
      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
      // setcategory("");
      setModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  return (
    <Modal show={modal}>
      <ModalHeader style={{ display: "block" }}>
        <h4>Create category</h4>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={category.category}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn" onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
        <Button className="btn" onClick={() => setModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CategoryModal;
