import { useForm } from 'react-hook-form';
import { createPreparacion } from '../api/preparacionTerreno.api';

export function PreparacionTerrenoForm({ idPlantacion }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            data.idPlantacion = idPlantacion;  // Agregar ID de plantación al formulario
            await createPreparacion(data);
            window.location.reload(); // Recargar para ver los cambios
        } catch (error) {
            console.error('Error al crear la preparación de terreno:', error);
        }
    });

    return (
        <div>
            <h3>Agregar Preparación de Terreno</h3>
            <form onSubmit={onSubmit}>
                <label>Limpieza del terreno:</label>
                <input type="date" {...register("limpiezaTerreno", { required: true })} />
                {errors.limpiezaTerreno && <span>Requerido</span>}

                <label>Análisis de suelo:</label>
                <input type="date" {...register("analisisSuelo", { required: true })} />
                {errors.analisisSuelo && <span>Requerido</span>}

                <label>Corrección de suelo:</label>
                <input type="date" {...register("correcionSuelo", { required: true })} />
                {errors.correcionSuelo && <span>Requerido</span>}

                <label>Labranza:</label>
                <input type="date" {...register("labranza", { required: true })} />
                {errors.labranza && <span>Requerido</span>}

                <label>Delimitación de parcela (m²):</label>
                <input type="number" {...register("delimitacionParcela", { required: true })} />
                {errors.delimitacionParcela && <span>Requerido</span>}

                <button>Registrar</button>
            </form>
        </div>
    );
}
