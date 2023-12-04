import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    const today = new Date();
    if (date && date <= today) {
      alert("Por favor, selecciona una fecha futura.");
      return; // No actualiza el estado si la fecha es menor o igual a la actual
    }
    today.setDate(today.getDate() + 7); // Aumenta 7 días a la fecha de hoy

    // Verifica si la fecha seleccionada es mayor a una semana a la fecha de hoy
    if (date && date > today) {
      console.log("Entre");
      alert("Por favor, selecciona una fecha más cercana.");
      return; // No actualiza el estado si la fecha es mayor a una semana a la fecha de hoy
    }
    setSelectedDate(date);
  };

  return (
    <div>
      <h3>Selecciona una fecha:</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Puedes ajustar el formato según tus necesidades
      />
    </div>
  );
};
