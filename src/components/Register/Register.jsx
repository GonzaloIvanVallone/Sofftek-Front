import { Form, Button } from 'react-bootstrap';
import '../Login/Login.scss'

export default function Register() {


  return (
    <div className="card p-5 mt-5">
      <div className="card-titlr">
        <h3>Registro de Usuario</h3>
      </div>
      
      <div>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" placeholder="" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Reingrese su contraseña</Form.Label>
              <Form.Control type="password" placeholder="" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </div>
        <div></div>
      </div>
    </div>
  )
}