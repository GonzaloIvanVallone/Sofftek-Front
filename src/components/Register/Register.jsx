import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import '../Login/Login.scss'

export const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setUseremail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const status = true;
  const roles = 1;
  const navigate = useNavigate();
  const endpoint = 'http://localhost:8080/api/v1/auth/register';


  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Lógica de registro 
    console.log(`Registrando: Usuario - ${username}, 
    Email - ${email}, Contraseña - ${password}rol:${roles}`);
    // Objeto con los datos a enviar al backend
    const data = {
      username: username,
      email: email,
      password: password,
      roles,
      status
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Registro exitoso
        console.log('Usuario registrado exitosamente');
        // Redireccion a home
        navigate('/');

      } else {
        // Si el registro falla
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }


    // Reiniciar los campos después del registro
    setUsername('');
    setUseremail('')
    setPassword('');
    setConfirmPassword('');
  };


  return (

    <div className="card p-5 mt-5">
      <div className="card-title">
        <h3>Registro de Usuario</h3>
      </div>

      <Container className='no-flex'>
        <Row >
          <Col className="">
            <Image src="hardtv2.png" alt="Descripción de la imagen" fluid width={400} />
          </Col>
          <Col className='column col-12 col-xl-6'>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formUsername">
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  requerid
                  minLength={6}
                  maxLength={20}
                />
              </Form.Group>

              <Form.Group controlId="formUseremail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  maxLength={30}
                  required
                  onChange={(e) => setUseremail(e.target.value)}

                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={20}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  maxLength={20}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>

    </div>


  )
}
