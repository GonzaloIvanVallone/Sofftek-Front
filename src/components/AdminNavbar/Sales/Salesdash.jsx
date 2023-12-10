import React from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getAllSales } from '../../../redux/actions/indexActions';

const Userdash = () => {
  const dispatch = useDispatch();
  const allSales = useSelector((state) => state.allSales);
  console.log(allSales)

  const handleUpdate = () => {console.log("update")}


  useEffect(() => {
    dispatch(getAllSales())
}, []);


  return (
    <div>
      <div>
        <h1>Sales List</h1>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Adress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*{allSales.map((sale, idx) => {
            return (
              <tr key={idx}>
                <td>{sale.idBid}</td>
                <td>{sale.user}</td>
                <td>{sale.dir}</td>
                <td>
                  <button onClick={handleUpdate} ><i className="fa fa-trash" aria-hidden="true"></i>Update</button>
                </td>
              </tr>)
          })}*/}
        </tbody>
      </Table>
    </div>
  );
}

export default Userdash