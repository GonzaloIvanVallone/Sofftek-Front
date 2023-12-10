import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../redux/actions/indexActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import "../ForgotPassword/ForgotPassword.scss"
import Swal from "sweetalert2";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link,useNavigate } from 'react-router-dom'


export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formData, setFormData] = useState({ email: '' });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email && emailPattern.test(formData.email)) {
            dispatch(sendEmail(formData.email));
            let inputs = document.querySelectorAll("input");
            inputs.forEach((input) => (input.value = ""));
            setFormData({ email: '' });
            Swal.fire({
                title: "SUCCESS",
                text: `Email sent! Check it to continue`,
                icon: "success",
                confirmButtonText: "Continue",
            });
            navigate('/login');
        } else {
            Swal.fire({
                title: "INVALID EMAIL",
                text: `Invalid email format. Please try again.`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    };


    return (
        <div>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Forgot Password? <FontAwesomeIcon icon={faKey} className="mr-2 key-icon" /></h1>
                        <h4 className="card-subtitle mb-4">Give us your email to help you! </h4>
                        <form>
                            <div className="form-group">
                                <p className="input-title">Email:</p>
                                <InputGroup className="input mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="example@gmail.com"
                                        aria-label="Your Email"
                                        name="email"
                                        maxLength={30}
                                        value={formData.email}
                                        required
                                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </InputGroup>
                                <button type="submit" className="btn btn-send" onClick={handleSubmit}>
                                Send Email <FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            </div>
                        </form>
                        <div className="card-footer">
                        <Link to="/" className='link-redirect-hardtek'>@HardTek</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}