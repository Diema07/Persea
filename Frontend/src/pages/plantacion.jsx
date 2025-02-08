import { useForm } from 'react-hook-form';
import { createTask } from '../api/plantaciones.api';
import axios from 'axios';

export function Taskform() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        console.log('Datos enviados:', data);
        try {
            // Obtener el token de autenticación (por ejemplo, desde localStorage)
            const token = localStorage.getItem('token');

            // Configurar axios para incluir el token en el encabezado
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Enviar la solicitud con el token de autenticación
            await createTask(data, config);
        } catch (error) {
            console.error('Error al crear la plantación:', error);
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Nombre de tu parcela</h2>
                <input
                    type="text"
                    placeholder="nombre"
                    {...register("nombre", { required: true })}
                />
                {errors.nombre && <span>Requerido</span>}
                <button>Crear</button>
            </form>
        </div>
    );
}