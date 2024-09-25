import React from 'react'
import { useState } from "react";
import "./Login.css"; // Para agregar algunos estilos básicos
import Registro from "./Registro.js";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podes llamar a tu lógica de autenticación
    console.log(email,password);
    onLogin( email,password );
    navigate("/home")
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
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
        <button type="submit" className="login-button">Entrar</button>
        <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </form>
    </div>
  );
}

export default Login;