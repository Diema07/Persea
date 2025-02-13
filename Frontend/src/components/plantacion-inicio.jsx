import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/plantaciones.api';
import { Link } from 'react-router-dom';
import { Taskcard } from './plantacion-crear'; // <--- Importación faltante


export function NombrePlantacion() {
    const [plantaciones, setPlantaciones] = useState([]);

    useEffect(() => {
        const fetchPlantaciones = async () => {
            try {
                // Ya no necesitas pasar encabezados de autenticación
                const response = await getAllTasks();
                setPlantaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las plantaciones:', error);
            }
        };

        fetchPlantaciones();
    }, []);

    return (
        <div>
            <h2>Mis Plantaciones</h2>
            <ul>
                {plantaciones.map((plantacion) => (
                    <Taskcard key={plantacion.id} task={plantacion} />
                ))}
            </ul>
            <Link to="/plantacion" className="omit-button">Crear Plantación</Link>
        </div>
    );
}
