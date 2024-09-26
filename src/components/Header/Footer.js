import React from 'react'
import './header.css'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFacebook, faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
  return (
    <footer class="footer">
         <div className="creators">
        Creadores: Tobias Zaselsky, Facundo Yuzefoff, Julian Wegman
      </div>
      <div className="social-icons">
        <a href="https://ar.linkedin.com/">
        <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </a>
        <a href="https://ar.linkedin.com/">
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
        </a>
        <a href="https://ar.linkedin.com/">
        <FontAwesomeIcon icon="fa-brands fa-instagram" />
        </a>
      </div>
      <div className="copyright">
        &copy; 2024 EFSI
      </div>
    </footer>
  )
}

export default Footer