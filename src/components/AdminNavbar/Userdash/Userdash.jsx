import React, { useState } from "react";
import { Table } from "react-bootstrap";
import UserModal from "./UserModal";
import "./Userdash.scss";
import { useSelector, useDispatch } from "react-redux";
import { upDownUser } from "../../../redux/actions/indexActions";

const Userdash = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();

  const handleClick = () => {
    setModal(true);
    setUserId();
  };

  const handleUpdateUser = (user) => {
    console.log(user);
    setModal(true);
    setUserId(user);
  };

  const handleUpDownUser = (user) => {
    dispatch(upDownUser(user));
  };

  return (
    <div>
      <div>
        <h1>Users List</h1>
      </div>
      <div className="text-end">
        <button
          className="btn btn-primary m-1 text-start "
          onClick={handleClick}
        >
          Add New Admin
        </button>
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
                  <button onClick={() => handleUpdateUser(user)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>Update
                  </button>
                  <button onClick={() => handleUpDownUser(user)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    Upgrade/DownGrade
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <UserModal modal={modal} setModal={setModal} userGive={userId} />
    </div>
  );
};

export default Userdash;
