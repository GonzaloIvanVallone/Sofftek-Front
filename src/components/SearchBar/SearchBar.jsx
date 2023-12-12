import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { getProductsByName } from "../../redux/actions/indexActions";
import "./SearchBar.scss";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (name) {
      dispatch(getProductsByName(name));
      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
      setName("");
    }
  };

  return (
    <div className="searchBar">
      {/* <input
        type="search"
        placeholder=" Product to search..."
        onChange={(e) => handleChange(e)}
      ></input>
      <button
        className="btn"
        type="submit"
        value={name}
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button> */}
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
    </div>
  );
};
