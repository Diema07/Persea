// src/pages/RiegoFertilizacionPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRiegoByPlantacionId } from '../api/riegoFertilizacion.api';
import {RiegoFertilizacionForm} from '../components/riegoFertilizacionForm';

export function RiegoFertilizacionPage() {
  const { idPlantacion } = useParams();
  const [riegoList, setRiegoList] = useState([]);
  const [idRiegoEdit, setIdRiegoEdit] = useState(null);

  useEffect(() => {
    loadData();
  }, [idPlantacion]);

  const loadData = async () => {
    if (!idPlantacion) return;
    try {
      const data = await getRiegoByPlantacionId(idPlantacion);
      setRiegoList(data || []);
    } catch (error) {
      console.error('Error al obtener Riego/Fertilización:', error);
    }
  };

  // Cuando se guarde un registro, recargamos y cerramos el formulario
  const handleUpdated = () => {
    loadData();
    setIdRiegoEdit(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Riego y Fertilización - Plantación {idPlantacion}</h2>

      {riegoList.length === 0 ? (
        <p>No hay registros de Riego/Fertilización.</p>
      ) : (
        <ul>
          {riegoList.map((r) => (
            <li key={r.id} style={{ marginBottom: '12px' }}>
              <p><strong>ID:</strong> {r.id}</p>
              <p><strong>Tipo de Riego:</strong> {r.tipoRiego}</p>
              <p><strong>Fecha Riego:</strong> {r.fechaRiego || '---'}</p>
              <p><strong>Método Aplicación:</strong> {r.metodoAplicacionFertilizante}</p>
              <p><strong>Tipo Fertilizante:</strong> {r.tipoFertilizante}</p>
              <p><strong>Nombre Fertilizante:</strong> {r.nombreFertilizante}</p>
              <p><strong>Cantidad:</strong> {r.cantidadFertilizante} {r.medidaFertilizante}</p>
              <p><strong>Fecha Fertilizante:</strong> {r.fechaFertilizante || '---'}</p>
              <button onClick={() => setIdRiegoEdit(r.id)}>
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Si se selecciona un registro para editar, muestra el formulario */}
      {idRiegoEdit && (
        <RiegoFertilizacionForm
          idRiego={idRiegoEdit}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
