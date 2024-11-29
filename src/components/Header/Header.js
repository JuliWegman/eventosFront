import React,{useEffect,useState} from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate,Link} from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import './header.css'

const Header = ({getUsuario,usuario,setUsuario}) => {
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate()
  const {admins}=useUser()
  function logOut(){
    localStorage.setItem("token",null)
    setUsuario(null)
    navigate("/")
  }
  useEffect(()=>{
    async function getData(){
      await getUsuario()
      setLoading(false)

    }

    getData()

  },[])

  if (loading) {
    return null
    
  }

  return (
    <header className='header'>
      <Link to={"/home"}><h2 className='header__titulo'>Ticket Ahrex</h2></Link>
        
        <div className='header__info'>
          {(admins.filter(admin => admin === usuario.username).length > 0) &&
            <div className='admin'>
              <Link to={"/admin"}>
                <button>ADMINISTRADOR</button>
              </Link>
            </div>
          }
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