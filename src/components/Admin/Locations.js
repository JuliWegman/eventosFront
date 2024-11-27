import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"
import "./Admin.css"
import ModificarLocation from "./ModificarLocation"

const Locations = () => {
    const [locations,setLocations]=useState([""]);
    const [cargando,setCargando]=useState(true);
    const [idCategoria,setIdCategoria]= useState();
    const [hidden, setHidden] = useState(true)

    useEffect(()=>{
        async function getData(){
            const config={
                headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
              }
            const res=await axios.get("/api/event-location/todos?limit=10",config)
            console.log(res.data.Colection);
            setLocations(res.data.Colection);
        }
        getData()
        setCargando(false)
    },[])
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
                    <button className='boton__eliminar'> Eliminar </button>
                    <button onClick={() => setHidden(!hidden)} className='boton__modificar'> Modificar </button>
                    </div>
                </div>)
        }

    <ModificarLocation hidden={hidden} idCategoria={idCategoria}/>

    </div>
  )
}

export default Locations