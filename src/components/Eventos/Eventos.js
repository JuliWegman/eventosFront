import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Evento from './Evento'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'


const Eventos = ({eventos,loading}) => {
    
  async function inscribirse(a){
    const config={
      headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
    }
      try {
        console.log(localStorage.getItem("token"));
        const res=await axios.post("/api/event/"+a+"/enrollment",null,config)
        alert("Anotado!")
      } catch (error) {
        alert(error.response.data);
      }

    }

    if (loading) {
        return null
    }
    
  return (
    <div className='eventos__body'>
    <h1>Eventos Disponibles</h1>
    <div className='eventos'>
    {eventos.map((evento)=> (
        <Evento id={evento.id} nombre={evento.name} descripcion={evento.description} categoria={evento.category} lugar={evento.location} precio={evento.price} inscribirse={inscribirse}/>
    ))}
    </div>

    <Link to="/añadir">+</Link>
</div>
  )
}

export default Eventos