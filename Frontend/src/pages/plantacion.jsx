import { useForm } from 'react-hook-form';
import { createTask } from '../api/plantaciones.api';
import { useState } from 'react'; // Importar useState para manejar errores

export function Taskform() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(null); // Estado para mensajes de error

    const onSubmit = handleSubmit(async (data) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Datos enviados:', data);
            
            if (!token) {
                throw new Error('No hay token de autenticación. Por favor inicia sesión nuevamente.');
            }

            // Cambiar el nombre del campo a 'nombreParcela' que espera el backend
            const formattedData = {
                nombreParcela: data.nombre
            };

            const response = await createTask(formattedData, {
                headers: { 
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Plantación creada:', response.data);
            setErrorMessage(null); // Limpiar mensajes de error si tiene éxito
            
            // Redirigir o actualizar la lista después de crear
            window.location.href = '/inicio-plantacion';
            
        } catch (error) {
            console.error('Error al crear la plantación:', error);
            setErrorMessage(
                error.response?.data?.detail || 
                error.message || 
                'Error al crear la plantación. Por favor intenta nuevamente.'
            );
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Nombre de tu parcela</h2>
                <input
                    type="text"
                    placeholder="Nombre de la parcela"
                    {...register("nombre", { 
                        required: "Este campo es obligatorio",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres"
                        }
                    })}
                />
                {errors.nombre && <span style={{color: 'red'}}>{errors.nombre.message}</span>}
                
                <button type="submit">Crear</button>
                
                {errorMessage && (
                    <div style={{color: 'red', marginTop: '10px'}}>
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
}