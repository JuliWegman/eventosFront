import React from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './header.css'

const Header = () => {
  return (
    <header className='header'>
        <h2>Ticket Ahrex</h2>
        <div className='header__usuario'>
            <h4>USUARIO</h4>
            <FontAwesomeIcon icon={faUser}/>
        </div>
    </header>
  )
}

export default Header