import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col, Image,Alert } from 'react-bootstrap';
import '../Login/Login.scss'
import ButttonGoHome from "../ButtonGoHome/ButttonGoHome";

export const Register = () => {
  const dispatch = useDispatch();
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
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
        setShowErrorAlert(true);
        setAlertMessage('Las contraseñas no coinciden');
      return;
    }
    /*console.log(`Registrando: Usuario - ${username}, 
    Email - ${email}, Contraseña - ${password}rol:${roles}`)*/
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
          dispatch({
            type: "LOGIN"
          })
          setShowSuccessAlert(true);
          setAlertMessage('Successfully Registered User!');
          setTimeout(() => {
            localStorage.setItem('token', data.token);
            navigate('/');
          }, 2000);
      } else {
        setShowErrorAlert(true);
        setAlertMessage('Error registering user. Please try again.');
      }
    } catch (error) {
      setShowErrorAlert(true);
      setAlertMessage('Error registering user. Please try again.');
    }
    setUsername('');
    setUseremail('')
    setPassword('');
    setConfirmPassword('');
  };
  

  return (
    <div>
      <div className="card p-5 mt-5">
        <ButttonGoHome/>
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
    </div>
  )
}