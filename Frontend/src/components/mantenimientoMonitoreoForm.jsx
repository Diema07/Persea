// src/components/MantenimientoMonitoreoForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { patchMantenimientoMonitoreo } from '../api/mantenimientoMonitoreo.api';

export function MantenimientoMonitoreoForm({ mantenimientoId }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Observamos checkboxes para asignar fecha actual o null
  const watchCheckGuadana = watch('checkGuadana');
  const watchCheckAplicacion = watch('checkAplicacion');
  const watchCheckSeguimiento = watch('checkSeguimiento');

  // Cada vez que cambie el checkbox de 'checkGuadana', ponemos la fecha de hoy o null
  useEffect(() => {
    if (watchCheckGuadana) {
      setValue('guadaña', new Date().toISOString().split('T')[0]);
    } else {
      setValue('guadaña', null);
    }
  }, [watchCheckGuadana, setValue]);

  // Cada vez que cambie 'checkAplicacion', asignamos fecha actual o null a 'fechaAplicacionTratamiento'
  useEffect(() => {
    if (watchCheckAplicacion) {
      setValue('fechaAplicacionTratamiento', new Date().toISOString().split('T')[0]);
    } else {
      setValue('fechaAplicacionTratamiento', null);
    }
  }, [watchCheckAplicacion, setValue]);

  // Cada vez que cambie 'checkSeguimiento', asignamos fecha actual o null a 'fechaSeguimiento'
  useEffect(() => {
    if (watchCheckSeguimiento) {
      setValue('fechaSeguimiento', new Date().toISOString().split('T')[0]);
    } else {
      setValue('fechaSeguimiento', null);
    }
  }, [watchCheckSeguimiento, setValue]);

  // Manejo del submit
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Asignamos el ID al objeto data, por si el backend lo requiere
      data.mantenimientoId = mantenimientoId;

      // Realizamos el PATCH con los datos actuales
      await patchMantenimientoMonitoreo(mantenimientoId, data);

      // Recargamos la página (igual que en tu PreparacionTerrenoForm)
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar Mantenimiento/Monitoreo:', error);
    }
  });

  return (
    <div>
      <h3>Agregar Mantenimiento/Monitoreo</h3>
      <form onSubmit={onSubmit}>

        {/* GUADAÑA (checkbox para fecha) */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkGuadana')} />
          <label style={{ marginLeft: '8px' }}>Guadaña (fecha actual si marcas)</label>
          {/* Mostrar la fecha en pantalla si está marcado (opcional) */}
          {watchCheckGuadana && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('guadaña')})
            </span>
          )}
        </div>

        {/* necesidadArboles */}
        <div style={{ marginBottom: '8px' }}>
          <label>Necesidad de Árboles:</label>
          <input
            type="text"
            {...register('necesidadArboles', { required: true })}
            style={{ marginLeft: '8px' }}
          />
          {errors.necesidadArboles && <span style={{ color: 'red' }}>Requerido</span>}
        </div>

        {/* tipoTratamiento */}
        <div style={{ marginBottom: '8px' }}>
          <label>Tipo de Tratamiento:</label>
          <input
            type="text"
            {...register('tipoTratamiento', { required: true })}
            style={{ marginLeft: '8px' }}
          />
          {errors.tipoTratamiento && <span style={{ color: 'red' }}>Requerido</span>}
        </div>

        {/* estadoPlantaTratamiento */}
        <div style={{ marginBottom: '8px' }}>
          <label>Estado de la Planta (Tratamiento):</label>
          <input
            type="text"
            {...register('estadoPlantaTratamiento', { required: true })}
            style={{ marginLeft: '8px' }}
          />
          {errors.estadoPlantaTratamiento && <span style={{ color: 'red' }}>Requerido</span>}
        </div>

        {/* fechaAplicacionTratamiento (checkbox) */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkAplicacion')} />
          <label style={{ marginLeft: '8px' }}>Fecha de Aplicación (hoy si marcas)</label>
          {watchCheckAplicacion && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('fechaAplicacionTratamiento')})
            </span>
          )}
        </div>

        {/* observacionEvolucionPlanta */}
        <div style={{ marginBottom: '8px' }}>
          <label>Observación Evolución de la Planta:</label>
          <input
            type="text"
            {...register('observacionEvolucionPlanta', { required: true })}
            style={{ marginLeft: '8px' }}
          />
          {errors.observacionEvolucionPlanta && <span style={{ color: 'red' }}>Requerido</span>}
        </div>

        {/* fechaSeguimiento (checkbox) */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkSeguimiento')} />
          <label style={{ marginLeft: '8px' }}>Fecha de Seguimiento (hoy si marcas)</label>
          {watchCheckSeguimiento && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('fechaSeguimiento')})
            </span>
          )}
        </div>

        <button style={{ marginTop: '16px' }}>Listo</button>
      </form>
    </div>
  );
}
