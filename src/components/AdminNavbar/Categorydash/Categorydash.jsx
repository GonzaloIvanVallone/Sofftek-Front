import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../Userdash/Userdash.scss";
import CategoryModal from "./CategoryModal";
import { deleteCategory } from "../../../redux/actions/indexActions";
import { useSelector, useDispatch } from "react-redux";

const Categorydash = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.allCategories);
  const [modal, setModal] = useState(false);
  const [categoryId, setCategoryId] = useState();

  const handleDelete = async (idCategory, category) => {
    await dispatch(deleteCategory(idCategory, category));
    setCategoryList(categoryList.filter((c) => c.category !== category));
  };

  const handleEdit = (category) => {
    setModal(true);
    console.log(category);
    setCategoryId(category);
  };

  const handleClick = (category) => {
    setModal(true);
    setCategoryId();
  };

  return (
    <div>
      <div>
        <h1>Category List</h1>
      </div>
      <div className="text-end">
        <button
          className="btn btn-primary m-1 text-start "
          onClick={() => handleClick({})}
        >
          Add New Category
        </button>
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
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => handleDelete(c.idCategory, c.category)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => handleEdit(c)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CategoryModal
        modal={modal}
        setModal={setModal}
        categoryGive={categoryId}
      />
    </div>
  );
};

export default Categorydash;
