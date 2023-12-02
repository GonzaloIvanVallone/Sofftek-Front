import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {resetPassword} from '../../redux/actions/indexActions';

export const NewPassword = () => {
    const dispatch = useDispatch();
    const [resetData, setResetData] = useState({
        token: '',
        newPassword: ''
    });
    let data = window.location.toString().split("/");
    console.log(data)
    //let token = data[5];

    useEffect(() => {
    }, []); 

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setResetData(prevData => ({ ...prevData, newPassword }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(resetData));
    };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={resetData.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};