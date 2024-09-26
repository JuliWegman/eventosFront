import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Evento from './Evento'


const Eventos = ({eventos,loading}) => {


    if (loading) {
        return null
    }
    
  return (
    <div className='eventos__body'>
    <h1>Eventos Disponibles</h1>
    <div className='eventos'>
    {eventos.map(evento => (
        <Evento key={evento.id} nombre={evento.name} descripcion={evento.description} categoria={evento.category} lugar={evento.location} precio={evento.price}/>
    ))}
    </div>
</div>
  )
}

export default Eventos