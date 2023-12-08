import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'react-bootstrap';

const CategoryModal = ({ modal, setModal, category }) => {
    return (
        <Modal show={modal}>
            <ModalHeader style={{ display: 'block' }}>
                <h4>Create user</h4>
            </ModalHeader>
            <ModalBody>
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
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

export default CategoryModal