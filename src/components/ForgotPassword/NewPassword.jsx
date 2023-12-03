import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {resetPassword} from '../../redux/actions/indexActions';

export const NewPassword = () => {
  const dispatch = useDispatch();
  const [resetData, setResetData] = useState({
    resetToken: '',
    password: ''
  });
  let data = window.location.toString().split("/");
  let resetToken = data[5];

  useEffect(() => {
    setResetData(prevData => ({ ...prevData, resetToken }));
  }, [resetToken]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setResetData(prevData => ({ ...prevData, password }));
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
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={resetData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
