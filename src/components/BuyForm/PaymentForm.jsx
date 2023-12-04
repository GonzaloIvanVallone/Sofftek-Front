import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./PaymentForm.scss";

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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="conteiner">
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
              <InputGroup className="mb-3">
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
              <InputGroup className="mb-3">
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
              <label>
                <input
                  type="text"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="from-group">
              <p className="input-title">Número de Calle:</p>
              <label>
                <input
                  type="text"
                  name="numeroCalle"
                  value={formData.numeroCalle}
                  onChange={handleChange}
                />
              </label>
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
              <label>
                Numero de piso:
                <input
                  type="text"
                  name="numeroDepartamento"
                  value={formData.numeroDepartamento}
                  onChange={handleChange}
                />
              </label>
              <label>
                Número de Departamento:
                <input
                  type="text"
                  name="numeroDepartamento"
                  value={formData.numeroDepartamento}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Buyform;
