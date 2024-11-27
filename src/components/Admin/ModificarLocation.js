import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"

const ModificarCategorias = ({hidden,idCategoria}) => {
    const [nombre,setNombre]=useState("")
    const [displayOrder,setDisplayOrder]=useState("")
    const [cargando,setCargando]=useState(true)

    useEffect(()=>{
        async function getData(){
            const res1=await axios.get("/api/event-location/"+idCategoria)
            setNombre(res1.data.name)
            setDisplayOrder(res1.data.display_order)
            setCargando(false)
        }
        if (idCategoria!=null) {
            getData()
        }

    },[idCategoria])

    function handleSumbit(){
        updateData({nombre,displayOrder})
    }
    async function updateData(category){
        await axios.put()
    }

  return (
    <div className={hidden ? "invisible" : "visible update"}  >
        <h1>Categoria</h1> 
        <div className="form-group">
            <label htmlFor="nombreEvento">Nombre de la categoria:</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                
            />
        </div>
        <div className="form-group">
            <label htmlFor="nombreEvento">Orden de mostrado:</label>
            <input
                type="text"
                id="nombre"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                
            />
        <div className="form-group">
            <label htmlFor="nombreEvento">Orden de mostrado:</label>
            <input
                type="text"
                id="nombre"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                
            />
         </div>
         <div className="form-group">
            <label htmlFor="nombreEvento">Nombre de la categoria:</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                
            />
        </div>
        <div className="form-group">
            <label htmlFor="nombreEvento">Orden de mostrado:</label>
            <input
                type="text"
                id="nombre"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                
            />
         </div>
        </div>
        <button onClick={handleSumbit}>update</button>
    </div>
  )
}

export default ModificarCategorias