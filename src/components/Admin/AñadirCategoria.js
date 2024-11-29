import React, { useState } from "react";
import axios from "axios";
import "../Eventos/form.css"; // Asegúrate de que la ruta sea correcta.

const AñadirCategoria = () => {
  const [formData, setFormData] = useState({
    name: "",
    displayOrder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.displayOrder) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const categoryData = {
      ...formData,
      displayOrder: parseInt(formData.displayOrder, 10),
    };

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      axios.post("/api/event-category/", categoryData, config);
      alert("Categoría enviada con éxito");
    } catch (error) {
      console.error("Error al enviar la categoría:", error);
      alert("Ocurrió un error al enviar la categoría.");
    }

    setFormData({ name: "", displayOrder: "" });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__titulo">Crear Categoría</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre de la Categoría:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="displayOrder">Orden de Visualización:</label>
          <input
            type="number"
            id="displayOrder"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="button__login">
          Crear Categoría
        </button>
      </form>
    </div>
  );
};

export default AñadirCategoria;
