import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { resetPassword } from '../../redux/actions/indexActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom'

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
    if (!resetData.password || resetData.password.length < 8) {
      Swal.fire({
        title: "INVALID PASSWORD",
        text: `Must contain atleast 8 characters. Please try again`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }else{
      Swal.fire({
        title: "SUCCESS",
        text: `Password updated successfully`,
        icon: "success",
        confirmButtonText: "Continue",
      });
    }
    dispatch(resetPassword(resetData));
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  };
  

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">
          Set your new Password! 
          </h1>
          <form>
            <div className="form-group">
              <label htmlFor="password" className="input-title">
              <p className="input-title">New Password:</p>
              </label>
              <InputGroup className="input mb-3">
                <Form.Control
                  type="password"
                  id="password"
                  placeholder='Must contain atleast 8 characters'
                  value={resetData.password}
                  onChange={handlePasswordChange}
                  required
                />
              </InputGroup>
              <button type="submit" className="btn btn-send" onClick={handleSubmit}>
              Reset Password <FontAwesomeIcon icon={faKey} className="mr-2 key-icon" />
            </button>
            </div>
          </form>
          <div class="card-footer text-muted">
          <Link to="/" className='link-redirect'>@HardTek</Link>
        </div>
        </div>
      </div>
    </div>
  );
};


