import {useState} from "react"
import './App.css';
import Eventos from "./components/Eventos/Eventos";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer";


function App() {

  const [logueado, setLogueado] = useState(true)

  return (
    <div className="App">
      
        {
          logueado ?
          <Header/>
 
          :
          <>
          <Eventos/>
          <Footer/>
          </>
        }
    </div>
  );
}

export default App;
