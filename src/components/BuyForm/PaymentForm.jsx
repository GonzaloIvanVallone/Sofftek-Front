import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./PaymentForm.scss";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import {
  createPreference,
  setPreferenceId,
} from "../../redux/actions/indexActions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Paymentform = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preferenceId = useSelector((state) => state.idPreference);
  const products = location.state?.cart;

  useEffect(() => {
    initMercadoPago("TEST-318bcc68-f6f3-4251-bcbd-b07aac21c30d", {
      locale: "es-AR",
    });
  }, []);

  const total = Object.values(products).reduce(
    (sum, product) => sum + product.totalPrice,
    0
  );

  const items = Object.values(products).map((product) => ({
    idItem: product.productId, // Usar un identificador único del producto
    quantitySelected: product.quantity, // Puedes establecer la cantidad seleccionada según tus necesidades
    product: product,
    totalForProduct: product.productPrice * product.quantity, // Otras lógicas para calcular el total si es necesario
  }));

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
    amount: total,
    token: localStorage.getItem("token"),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
        // Si el checkbox pasa de true a false, resetea los valores de floorNumber y apartmentNumber
        floorNumber: checked ? formData.floorNumber : "",
        apartmentNumber: checked ? formData.apartmentNumber : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const paymentMPDTOFromFrontend = {
    lstItem: items,
  };

  const handleRequestPreferenceId = () => {
    console.log(formData);
    // Validación de campos requeridos
    const requiredFields = [
      "province",
      "locality",
      "street",
      "streetNumber",
      "selectedDate",
    ];

    if (formData.isApartment) {
      console.log("entre");
      requiredFields.push("floorNumber", "apartmentNumber");
    }

    // Filtrar los campos que están en blanco
    const emptyFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      alert(
        `Por favor, completa los siguientes campos: ${emptyFields.join(", ")}`
      );
      return;
    }

    // Resto de la lógica para manejar el envío del formulario
    localStorage.setItem("formData", JSON.stringify(formData));
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
  };

  const handleCancelPay = () => {
    dispatch(setPreferenceId(""));
    localStorage.removeItem("formData");
    navigate("/");
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
      <h2>total : {total}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRequestPreferenceId();
        }}
      >
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
                  maxLength={18}
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
                  maxLength={18}
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
                  maxLength={18}
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
                  maxLength={4}
                  value={formData.streetNumber}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <label>
              <p>¿is Apartment?</p>
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
        </div>
        <Button
          className="button_submit"
          type="submit"
          disabled={!!preferenceId}
        >
          Solicitar Pago
        </Button>
      </form>
      {preferenceId && (
        <Wallet
          initialization={{
            preferenceId,
            redirectMode: "modal",
          }}
        />
      )}
      <Button className="button_cancel" onClick={handleCancelPay}>
        Cancelar Compra
      </Button>
    </div>
  );
};
