import React from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../Userdash/Userdash.scss'
import CategoryModal from './CategoryModal';

const Categorydash = () => {

  //const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useState(false);

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


  const handleDelete = () => { console.log("delete") }

  const handleBlock = () => { console.log("block") }

  //Mostrar modal
  const [categotyId, setCategoryId] = useState();

  const handleClick = (id) => {
    setModal(true);
    setCategoryId(id);
  }

  return (

    <div>
      <div>
        <h1>Category List</h1>
      </div>
      <div className='text-end'>
        <button className='btn btn-primary m-1 text-start ' onClick={handleClick}>Add New Category</button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name category</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {categoryList.map((c, idx) => {
            return (
              <tr key={idx}>
                <td>{c.idx}</td>
                <td>{c.category}</td>
                <td>
                  <button className='btn btn-primary m-1' onClick={handleDelete}>Del</button>
                  <button className='btn btn-primary m-1' onClick={handleBlock}>Edit</button>
                </td>
              </tr>)
          })}
        </tbody>


      </Table>
      <CategoryModal modal={modal} setModal={setModal} user={categotyId} />

    </div>
  )
}

export default Categorydash