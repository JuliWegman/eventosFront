import React,{useEffect,useState} from 'react'
import axios from 'axios'


const Eventos = () => {
    const [eventos,setEventos]=useState([""])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        async function getData(){
            const res1=await axios.get('/api/event?limit=5&offset=0')
            setEventos(res1.data.collection)
        }


        getData()
        setLoading(false)
    })
    if (loading) {
        return null
    }

  return (
    <div>Eventos</div>
  )
}

export default Eventos