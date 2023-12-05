import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./PaymentForm.scss";
import { MyDatePicker } from "./DatePicker/MyDatePicker";

const Buyform = () => {
  // Accede al producto desde la ubicación
  const location = useLocation();

  const product = location.state && location.state.product;

  const sum = product.productPrice;

  const [formData, setFormData] = useState({
    provincia: "",
    localidad: "",
    calle: "",
    numeroCalle: "",
    esDepartamento: false,
    numeroDepartamento: "",
    numeroDePiso: "",
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
      <p>Bienvenido a la facturacion</p>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <div className="informationProduct">
              <div className="productName">
                <p>{product.productName}</p>
              </div>
              <div className="informationPrice">{product.productPrice}</div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h2>total : {sum}</h2>

      <form>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <p className="input-title">Provincia:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  aria-label="Provincia"
                  aria-describedby="basic-addon1"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="form-group">
              <p className="input-title">Localidad:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="localidad"
                  aria-label="localidad"
                  aria-describedby="basic-addon1"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div className="form-row">
            <div className="from-group">
              <p className="input-title">Calle:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="calle"
                  aria-label="calle"
                  aria-describedby="basic-addon1"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="from-group">
              <p className="input-title">Número de Calle:</p>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="text"
                  placeholder="numeroCalle"
                  aria-label="numeroCalle"
                  aria-describedby="basic-addon1"
                  name="numeroCalle"
                  value={formData.numeroCalle}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <label>
              ¿Es un departamento?
              <input
                type="checkbox"
                name="esDepartamento"
                checked={formData.esDepartamento}
                onChange={handleChange}
              />
            </label>
          </div>

          {formData.esDepartamento && (
            <div>
              <div>
                <p className="input-title">Numero de Piso</p>
                <InputGroup className="input mb-3">
                  <Form.Control
                    type="text"
                    placeholder="numeroDePiso"
                    aria-label="numeroDePiso"
                    aria-describedby="basic-addon1"
                    name="numeroDePiso"
                    value={formData.numeroDePiso}
                    onChange={handleChange}
                  />
                </InputGroup>
              </div>
              <div>
                <p className="input-title">Numero Departamento</p>
                <InputGroup className="input mb-3">
                  <Form.Control
                    type="text"
                    placeholder="numeroDepartamento"
                    aria-label="numeroDepartamento"
                    aria-describedby="basic-addon1"
                    name="numeroDepartamento"
                    value={formData.numeroDepartamento}
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

export default Buyform;
