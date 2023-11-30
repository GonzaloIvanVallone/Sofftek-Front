//import { useState } from 'react';
import { Form, Button, Image } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="card p-5 mt-5">
      <div className="card-titlr">
        <h3>Iniciar Sesión</h3>
      </div>
      <div>
        <div>
          <Form>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                placeholder="ingrese su usuario"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
        </div>
        <div>
          <Image src="" fluid />
        </div>
      </div>
    </div>
  );
};
