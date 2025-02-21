// src/components/RiegoFertilizacionForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getRiegoFertilizacionById, patchRiegoFertilizacion } from '../api/riegoFertilizacion.api';

export function RiegoFertilizacionForm({ idRiego, onUpdated }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Observamos checkboxes para asignar fecha actual
  const watchCheckRiego = watch('checkRiego');
  const watchCheckFertilizante = watch('checkFertilizante');

  // Cargar datos existentes
  useEffect(() => {
    async function loadData() {
      if (!idRiego) return;
      try {
        const data = await getRiegoFertilizacionById(idRiego);
        // Llenamos el formulario
        setValue('tipoRiego', data.tipoRiego || '');
        setValue('fechaRiego', data.fechaRiego ? true : null);  // si no usas check, quítalo
        setValue('metodoAplicacionFertilizante', data.metodoAplicacionFertilizante || '');
        setValue('tipoFertilizante', data.tipoFertilizante || '');
        setValue('nombreFertilizante', data.nombreFertilizante || '');
        setValue('cantidadFertilizante', data.cantidadFertilizante || 0);
        setValue('medidaFertilizante', data.medidaFertilizante || '');
        setValue('fechaFertilizante', data.fechaFertilizante ? true : null);
        // Activar checkboxes
        setValue('checkRiego', !!data.fechaRiego);
        setValue('checkFertilizante', !!data.fechaFertilizante);
      } catch (error) {
        console.error('Error al cargar Riego/Fertilización:', error);
      }
    }
    loadData();
  }, [idRiego, setValue]);

  // Convertir checkboxes en fecha actual o null
  useEffect(() => {
    setValue('fechaRiego', watchCheckRiego ? true : null);
  }, [watchCheckRiego, setValue]);

  useEffect(() => {
    setValue('fechaFertilizante', watchCheckFertilizante ? true : null);
  }, [watchCheckFertilizante, setValue]);

  // Al enviar el formulario
  const onSubmit = handleSubmit(async (formData) => {
    try {
      // patchRiegoFertilizacion => envía formData
      await patchRiegoFertilizacion(idRiego, formData);
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error('Error al actualizar Riego/Fertilización:', error);
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '16px' }}>
      <h3>Editar Riego/Fertilización #{idRiego}</h3>

      {/* Tipo de riego */}
      <div style={{ marginBottom: '8px' }}>
        <label>Tipo de Riego:</label>
        <input
          type="text"
          {...register('tipoRiego', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.tipoRiego && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Fecha de Riego (checkbox) */}
      <div style={{ marginBottom: '8px' }}>
        <input type="checkbox" {...register('checkRiego')} />
        <label style={{ marginLeft: '8px' }}>
          Fecha de Riego (Se asigna hoy si marcas)
        </label>
      </div>

      {/* Método de Aplicación */}
      <div style={{ marginBottom: '8px' }}>
        <label>Método de Aplicación:</label>
        <input
          type="text"
          {...register('metodoAplicacionFertilizante', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.metodoAplicacionFertilizante && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Tipo de Fertilizante */}
      <div style={{ marginBottom: '8px' }}>
        <label>Tipo de Fertilizante:</label>
        <input
          type="text"
          {...register('tipoFertilizante', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.tipoFertilizante && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Nombre de Fertilizante */}
      <div style={{ marginBottom: '8px' }}>
        <label>Nombre del Fertilizante:</label>
        <input
          type="text"
          {...register('nombreFertilizante', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.nombreFertilizante && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Cantidad de Fertilizante */}
      <div style={{ marginBottom: '8px' }}>
        <label>Cantidad de Fertilizante:</label>
        <input
          type="number"
          step="any"
          {...register('cantidadFertilizante', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.cantidadFertilizante && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Medida de Fertilizante */}
      <div style={{ marginBottom: '8px' }}>
        <label>Medida:</label>
        <input
          type="text"
          {...register('medidaFertilizante', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.medidaFertilizante && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Fecha de Fertilizante (checkbox) */}
      <div style={{ marginBottom: '8px' }}>
        <input type="checkbox" {...register('checkFertilizante')} />
        <label style={{ marginLeft: '8px' }}>
          Fecha de Fertilizante (Se asigna hoy si marcas)
        </label>
      </div>

      <button>Guardar</button>
    </form>
  );
}
