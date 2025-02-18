import { Link } from 'react-router-dom';

export function Taskcard({ task }) {
    return (
        <div>
            <h1>{task.nombreParcela}</h1>
            <Link to={`/plantacion/${task.id}`} className="view-details">
                Ver detalles
            </Link>
        </div>
    );
}