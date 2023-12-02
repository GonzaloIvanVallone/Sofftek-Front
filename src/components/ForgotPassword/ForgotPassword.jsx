import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../redux/actions/indexActions";

export const ForgotPassword=()=> {
    const dispatch = useDispatch();
    const [emailData, setEmailData] = useState('');

    const handleOnChange = (e) => {
        setEmailData(e.target.value );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(emailData){
        dispatch(sendEmail(emailData));
        setEmailData('');
        }else{
            console.log("error")
        }
    }

  return (
    <div>
        <h1>Forgot Password?</h1>
        <h4>give us your email to help you!</h4>
        <input type="email" name="email" placeholder="your email" value={emailData.email} onChange={(e) => handleOnChange(e)}/>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Send</button>
    </div>)
}