import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import UserModal from './UserModal';
import './Userdash.scss';
import { useSelector, useDispatch } from "react-redux";

const Userdash = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [modal, setModal] = useState(false);

  const handleUpdate = () => {console.log("update")}

  const [userId, setUserId] = useState();

  const handleClick = (id) => {
    setModal(true);
    setUserId(id);
  }



  return (
    <div>
      <div>
        <h1>Users List</h1>
      </div>
      <div className='text-end'>
        <button className='btn btn-primary m-1 text-start ' onClick={handleClick}>Add New Admin</button>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, idx) => {
            return (
              <tr key={idx}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.roles[0].name}</td>
                <td>
                  <button onClick={handleUpdate} ><i className="fa fa-trash" aria-hidden="true"></i>Update</button>
                </td>
              </tr>)
          })}
        </tbody>
      </Table>
      <UserModal modal={modal} setModal={setModal} user={userId} />
    </div>
  );
}

export default Userdash