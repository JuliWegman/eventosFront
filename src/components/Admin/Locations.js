import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"
import "./Admin.css"
import ModificarLocation from "./ModificarLocation"

const Locations = () => {
    const [locations,setLocations]=useState([""]);
    const [cargando,setCargando]=useState(true);
    const [idLocation,setIdLocation]= useState();
    const [hidden, setHidden] = useState(true)
    const [ticker,setTicker]=useState(1)

    const eliminar = async (id) => {
        if (id<2) {
            alert("esta localidad no se puede eliminar")
            return 0;
        }
        try {
            const res = await axios.delete("/api/event-location/"+id)
            alert("Evento eliminado con exito")
            setTicker(ticker+1)
        } catch (error) {
            console.log(error);
            alert("este evento no se puede eliminar")
        }
        
    }

    useEffect(()=>{
        async function getData(){
            const config={
                headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
              }
            const res=await axios.get("/api/event-location/todos?limit=10",config)
            setLocations(res.data.Colection);
        }
        getData()
        setCargando(false)
    },[ticker])
    if (cargando) {
        return ;
    }
  return (
    <div className='locations'>
        <h1>Locations</h1> 
        {locations.length>0&&
            locations.map(loc=>
                <div className='cardCategoria'>
                    <h3>{loc.name}</h3>
                    <div className='admin__botones'>
                    <button onClick={() => eliminar(loc.id)} className='boton__eliminar'> Eliminar </button>
                    <button onClick={() => {setIdLocation(loc.id);setHidden(!hidden)}} className='boton__modificar'> Modificar </button>
                    </div>
                </div>)
        }
        <Link to="/añadirlocacion" className='eventos__anadir'>Añadir Locacion</Link>


    <ModificarLocation ticker={ticker} setTicker={setTicker} hidden={hidden} id={idLocation}/>

    </div>
  )
}

export default Locations