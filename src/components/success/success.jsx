import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bibSave } from "../../redux/actions/indexActions";

export const Success = () => {
  const dispatch = useDispatch();
  const [mensajeComprimido, setMensajeComprimido] = useState(null);

  useEffect(() => {
    setMensajeComprimido(localStorage.getItem("formData"));
    dispatch(bibSave());
  }, []);

  return (
    <div>
      <h1>Mensaje comprimido:</h1>
      {mensajeComprimido && <pre>{mensajeComprimido}</pre>}
    </div>
  );
};
