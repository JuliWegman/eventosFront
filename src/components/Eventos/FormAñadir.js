import React, { useState,useEffect } from 'react';
import './form.css';
import axios from 'axios';

const EventForm = () => {
    const [nombreEvento, setNombreEvento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState(1);
    const [fecha, setFecha] = useState('');
    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');
    const [habilitado, setHabilitado] = useState(false);
    const [asistenciaMaxima, setAsistenciaMaxima] = useState('');
    const [categorias,setCategorias]=useState([""])
    const [cargando,setCargando]=useState(true)
    const [localidades,setLocalidades]=useState([""])
    const [localidad,setLocalidad]=useState(1)

    useEffect(()=>{
        async function getData() {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
              };
            const res1 = await axios.get("/api/event-category?limit=4&offset=0",config);
            const res2=await axios.get("/api/event-location/todos?limit=4&offset=0",config)
            setCategorias(res1.data.Colection);
            setLocalidades(res2.data.Colection)
            setCargando(false);
            console.log(localidades);
        }
        getData();
        
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();



        const config={
            headers : {Authorization :  `Bearer ${localStorage.getItem("token")}`} 
          }
        try {
            console.log(categoria);
            await axios.post("/api/event", {
                name: nombreEvento,
                description: descripcion,
                id_event_category: categoria,
                id_event_location: categoria,
                start_date: fecha,
                duration_in_minutes: duracion ,
                price:precio,
                enabled_for_enrollment:habilitado,
                max_assistance:asistenciaMaxima
            },config)
        } catch (error) {
            console.log(error);
            alert(error)
        }
            

    };
    if (cargando) {
        return null
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className='form__titulo'>Crear Evento</h2>
                <div className="form-group">
                    <label htmlFor="nombreEvento">Nombre del Evento:</label>
                    <input
                        type="text"
                        id="nombreEvento"
                        value={nombreEvento}
                        onChange={(e) => setNombreEvento(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select onChange={(e)=>{setCategoria(e.target.value);console.log(categoria);}}>
                        {categorias.map(categoria =>
                            <option value={categoria.id}>{categoria.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Localidad:</label>
                    <select onChange={(e)=>{setLocalidad(e.target.value);console.log(localidad);}}>
                        {localidades.map(loc =>
                            <option value={loc.id}>{loc.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duracion">Duración (en minutos):</label>
                    <input
                        type="number"
                        id="duracion"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="habilitado">Habilitado para anotarse:</label>
                    <input
                        type="checkbox"
                        id="habilitado"
                        checked={habilitado}
                        onChange={(e) => setHabilitado(e.target.checked)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="asistenciaMaxima">Asistencia Máxima:</label>
                    <input
                        type="number"
                        id="asistenciaMaxima"
                        value={asistenciaMaxima}
                        onChange={(e) => setAsistenciaMaxima(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button__login">Crear Evento</button>
            </form>
        </div>
    );
};

export default EventForm;
