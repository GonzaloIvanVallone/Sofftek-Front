import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image,Alert } from 'react-bootstrap';
import '../Login/Login.scss'

export const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setUseremail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const roles = 1;
  const navigate = useNavigate();
  const endpoint = 'http://localhost:8080/api/v1/auth/register';
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
        setShowErrorAlert(true);
        setAlertMessage('Las contraseñas no coinciden');
      return;
    }

    // Lógica de registro 
    console.log(`Registrando: Usuario - ${username}, 
    Email - ${email}, Contraseña - ${password}rol:${roles}`);
    // Objeto con los datos a enviar al backend
    const data = {
      id : null,
      userName: username,
      email: email,
      password: password, 
      roles:[1]
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
          setShowSuccessAlert(true);
          setAlertMessage('Successfully Registered User!');
          console.log('Successfully Registered User');
          console.log(data.token);
          // Espera un momento antes de redirigir al usuario para dar tiempo a que el usuario vea la alerta
          setTimeout(() => {
            // Guardar el token en el almacenamiento local (localStorage)
            localStorage.setItem('token', data.token);
            // Redirigir al usuario o realizar acciones adicionales
            navigate('/');
          }, 2000); // Espera 2 segundos (ajusta según sea necesario)
      } else {
        // Si el registro falla
        console.error('Error registering user');
        console.log(data);
        setShowErrorAlert(true);
        setAlertMessage('Error registering user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setShowErrorAlert(true);
      setAlertMessage('Error registering user. Please try again.');
    }


    // Reiniciar los campos después del registro
    setUsername('');
    setUseremail('')
    setPassword('');
    setConfirmPassword('');
  };


  return (

    <div className="card p-5 mt-5">
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          <Alert.Heading>{alertMessage}</Alert.Heading>
        </Alert>
      )}

      {showErrorAlert && (
        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
          <Alert.Heading>{alertMessage}</Alert.Heading>
        </Alert>
      )}
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
