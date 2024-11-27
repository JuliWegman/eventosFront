import React,{useEffect,useState} from 'react'
import Categorias from './Categorias'
import Locations from './Locations'

const Admin = () => {

  return (
    <div className='eventos__body'>
    <h1>Admin</h1>
    <div className='eventos'>
    <Categorias/>
    <Locations/>
    </div>

</div>
  )
}

export default Admin