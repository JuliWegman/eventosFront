// src/components/Registro.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";


function Registro({ onRegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    onRegistro( email, password, nombre, apellido);

    navigate("/");
  };

  return (
    <div className="Registro-container">
      <form onSubmit={handleSubmit} className="Registro-form">
        <h2 class="form__titulo">Registrarse</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingresa tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button class = "button__login">registrase</button>
        <p>¿Ya tienes una cuenta?<Link to="/"> Login</Link></p>
      </form>
    </div>
  );
}

export default Registro;
