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
import Swal from "sweetalert2";

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
    const requiredFields = [];

    if (formData.isApartment) {
      requiredFields.push("floorNumber", "apartmentNumber");
    }

    // Filtrar los campos que están en blanco
    const emptyFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      Swal.fire({
        title: "DATOS FALTANTES",
        text: `Por favor, completa los siguientes campos: ${emptyFields.join(
          ", "
        )}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
      return;
    }

    // Resto de la lógica para manejar el envío del formulario
    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch(createPreference(paymentMPDTOFromFrontend));
  };

  const handleDateChange = (date) => {
    const today = new Date();
    if (date && date <= today) {
      Swal.fire({
        title: "FECHA INVALIDA",
        text: `Por favor, selecciona una fecha futura.`,
        icon: "error",
        confirmButtonText: "Continue",
      });
      return;
    }

    today.setDate(today.getDate() + 7);

    if (date && date > today) {
      Swal.fire({
        title: "FECHA INVALIDA",
        text: `Por favor, selecciona una fecha más cercana.`,
        icon: "error",
        confirmButtonText: "Continue",
      });
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
    <div className="container-invoicing">
      <div className="payment">
        <div className="container-payment">
          <h1>Welcome to Invoicing</h1>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Products</Accordion.Header>
              <Accordion.Body>
                {products && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Sub Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(products).map((p) => (
                        <tr key={p.productId} className="informationProduct">
                          <td className="productName">{p.productName}</td>
                          <td className="productQuantity">{p.quantity}</td>
                          <td className="informationPrice">${p.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h2>Total : ${total}</h2>

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
                      placeholder="Province"
                      aria-label="province"
                      aria-describedby="basic-addon1"
                      name="province"
                      maxLength={18}
                      value={formData.province}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </div>

                <div className="form-group">
                  <p className="input-title">Locality:</p>
                  <InputGroup className="input mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Locality"
                      aria-label="locality"
                      aria-describedby="basic-addon1"
                      name="locality"
                      maxLength={18}
                      value={formData.locality}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <p className="input-title">Street:</p>
                  <InputGroup className="input mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Street"
                      aria-label="street"
                      aria-describedby="basic-addon1"
                      name="street"
                      maxLength={18}
                      value={formData.street}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </div>

                <div className="form-group">
                  <p className="input-title">Street Number:</p>
                  <InputGroup className="input mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Street Number"
                      aria-label="streetNumber"
                      aria-describedby="basic-addon1"
                      name="streetNumber"
                      maxLength={4}
                      value={formData.streetNumber}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </div>
              </div>
              <div>
                <label>
                  <div className="container_checkbox">
                    <p className="p_check">¿is Apartment?</p>
                    <input
                      type="checkbox"
                      name="isApartment"
                      checked={formData.isApartment}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>

              {formData.isApartment && (
                <div>
                  <div>
                    <p className="input-title">Floor number</p>
                    <InputGroup className="input mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Floor Number"
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
                        placeholder="Apartment Number"
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
                <h3>Select a delivery date:</h3>
                <DatePicker
                  selected={
                    formData.selectedDate
                      ? new Date(formData.selectedDate)
                      : null
                  }
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Puedes ajustar el formato según tus necesidades
                  placeholderText="Click and choose a date"
                  title="Click and choose a date that is older than today, but not older than a week."
                  required
                />
              </div>
            </div>
            <Button
              className="button_submit"
              type="submit"
              disabled={!!preferenceId}
            >
              Request Payment
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
          <div className="container_cancel">
            <div className="container_cancel_button">
              <Button
                className="button_cancel btn-primary"
                onClick={handleCancelPay}
              >
                Cancel Payment
              </Button>
            </div>
            <div className="container_cancel_p">
              <p className="cancel_p">Cancel regretless</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
