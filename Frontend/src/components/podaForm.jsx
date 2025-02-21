// src/components/PodaForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  getPodaById,
  patchPoda
} from '../api/poda.api';

export function PodaForm({ idPoda, onUpdated }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Observamos checkbox para asignar fecha actual o null
  const watchCheckFecha = watch('checkFechaPoda');

  // Cargar datos existentes
  useEffect(() => {
    async function loadData() {
      if (!idPoda) return;
      try {
        const data = await getPodaById(idPoda);
        // Llenar el formulario
        setValue('tipoPoda', data.tipoPoda || '');
        setValue('herramientasUsadas', data.herramientasUsadas || '');
        setValue('tecnicasUsadas', data.tecnicasUsadas || '');

        // Si existía fechaPoda, marcamos el checkbox
        setValue('checkFechaPoda', !!data.fechaPoda);
      } catch (error) {
        console.error('Error al cargar Poda:', error);
      }
    }
    loadData();
  }, [idPoda, setValue]);

  // Cada checkbox => true => asigna fecha actual en el backend
  // false => null => quita la fecha
  useEffect(() => {
    setValue('fechaPoda', watchCheckFecha ? true : null);
  }, [watchCheckFecha, setValue]);

  // Manejo del submit
  const onSubmit = handleSubmit(async (formData) => {
    try {
      await patchPoda(idPoda, formData);
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error('Error al actualizar Poda:', error);
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '16px' }}>
      <h3>Editar Poda #{idPoda}</h3>

      {/* Tipo de Poda */}
      <div style={{ marginBottom: '8px' }}>
        <label>Tipo de Poda:</label>
        <input
          type="text"
          {...register('tipoPoda', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.tipoPoda && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Herramientas Usadas */}
      <div style={{ marginBottom: '8px' }}>
        <label>Herramientas Usadas:</label>
        <input
          type="text"
          {...register('herramientasUsadas', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.herramientasUsadas && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* Técnicas Usadas */}
      <div style={{ marginBottom: '8px' }}>
        <label>Técnicas Usadas:</label>
        <input
          type="text"
          {...register('tecnicasUsadas', { required: true })}
          style={{ marginLeft: '8px' }}
        />
        {errors.tecnicasUsadas && <span style={{ color: 'red' }}>Requerido</span>}
      </div>

      {/* fechaPoda (checkbox) */}
      <div style={{ marginBottom: '8px' }}>
        <input type="checkbox" {...register('checkFechaPoda')} />
        <label style={{ marginLeft: '8px' }}>Fecha de Poda (hoy si marcas)</label>
      </div>

      <button>Guardar</button>
    </form>
  );
}
