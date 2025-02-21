// src/pages/PodaPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPodaByPlantacionId } from '../api/poda.api';
import { PodaForm } from '../components/podaForm';

export function PodaPage() {
  const { idPlantacion } = useParams();
  const [podas, setPodas] = useState([]);
  const [idPodaEdit, setIdPodaEdit] = useState(null);

  useEffect(() => {
    loadData();
  }, [idPlantacion]);

  const loadData = async () => {
    if (!idPlantacion) return;
    try {
      const data = await getPodaByPlantacionId(idPlantacion);
      setPodas(data || []);
    } catch (error) {
      console.error('Error al obtener Poda:', error);
    }
  };

  // Cuando se guarde un registro, recargamos la lista y cerramos el form
  const handleUpdated = () => {
    loadData();
    setIdPodaEdit(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Poda - Plantación {idPlantacion}</h2>

      {podas.length === 0 ? (
        <p>No hay registros de Poda.</p>
      ) : (
        <ul>
          {podas.map((p) => (
            <li key={p.id} style={{ marginBottom: '12px' }}>
              <p><strong>ID:</strong> {p.id}</p>
              <p><strong>Tipo de Poda:</strong> {p.tipoPoda}</p>
              <p><strong>Herramientas Usadas:</strong> {p.herramientasUsadas}</p>
              <p><strong>Técnicas Usadas:</strong> {p.tecnicasUsadas}</p>
              <p><strong>Fecha de Poda:</strong> {p.fechaPoda || '---'}</p>
              <button onClick={() => setIdPodaEdit(p.id)}>
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Si se selecciona un registro para editar, muestra el formulario */}
      {idPodaEdit && (
        <PodaForm
          idPoda={idPodaEdit}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
