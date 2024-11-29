import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Categorias.css"
import ModificarCategorias from './ModificarCategoria'
const Categorias = () => {
    const [categorias,setCategorias]=useState([""]);
    const [cargando,setCargando]=useState(true);
    const [idCategoria,setIdCategoria]=useState();
    const [hidden,setHidden]=useState(true)
    const [ticker,setTicker]=useState(1)


    const eliminar = async (id) => {
        if (id<4) {
            alert("esta categoria no se puede eliminar")
            return 0;
        }
        const config={
            headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
          }
        try {
            await axios.delete("/api/event-category/"+id , config)
            alert("Evento eliminado con exito")
            setTicker(ticker+1)
        } catch (error) {
            console.log(error);
            alert("este evento no se puede eliminar")
        }
        
    }

    useEffect(()=>{
        async function getData(){
            const res=await axios.get("/api/event-category?limit=10")
            setCategorias(res.data.Colection);
        }
        getData()
        setCargando(false)
    },[ticker])
    if (cargando) {
        return ;
    }
  return (
    <div className='Categorias'>
        <h1>Categorias</h1> 
        {categorias.length>0&&
            categorias.map(cat=>
                <div className='cardCategoria'>
                    <h3>{cat.name}</h3>
                    <div className='admin__botones'>
                    <button className='boton__eliminar' onClick={()=>eliminar(cat.id)}> Eliminar </button>
                    <button className='boton__modificar' onClick={()=>{setIdCategoria(cat.id);setHidden(!hidden);}}> Modificar </button>
                    </div>
                </div>)
        }

        <Link to="/añadircategoria" className='eventos__anadir'>Añadir Categoria</Link>


        <ModificarCategorias setTicker={setTicker} ticker={ticker} hidden={hidden} idCategoria={idCategoria}/>
    </div>
  )
}

export default Categorias