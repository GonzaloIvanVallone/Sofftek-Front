import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import UserModal from './UserModal';
import './Userdash.scss';

const Userdash = () => {
  const [user, setUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);

  const handleDelete = () => {console.log("delete")}

  const handleBlock=()=>{console.log("block")}

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
        <button className='btn btn-primary m-1 text-start ' onClick={handleClick}>Add New Users</button>
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
          {userList.map((user, idx) => {
            return (
              <tr key={idx}>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><button onClick={handleDelete} ><i className="fa fa-trash" aria-hidden="true"></i></button>
                  <button onClick={handleBlock}><i className="fa fa-lock" aria-hidden="true"></i></button>
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