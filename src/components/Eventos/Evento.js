import React, {useState} from "react";
import {faMusic, faFutbol, faPeopleGroup, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./eventos.css"

const Evento = ({id,nombre,descripcion,lugar,precio,inscribirse}) => {



    return(
        <div className="evento">
            <div className="evento__header">
                <h2 className="evento__titulo">{nombre}</h2>
            </div>
            <div className="evento__body">
                <div className="evento__info">
                    <h3 className="evento__descripcion">{descripcion}</h3>
                    <h4 className="evento__lugar">{lugar}</h4>
                    
                </div>
                <div>
                <h4 className="evento__precio">${precio}</h4>
                <button onClick={()=>{inscribirse(id)}}>inscribirse</button>
                </div>

            </div>
        </div>
    )
}

export default Evento

