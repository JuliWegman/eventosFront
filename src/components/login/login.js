import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/UserContext.js'; // Asegúrate de que la ruta sea correcta
import "./Login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login,mensaje } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password); 
    if (success) {
      navigate("/home")
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className='form__titulo'>Iniciar Sesión</h2>
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
        <p className='error'>{mensaje}</p>
        <button type="submit" className="button__login">Entrar</button>
        <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </form>
    </div>
  );
}

export default Login;
