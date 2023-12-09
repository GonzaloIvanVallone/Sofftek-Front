import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bibSave } from "../../redux/actions/indexActions";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const dispatch = useDispatch();
  const [mensajeComprimido, setMensajeComprimido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMensajeComprimido(localStorage.getItem("formData"));
    console.log(mensajeComprimido);
  }, []);

  const handleGoHome = () => {
    dispatch(bibSave(JSON.parse(localStorage.getItem("formData"))));
    // if(localStorage.getItem("formData").)
    localStorage.removeItem("formData");
    localStorage.removeItem("grouped");
    navigate("/");
  };

  return (
    <div>
      <h1>factura:</h1>
      <p>${mensajeComprimido}</p>
      <button onClick={handleGoHome}>goHome</button>
    </div>
  );
};
