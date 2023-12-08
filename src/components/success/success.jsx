import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import zlib from "zlibjs";

export const Success = () => {
  const location = useLocation();
  const [mensajeComprimido, setMensajeComprimido] = useState(null);

  useEffect(() => {
    // Obtén el valor del parámetro 'mensaje' de la cadena de consulta
    const mensajeComprimido = new URLSearchParams(location.search).get(
      "mensaje"
    );

    if (mensajeComprimido) {
      console.log("recibi el contenido del mensaje!!!!!");
      setMensajeComprimido(mensajeComprimido);
    }
  }, [location.search]);

  return (
    <div>
      <h1>Mensaje comprimido:</h1>
      {mensajeComprimido && <pre>{mensajeComprimido}</pre>}
    </div>
  );
};
