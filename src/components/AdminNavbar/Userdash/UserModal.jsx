import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
} from "react-bootstrap";
import "./Userdash.scss";
import { useDispatch } from "react-redux";
import {
  getAllUsers,
  newUser,
  updateUser,
} from "../../../redux/actions/indexActions";

const UserModal = ({ modal, setModal, userGive }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    roles: [2],
  });

  const isUpdateMode = !!userGive;

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    isUpdateMode ? dispatch(updateUser(user)) : dispatch(newUser(user));
    dispatch(getAllUsers());
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(userGive);
    if (isUpdateMode) {
      setUser(userGive);
    } else {
      setUser({
        userName: "",
        password: "",
        email: "",
        roles: [2],
      });
    }
  }, [isUpdateMode, userGive]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Modal show={modal}>
      <ModalHeader style={{ display: "block" }}>
        <h4>Create user</h4>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button className="btn" onClick={(e) => handleSubmit(e)}>
          Save user
        </Button>
        <Button className="btn" onClick={() => setModal(false)}>
          {" "}
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
