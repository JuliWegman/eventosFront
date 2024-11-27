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

    useEffect(()=>{
        async function getData(){
            const res=await axios.get("/api/event-category?limit=10")
            console.log(res.data.Colection);
            setCategorias(res.data.Colection);
        }
        getData()
        setCargando(false)
    },[])
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
                    <button className='boton__eliminar'> Eliminar </button>
                    <button className='boton__modificar' onClick={()=>{setIdCategoria(cat.id);setHidden(!hidden);}}> Modificar </button>
                    </div>
                </div>)

        }
        <ModificarCategorias hidden={hidden} idCategoria={idCategoria}/>
    </div>
  )
}

export default Categorias