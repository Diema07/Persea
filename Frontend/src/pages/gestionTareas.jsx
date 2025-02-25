import '../styles/gestionTareas.css';
import { Link } from "react-router-dom";

export function GestionTareas() {
  return (
    <div className="contenedor3">
      <ul>
        <li>
          <Link to="/">Preparación del terreno</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Selección y Plantación de árboles</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Riego y Fertilización</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Mantenimiento y Monitoreo</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Poda</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Cosecha</Link>
          <div className="estado"></div>
        </li>
        <li>
          <Link to="/">Postcosecha</Link>
          <div className="sestado"></div>
        </li>
      </ul>
    </div>
  );
}

export default GestionTareas;
