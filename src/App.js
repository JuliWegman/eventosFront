import { useState, useEffect } from "react";
import './App.css';
import Eventos from "./components/Eventos/Eventos";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer";
import axios from "axios";
import Login from "./components/login/login.js";
import Registro from "./components/login/Registro.js";
import Admin from "./components/Admin/Admin.js";
import { UserProvider, useUser } from "./contexts/UserContext.js"; // Asegúrate de importar tu contexto
import {
  BrowserRouter as Router, Route, Routes, Navigate  
} from "react-router-dom";
import FormAñadir from "./components/Eventos/FormAñadir.js";
import AñadirCategoria from "./components/Admin/AñadirCategoria.js";
import AñadirLocation from "./components/Admin/AñadirLocacion.js"

function App() {
  const [eventos, setEventos] = useState([""]);
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getData() {
      const res1 = await axios.get("/api/event?limit=5&offset=0");
      setEventos(res1.data.Colection);
      setCargando(false);
    }
    getData();
  }, []);

  async function getUser() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    try {
      const res = await axios.get("/api/user", config);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (cargando) {
    return null;
  }

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/registro" element={<Registro />} />
            {/* Redirección si no estás autenticado */}
            <Route path="/home" element={<Home getUser={getUser} user={user} setUser={setUser} eventos={eventos} cargando={cargando}/> } />
            <Route path="/añadir" element={<FormAñadir/>}/>
            <Route path="/admin" element={
              <>
                <Header getUsuario={getUser} usuario={user} setUsuario={setUser}/>
                <Admin/>
                <Footer />
              </>
            }/>
            <Route path="/añadirlocacion" element={<AñadirLocation/>}/>
            <Route path="/añadircategoria" element={<AñadirCategoria/>}/>


          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

const Home = ({getUser,user, setUser, eventos, cargando}) => {

  return (
    <>
      <Header getUsuario={getUser} usuario={user} setUsuario={setUser}/>
      <Eventos eventos={eventos} loading={cargando}/>
      <Footer />
    </>
  );
};

export default App;
