import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Image, Container, Row, Col,Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.scss'




export const Login = () => {
  const navigate = useNavigate();

  /*const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
 

    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        console.log('OK');
        navigate('/');
      } else {
        // Manejar errores si el inicio de sesión falla
        alert('Login invalid');
        console.log(userName, password)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };*/

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', data.token);

        // Redirigir al usuario o realizar acciones adicionales
        navigate('/');
        console.log('Inicio de sesión exitoso');
        console.log(data.token)
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Ocurrió un error al procesar la solicitud.');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar los campos aquí si es necesario
    if (credentials.email.trim() === '' || credentials.password.trim() === '') {
      console.log(credentials.userName,credentials.password)
      setError('Por favor, complete todos los campos.');
      return;
    }
    // Si los campos están completos, intentar iniciar sesión
    handleLogin();
  };





  return (

    <div className="card p-5 mt-5">
      <Container className="card-title d-flex">
        <Row>
          <h3>Login</h3>
        </Row>
      </Container>
      <Container className='no-flex'>
        <Row >
          <Col >
            <Image src="hardtv2.png" alt="Descripción de la imagen" fluid width={400} />
          </Col>
          <Col className='column col-12 col-xl-6 m-3'>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required />
                
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required />
                
              </Form.Group>
              <Link to ="/password" className='nav-link'><p></p>Forgot password</Link>
              <Button variant="primary" type="submit">
                SignIn
              </Button>
            </Form>
          </Col>

        </Row>
      </Container>

    </div>
  );
}
