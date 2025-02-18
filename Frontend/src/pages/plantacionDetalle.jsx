import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantacionById } from '../api/plantaciones.api';
import { PreparacionTerrenoLista } from '../components/PreparacionTerrenoLista';

export function PlantacionDetalle() {
    const { idPlantacion } = useParams();
    const [plantacion, setPlantacion] = useState(null);

    useEffect(() => {
        const fetchPlantacion = async () => {
            try {
                const response = await getPlantacionById(idPlantacion);
                setPlantacion(response.data);
            } catch (error) {
                console.error('Error al obtener detalles de la plantación:', error);
            }
        };

        fetchPlantacion();
    }, [idPlantacion]);

    if (!plantacion) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{plantacion.nombreParcela}</h1>
            <h2>Preparación del Terreno</h2>
            <PreparacionTerrenoLista idPlantacion={idPlantacion} />
        </div>
    );
}