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
  let token = data[5];

  useEffect(() => {
    setResetData(prevData => ({ ...prevData, token }));
  }, [token]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setResetData(prevData => ({ ...prevData, newPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(resetData));
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
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
