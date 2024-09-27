import React from 'react'
import './header.css'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFacebook, faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
  return (
    <footer className="footer">
         <div className="creators">
        Creadores: Tobias Zaselsky, Facundo Yuzefoff, Julian Wegman
      <div className="copyright">
        &copy; 2024 EFSI
      </div>
      </div>
    </footer>
  )
}

export default Footer