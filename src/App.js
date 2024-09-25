import {useState,useEffect} from "react"
import './App.css';
import Eventos from "./components/Eventos/Eventos";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer";
import axios from "axios";
import Login from "./components/login/Login.js"
import Registro from "./components/login/Registro.js";

import {
  BrowserRouter as Router, Route, Routes, useNavigate, Navigate  
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
  const [logueado, setLogueado] = useState(true)
  const [token,setToken]=useState()



  async function login(email,password){
    console.log(email,password);
    const res= await axios.post("/api/user/login",{
      "username":email,
      "password":password
    })
    setToken(res.data.token)
    console.log(token);
  }




  useEffect(()=>{
    async function getData(){
      const res1=await axios.get("/api/event?limit=5&offset=0")
      setEventos(res1.data.Colection)
      setCargando(false)

    }
    getData()
    console.log(eventos);




  },[])


  if (cargando) {
    return null
    
  }
  return (
      <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={
                  <Login onLogin={(email,password)=>{setCargando(true);login(email,password);setCargando(false);}}/>
                }></Route>
                <Route path="/registro" element={
                  <Registro onRegistro={register}/>
                }></Route>

                <Route path="/home" element={
                  <Eventos eventos={eventos} loading={cargando} token={token}/>
                }></Route>


              </Routes>
            </div>

      </Router>




        //  {
        //   logueado ?
        //   <Login/>
 
        //   :
        //   <>
        //   <Eventos/>
        //   <Footer/>
        //   </>
        // } 
  );
}

export default App;
