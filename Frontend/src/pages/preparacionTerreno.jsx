import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPreparacionByPlantacionId } from '../api/preparacionTerreno.api';

export function Preparacion() {
  const { id } = useParams();
  const [preparaciones, setPreparaciones] = useState([]);

  useEffect(() => {
    async function fetchPreparacion() {
      const response = await getPreparacionByPlantacionId(id);
      setPreparaciones(response.data);
    }
    fetchPreparacion();
  }, [id]);

  return (
    <div>
      <h2>Preparación de Terreno para la Plantación {id}</h2>
      <ul>
        {preparaciones.map((prep) => (
          <li key={prep.id}>{prep.descripcion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Preparacion;