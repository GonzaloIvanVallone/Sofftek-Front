import React from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../Userdash/Userdash.scss'
import CategoryModal from './CategoryModal';
import { deleteCategory, updateCategory } from "../../../redux/actions/indexActions";
import { useDispatch } from "react-redux";

const Categorydash = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/category/list');
        setCategoryList(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const handleDelete = async (idCategory,category) => { 
    await dispatch(deleteCategory(idCategory,category))
    setCategoryList(categoryList.filter((c) => c.category !== category));
 }

  const handleEdit = () => { /*dispatch(updateCategory()) */}

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
                <td>{c.idCategory}</td>
                <td>{c.category}</td>
                <td>
                  <button className='btn btn-primary m-1' onClick={() => handleDelete(c.idCategory,c.category)}>Delete</button>
                  <button className='btn btn-primary m-1' onClick={handleEdit}>Edit</button>
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