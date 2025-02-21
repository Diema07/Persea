import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMantenimientoByPlantacionId } from '../api/mantenimientoMonitoreo.api';
import { MantenimientoMonitoreoForm } from '../components/mantenimientoMonitoreoForm';

export function MantenimientoMonitoreoPage() {
  const { idPlantacion } = useParams();
  const [mantenimientos, setMantenimientos] = useState([]);

  // Carga los mantenimientos existentes
  const loadMantenimientos = async () => {
    try {
      const response = await getMantenimientoByPlantacionId(idPlantacion);
      // Suponiendo que tu API retorna algo como response.data
      setMantenimientos(response.data || []);
    } catch (error) {
      console.error('Error al obtener mantenimientos:', error);
    }
  };

  useEffect(() => {
    if (idPlantacion) {
      loadMantenimientos();
    }
  }, [idPlantacion]);

  return (
    <div>
      <h2>Mantenimiento/Monitoreo - Plantación {idPlantacion}</h2>

      {/* Formulario con checkboxes y fechas automáticas */}
      <MantenimientoMonitoreoForm
        idPlantacion={idPlantacion}
        onCreated={loadMantenimientos}
      />

      {/* Listado de mantenimientos (historial) */}
      <h3>Historial de Mantenimientos:</h3>
      {mantenimientos.length === 0 ? (
        <p>No hay mantenimientos registrados.</p>
      ) : (
        <ul>
          {mantenimientos.map((m) => (
            <li key={m.id}>
              <strong>ID:</strong> {m.id} <br />
              <strong>Guadaña:</strong> {m.guadaña || '---'} <br />
              <strong>Necesidad de Árboles:</strong> {m.necesidadArboles || '---'} <br />
              <strong>Tipo Tratamiento:</strong> {m.tipoTratamiento || '---'} <br />
              <strong>Estado Planta:</strong> {m.estadoPlantaTratamiento || '---'} <br />
              <strong>Fecha Aplicación:</strong> {m.fechaAplicacionTratamiento || '---'} <br />
              <strong>Observación Evolución:</strong> {m.observacionEvolucionPlanta || '---'} <br />
              <strong>Fecha Seguimiento:</strong> {m.fechaSeguimiento || '---'} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
