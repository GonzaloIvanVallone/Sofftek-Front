import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'react-bootstrap';
import './Userdash.scss';


const UserModal = ({ modal, setModal, user }) => {


    return (
        <Modal show={modal}>
            <ModalHeader style={{ display: 'block' }}>
                <h4>Create user</h4>
            </ModalHeader>
            <ModalBody>
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                            type="text"
                            name="userName"
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                           type="text"
                           name="email"
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                        />
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="status"
                        />
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            name="roles"
                        />

                    </Form.Group>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button className='btn'>Guardar cambios</Button>
                <Button className='btn' onClick={() => setModal(false)}> Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default UserModal