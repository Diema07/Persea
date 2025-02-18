import React, { useEffect, useState } from 'react';
import { getPreparacionByPlantacionId } from '../api/preparacionTerreno.api';
import { PreparacionTerrenoCard } from './PreparacionTerrenoCard';

export function PreparacionTerrenoLista({ idPlantacion }) {
    const [preparaciones, setPreparaciones] = useState([]);

    useEffect(() => {
        const fetchpreparaciones = async () => {
            try {
                const response = await getPreparacionByPlantacionId(idPlantacion);
                setPreparaciones(response.data);
            } catch (error) {
                console.error('Error al obtener la preparación de terreno:', error);
            }
        };

        if (idPlantacion) {
            fetchpreparaciones();
        }
    }, [idPlantacion]);

    return (
        <div>
            <h3>Preparación de Terreno</h3>
            {preparaciones.length === 0 ? (
                <p>No hay preparaciones registradas.</p>
            ) : (
                <ul>
                    {preparaciones.map((preparacion) => (
                        <PreparacionTerrenoCard key={preparacion.id} preparacion={preparacion} />
                    ))}
                </ul>
            )}
        </div>
    );
}

