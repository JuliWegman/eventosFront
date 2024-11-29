import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"

const ModificarLocation = ({hidden,id,ticker,setTicker}) => {
    const [localidades,setLocalidades]=useState([""])
    
    const [idLocation,setIdLocation]=useState(0)
    const [name,setName]=useState("")
    const [full_address,setFull_address]=useState("")
    const [max_capacity,setMax_capacity]=useState(0)
    const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)

    const [cargando,setCargando]=useState(true)
    
    const config={
        headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
      }
    useEffect(()=>{
        
        async function getData(){
            const res1=await axios.get("/api/event-location/"+id ,config)
            const res2=await axios.get("/api/location?limit=5",config)
            setLocalidades(res2.data.Colection)
            console.log(res2.data, "Aaaaaaaaaaaaaaaaaaaaaaaaa");
            setIdLocation(res1.data.id_location)
            setName(res1.data.name)
            setFull_address(res1.data.full_address)
            setMax_capacity(res1.data.max_capacity)
            setLatitude(res1.data.latitude)
            setLongitude(res1.data.longitude)
            setCargando(false)
        }

        setCargando(true)
        if (id!=null) {
            getData()
        }

    },[id])

    function handleSumbit(){
        updateData({id_location:idLocation,name,full_address,max_capacity,latitude,longitude})
    }
    async function updateData(location){
        const config={
            headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
          }
          location.id=id;
          try {
            await axios.put("/api/event-location",location,config)
            alert("MODIFICADO")
          } catch (error) {
            console.log(error);
          }
          setTicker(ticker)
    }
    if (cargando) {
        return null;
    }

  return (
    <div className={hidden ? "invisible" : "visible update"}  >
        <h1>lugar</h1> 
        <div className="form-group">
            <label htmlFor="nombreEvento">Nombre:</label>
            <input
                type="text"
                id="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
            />
        </div>
        <div className="form-group">
            <label htmlFor="nombreEvento">localidad:</label>
            <select
                value={idLocation} onChange={(e) => setIdLocation(e.target.value)}>
                {localidades!=null&&
                    localidades.map(loc=>
                    <option value={loc.id}> {loc.name}</option>)
                }
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="nombreEvento">Direccion:</label>
            <input
                type="text"
                id="nombre"
                value={full_address}
                onChange={(e) => setFull_address(e.target.value)}
                
            />
        <div className="form-group">
            <label htmlFor="nombreEvento">Capacidad máxima:</label>
            <input
                type="number"
                id="nombre"
                value={max_capacity}
                onChange={(e) => setMax_capacity(e.target.value)}
                
            />
         </div>
         <div className="form-group">
            <label htmlFor="nombreEvento">Latitud:</label>
            <input
                type="number"
                id="nombre"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                
            />
         </div>
         <div className="form-group">
            <label htmlFor="nombreEvento">Longitud:</label>
            <input
                type="number"
                id="nombre"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                
            />
         </div>
        
        </div>
        <button onClick={handleSumbit}>update</button>
    </div>
  )
}

export default ModificarLocation 
