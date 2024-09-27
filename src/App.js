import {useState,useEffect} from "react"
import './App.css';
import Eventos from "./components/Eventos/Eventos";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer";
import axios from "axios";
import Login from "./components/login/login.js"
import Registro from "./components/login/Registro.js";



import {
  BrowserRouter as Router, Route, Routes  
} from "react-router-dom";

async function register(email,password,nombre,apellido){
  await axios.post("/api/user/register",{
    "first_name":nombre,
    "last_name":apellido,
    "username":email,
    "password":password
  })
}








function App() {
  const [eventos,setEventos]=useState([""])
  const [cargando,setCargando]=useState(true)
  const [user,setUser]=useState({})
  const [mensaje,setMensaje]=useState("")
  useEffect(()=>{
    async function getData(){
      const res1=await axios.get("/api/event?limit=5&offset=0")
      setEventos(res1.data.Colection)
      setCargando(false)

    }
    getData()
    console.log(eventos);




  },[])

  async function login(email,password){
    try {
      const res= await axios.post("/api/user/login",{
        "username":email,
        "password":password
      })
      localStorage.setItem("token",res.data.token)
      return true
  
    } catch (error) {
      setMensaje("Usuario o contraseña incorrectos")
      setInterval(()=>{setMensaje("")},2500)
      return false
    }
  }

  async function getUser(){
    const config={
      headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
    }
    try {
      const res=await axios.get("/api/user",config)
      console.log(res.data);
      setUser(res.data)
    } catch (error) {
      console.log(error);
    }
  
  }

  if (cargando) {
    return null
    
  }
  return (
      <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={                  
                  <Login onLogin={login} mensaje={mensaje}/>
                }></Route>
                <Route path="/registro" element={
                  <Registro onRegistro={register}/>
                }></Route>
                <Route path="/home" element={
                  <>
                  <Header getUsuario={getUser} usuario={user} setUsuario={setUser}/>
                  <Eventos eventos={eventos} loading={cargando} />
                  <Footer/>
                  </>
                }></Route>


              </Routes>
            </div>

      </Router>
  );
}

export default App;
