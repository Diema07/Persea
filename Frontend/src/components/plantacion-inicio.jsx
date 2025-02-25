import '../styles/plantacion-inicio.css';
import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/plantaciones.api';
import { Link } from 'react-router-dom';
import { Taskcard } from './plantacion-crear'; 


export function PlantacionInicio() {
    const [plantaciones, setPlantaciones] = useState([]);

    useEffect(() => {
        const fetchPlantaciones = async () => {
            try {
                const response = await getAllTasks();
                setPlantaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las plantaciones:', error);
            }
        };

        fetchPlantaciones();
    }, []);

    return (
        <div className='main'>
          <h2>Mis Plantaciones</h2>
          <Link to="/plantacion" className="omit-button">Crear Plantación</Link>
          <div className="contenedor1">
          <ul>
            {plantaciones.map((plantacion) => (
                <li key={plantacion.id}>
                <Taskcard task={plantacion} />
                </li>
            ))}
          </ul>
          </div>
          
        </div>
      );
      
}