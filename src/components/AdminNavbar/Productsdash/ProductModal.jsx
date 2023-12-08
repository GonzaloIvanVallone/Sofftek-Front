import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'react-bootstrap';

const ProductModal = ({ modal, setModal, product }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const getProducts =async()=>{
            try{
                const response = await axios.get('http://localhost:8080/api/v1/product/list');
                setProductList(response.data);
            }catch(error){
                console.log('Error: ',error)
            }
        };
        getProducts();
    }, []);
    

    useEffect(() => {
        // Función para obtener las categorías desde el backend
        const fetchCategories = async () => {
            try {
                // Realiza una solicitud GET al endpoint de categorías del backend
                const response = await axios.get('http://localhost:8080/api/v1/category/list');
                setCategoryList(response.data); // Actualiza el estado con las categorías obtenidas
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


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
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                        />
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                        />
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="text"
                            name="stock"
                        />
                        <Form.Label>Category</Form.Label>
                        
                            <Form.Select>
                                {categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category}
                                    </option>))}
                        </Form.Select>

                    </Form.Group>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button className='btn'>Save</Button>
                <Button className='btn' onClick={() => setModal(false)}> Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ProductModal