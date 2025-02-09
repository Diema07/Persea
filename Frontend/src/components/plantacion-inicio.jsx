import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/plantaciones.api';
import {  Link } from 'react-router-dom';

export function NombrePlantacion() {
    const [plantaciones, setPlantaciones] = useState([]);

    useEffect(() => {
        const fetchPlantaciones = async () => {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const response = await getAllTasks(config); // Asegúrate que getAllTasks use la config
            setPlantaciones(response.data);
          } catch (error) {
            console.error('Error al obtener plantaciones:', error);
          }
        };
      
        fetchPlantaciones();
      }, []);

    return (
        <div>
            <h2>Mis Plantaciones</h2>
            <ul>
                {plantaciones.map((plantacion) => (
                        <li key={plantacion.id}>{plantacion.nombreParcela}</li>
                ))}
            </ul>
            <Link to="/plantacion" className="omit-button">Crear Plantación</Link>
        </div>
    );
}

