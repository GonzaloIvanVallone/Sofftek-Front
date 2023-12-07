import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./PaymentForm.scss";
import { MyDatePicker } from "./DatePicker/MyDatePicker";

export const Paymentform = () => {
  const location = useLocation();

  const products = location.state && location.state.cart;

  const sum = products?.reduce(
    (total, product) => total + product.productPrice,
    0
  );

  const [formData, setFormData] = useState({
    province: "",
    locality: "",
    street: "",
    streetNumber: "",
    isApartment: false,
    apartmentNumber: "",
    floorNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container-payment">
      <h1>Welcome to Invoicing</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Products</Accordion.Header>
          <Accordion.Body>
            {products?.map((p) => (
              <div className="informationProduct" key={p.productId}>
                <div className="productName">
                  <p>{p.productName}</p>
                </div>
                <div className="informationPrice">{p.productPrice}</div>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h2>total : {sum}</h2>

      <form>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <p className="input-title">Province:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="province"
                  aria-label="province"
                  aria-describedby="basic-addon1"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="form-group">
              <p className="input-title">Locality:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="locality"
                  aria-label="locality"
                  aria-describedby="basic-addon1"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div className="form-row">
            <div className="from-group">
              <p className="input-title">Street:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="street"
                  aria-label="street"
                  aria-describedby="basic-addon1"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="from-group">
              <p className="input-title">Street Number:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="streetNumber"
                  aria-label="streetNumber"
                  aria-describedby="basic-addon1"
                  name="streetNumber"
                  value={formData.streetNumber}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <label>
              ¿is Apartment?
              <input
                type="checkbox"
                name="isApartment"
                checked={formData.isApartment}
                onChange={handleChange}
              />
            </label>
          </div>

          {formData.isApartment && (
            <div>
              <div>
                <p className="input-title">Floor number</p>
                <InputGroup className="input mb-3">
                  <Form.Control
                    type="text"
                    placeholder="floorNumber"
                    aria-label="floorNumber"
                    aria-describedby="basic-addon1"
                    name="floorNumber"
                    value={formData.floorNumber}
                    onChange={handleChange}
                  />
                </InputGroup>
              </div>
              <div>
                <p className="input-title">Apartment Number</p>
                <InputGroup className="input mb-3">
                  <Form.Control
                    type="text"
                    placeholder="apartmentNumber"
                    aria-label="apartmentNumber"
                    aria-describedby="basic-addon1"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleChange}
                  />
                </InputGroup>
              </div>
            </div>
          )}

          <MyDatePicker />

          <button type="#">Enviar</button>
        </div>
      </form>
    </div>
  );
};
