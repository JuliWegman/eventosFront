import React, {useState} from "react";
import {faMusic, faFutbol, faPeopleGroup, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./eventos.css"

const Evento = ({key,nombre,descripcion,categoria,lugar,precio}) => {

    const [categoriaIcon, setCategoriaIcon] = useState([faCircleQuestion])

    switch (categoria) {
        case "musica":
            setCategoriaIcon(faMusic)
            break;

        case "deportes":
        setCategoriaIcon(faFutbol)
        break;

        case "social":
            setCategoriaIcon(faPeopleGroup)
            break;

        default:
            break;
    }

    return(
        <div className="evento">
            <div className="evento__header">
                <h2 className="evento__titulo">{nombre}</h2>
                <FontAwesomeIcon icon={categoriaIcon} className='header__icono'/>

            </div>
            <div className="evento__body">
                <div className="evento__info">
                    <h3 className="evento__descripcion">{descripcion}</h3>
                    <h4 className="evento__lugar">{lugar}</h4>
                </div>

                <h4 className="evento__precio">{precio}</h4>

            </div>
        </div>
    )
}

export default Evento

