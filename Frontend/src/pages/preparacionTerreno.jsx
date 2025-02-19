import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getPreparacionByPlantacionId,} from '../api/preparacionTerreno.api';
import { PreparacionTerrenoForm } from '../components/preparacionTerrenoForm';

export function PreparacionTerrenoPage() {
  const { idPlantacion } = useParams();  // Asume la URL: /preparacion/:idPlantacion
  const [preparaciones, setPreparaciones] = useState([]);

  // Cargar las preparaciones existentes
  const loadPreparaciones = async () => {
    try {
      const response = await getPreparacionByPlantacionId(idPlantacion);
      setPreparaciones(response.data);
    } catch (error) {
      console.error('Error al obtener preparaciones:', error);
    }
  };

  useEffect(() => {
    if (idPlantacion) {
      loadPreparaciones();
    }
  }, [idPlantacion]);

  return (
    <div>
      <h2>Preparación de Terreno - Plantación {idPlantacion}</h2>

      {/* Formulario con checkboxes y fechas automáticas */}
      <PreparacionTerrenoForm
        idPlantacion={idPlantacion}
        onCreated={loadPreparaciones}
      />

      {/* Listado de preparaciones (historial) */}
      <h3>Historial de Preparaciones:</h3>
      {preparaciones.length === 0 ? (
        <p>No hay preparaciones registradas.</p>
      ) : (
        <ul>
          {preparaciones.map((prep) => (
            <li key={prep.id}>
              <strong>ID:</strong> {prep.id} <br />
              <strong>Limpieza:</strong> {prep.limpiezaTerreno || 'No definida'} <br />
              <strong>Análisis:</strong> {prep.analisisSuelo || 'No definido'} <br />
              <strong>Corrección:</strong> {prep.correcionSuelo || 'No definida'} <br />
              <strong>Labranza:</strong> {prep.labranza || 'No definida'} <br />
              <strong>Delimitación:</strong> {prep.delimitacionParcela || 0} m²
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
