import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Image, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.scss'




export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const endpoint = '';
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        navigate('/');
      } else {
        // Manejar errores si el inicio de sesión falla
        alert('Error de Inicio');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (

    <div className="card p-5 mt-5">
      <Container className="card-title d-flex">
        <Row>
        <h3>Iniciar Sesión</h3>
        </Row>
      </Container>
      <Container className='no-flex'>
        <Row >
          <Col >
            <Image src="hardtv2.png" alt="Descripción de la imagen" fluid width={400} />
          </Col>
          <Col className='column col-12 col-xl-6 m-3'>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Iniciar Sesión
              </Button>
            </Form>
          </Col>

        </Row>
      </Container>

    </div>
  );
}
