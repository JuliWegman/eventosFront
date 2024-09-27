import React,{useEffect,useState} from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router-dom'

import './header.css'

const Header = ({getUsuario,usuario,setUsuario}) => {
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate()

  function logOut(){
    localStorage.removeItem("token")
    setUsuario(null)
    navigate("/")
  }
  useEffect(()=>{
    async function getData(){
      await getUsuario()
      setLoading(false)

    }

    getData()
    console.log(localStorage.getItem("user")+"aaaa");

  },[])

  if (loading) {
    return null
    
  }

  return (
    <header className='header'>
        <h2 className='header__titulo'>Ticket Ahrex</h2>
        <div className='header__info'>
          <div className='header__user'>
            <h4 className='header__usuario'>{usuario.first_name} {usuario.last_name}</h4>
            <FontAwesomeIcon icon={faUser} className='header__icono'/>
            </div>
            <button className='header__logout' onClick={logOut}>Cerrar Sesión</button>
        </div>
    </header>
  )
}

export default Header