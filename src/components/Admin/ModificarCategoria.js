import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"

const ModificarCategorias = ({setTicker,ticker,hidden,idCategoria}) => {
    const [nombre,setNombre]=useState("")
    const [displayOrder,setDisplayOrder]=useState("")
    const [cargando,setCargando]=useState(true)

    useEffect(()=>{
        async function getData(){
            const res1=await axios.get("/api/event-category/"+idCategoria)
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
        setTicker(ticker+1)
    }
    async function updateData(category){
        const config={
            headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
          }
        category.id=idCategoria;
        try {
            await axios.put("/api/event-category",category,config)
            alert("ACTUALIZADO")
        } catch (error) {
            alert(error.message)
        }
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
        </div>
        <button onClick={handleSumbit}>update</button>
    </div>
  )
}

export default ModificarCategorias