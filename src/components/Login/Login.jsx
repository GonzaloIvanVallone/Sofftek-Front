import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Image,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/hardtv2.png";
import "./Login.scss";
import { login } from "../../redux/actions/indexActions";
import ButttonGoHome from "../ButtonGoHome/ButttonGoHome";
import Swal from "sweetalert2";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await dispatch(login(JSON.stringify(credentials)));
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setTimeout(() => {
          navigate("/");
          Swal.close();
        }, 2000);
      } else {
        Swal.fire({
          title: "Failed to login. Please try again.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to login. Please try again.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      setShowErrorAlert(true);
      setAlertMessage("Please complete all fields.");
      return;
    }
    handleLogin();
  };

  return (
    <div>
      <div className="card p-5 mt-1 mb-3">
        <div className="w-100 text-start">
          <Link to="/" className="btn btn-primary">
            back to home
          </Link>
        </div>
        <Container className="card-title d-flex text-center">
          <Row>
            <h3>Login</h3>
          </Row>
        </Container>
        <Container className="no-flex">
          <Row>
            <Col className="text-center">
              <Image
                src={logo}
                alt="Descripción de la imagen"
                fluid
                width={500}
              />
            </Col>
            <Col className="column col-12 col-xl-6 m-3">
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
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="submit">
                  <Button className="btn-login" type="submit">
                    Sign In
                  </Button>
                  <Link to="/password" className="link-redirect">
                    <p></p>Forgot password?
                  </Link>
                  <Link to="/register" className="link-redirect">
                    Do you need an account?
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
