import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Eventos/form.css"; // Asegúrate de que el archivo CSS esté disponible y correctamente importado.

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const AñadirLocation = () => {
  const [formData, setFormData] = useState({
    name: "",
    full_address: "",
    id_location: "",
    latitude: "",
    longitude: "",
    max_capacity: "",
  });
  const [idLocation, setIdLocation] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/location?limit=5", config);
        setLocalidades(res.data.Colection || []);
      } catch (error) {
        console.error("Error al cargar localidades:", error);
      } finally {
        setCargando(false);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.full_address ||
      !idLocation ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.max_capacity
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const locationData = {
      ...formData,
      id_location: idLocation,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      max_capacity: parseInt(formData.max_capacity, 10),
    };

    try {
      await axios.post("/api/event-location/", locationData, config);
      alert("Location enviada con éxito");
      setFormData({
        name: "",
        full_address: "",
        id_location: "",
        latitude: "",
        longitude: "",
        max_capacity: "",
      });
      setIdLocation("");
    } catch (error) {
      console.error("Error al enviar la Location:", error);
      alert("Ocurrió un error al enviar la Location.");
    }
  };

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__titulo">Añadir Location</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
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
          <label htmlFor="full_address">Dirección Completa:</label>
          <input
            type="text"
            id="full_address"
            name="full_address"
            value={formData.full_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_location">ID de la Location:</label>
          <select
            id="id_location"
            name="id_location"
            value={idLocation}
            onChange={(e) => setIdLocation(e.target.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitud:</label>
          <input
            type="number"
            step="0.000001"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitud:</label>
          <input
            type="number"
            step="0.000001"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="max_capacity">Capacidad Máxima:</label>
          <input
            type="number"
            id="max_capacity"
            name="max_capacity"
            value={formData.max_capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="button__login">
          Añadir Location
        </button>
      </form>
    </div>
  );
};

export default AñadirLocation;
