import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    province: "",
    locality: "",
    street: "",
    streetNumber: "",
    isApartment: false,
    apartmentNumber: "",
    floorNumber: "",
    selectedDate: null,
  });

  const handleDateChange = (date) => {
    const today = new Date();
    if (date && date <= today) {
      alert("Por favor, selecciona una fecha futura.");
      return;
    }

    today.setDate(today.getDate() + 7);

    if (date && date > today) {
      alert("Por favor, selecciona una fecha más cercana.");
      return;
    }

    // Actualiza el estado del formData
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date ? date.toISOString() : null,
    }));

    // Almacena el formData actualizado en el localStorage
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        selectedDate: date ? date.toISOString() : null,
      })
    );
  };

  return (
    <div>
      <h3>Selecciona una fecha:</h3>
      <DatePicker
        selected={
          formData.selectedDate ? new Date(formData.selectedDate) : null
        }
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Puedes ajustar el formato según tus necesidades
        placeholderText="Haga clic y elija una fecha"
        title="Haga clic y elija una fecha que sea mayor a la de hoy pero no superior a una semana."
      />
    </div>
  );
};
