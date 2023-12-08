import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./PaymentForm.scss";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createPreference } from "../../redux/actions/indexActions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Paymentform = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const preferenceId = useSelector((state) => state.idPreference);
  const products = location.state && location.state.cart;
  const [totalprice, setTotalprice] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    initMercadoPago("TEST-318bcc68-f6f3-4251-bcbd-b07aac21c30d", {
      locale: "es-AR",
    });

    const total = Object.values(products).reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );
    setTotalprice(total);
    const items = Object.values(products).map((product) => ({
      idItem: product.productId, // Usar un identificador único del producto
      quantitySelected: product.quantity, // Puedes establecer la cantidad seleccionada según tus necesidades
      product: product,
      totalForProduct: product.productPrice * product.quantity, // Otras lógicas para calcular el total si es necesario
    }));
    setItems(items);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const paymentMPDTOFromFrontend = {
    lstItem: items,
  };

  const [formData, setFormData] = useState({
    province: "",
    locality: "",
    street: "",
    streetNumber: "",
    isApartment: false,
    apartmentNumber: "",
    floorNumber: "",
    lstItem: items,
    selectedDate: null,
    amount: totalprice,
    token: localStorage.getItem("token"),
  });

  const handleRequestPreferenceId = (name, type, checked, value) => {
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    );
    console.log(localStorage.getItem("formData"));
    dispatch(createPreference(paymentMPDTOFromFrontend));
  };

  const handleDateChange = (date) => {
    const today = new Date();
    if (date && date <= today) {
      alert("Por favor, selecciona una fecha futura.");
      return;
    }

    today.setDate(today.getDate() + 7);

    if (date && date > today) {
      alert("Por favor, selecciona una fecha más cercana.");
      return;
    }

    // Actualiza el estado del formData
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date ? date.toISOString() : null,
    }));

    // Almacena el formData actualizado en el localStorage
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        selectedDate: date ? date.toISOString() : null,
      })
    );
  };

  return (
    <div className="container-payment">
      <h1>Welcome to Invoicing</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Products</Accordion.Header>
          <Accordion.Body>
            {products &&
              Object.values(products).map((p) => (
                <div className="informationProduct" key={p.productId}>
                  <div className="productName">
                    <p>{p.productName}</p>
                  </div>
                  <div className="productQuantity">
                    <p>{p.quantity}</p>
                  </div>
                  <div className="informationPrice">{p.totalPrice}</div>
                </div>
              ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h2>total : {totalprice}</h2>

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
                  maxLength={10}
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
          <div>
            <h3>Selecciona una fecha:</h3>
            <DatePicker
              selected={
                formData.selectedDate ? new Date(formData.selectedDate) : null
              }
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Puedes ajustar el formato según tus necesidades
              placeholderText="Haga clic y elija una fecha"
              title="Haga clic y elija una fecha que sea mayor a la de hoy pero no superior a una semana."
            />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRequestPreferenceId}>
                Action
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </form>
      {preferenceId && (
        <Wallet
          initialization={{
            preferenceId,
            redirectMode: "modal",
          }}
        />
      )}
    </div>
  );
};
