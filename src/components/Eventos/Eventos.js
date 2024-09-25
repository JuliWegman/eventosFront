import React,{useEffect,useState} from 'react'
import axios from 'axios'


const Eventos = ({eventos,loading,token}) => {
    
    if (loading) {
        return null
    }

  return (
    <div>{token}</div>
  )
}

export default Eventos