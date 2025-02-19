import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { patchPreparacion} from '../api/preparacionTerreno.api';

export function PreparacionTerrenoForm({preparacionId }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Observamos los checkboxes
  const watchCheckLimpieza = watch('checkLimpieza');
  const watchCheckAnalisis = watch('checkAnalisis');
  const watchCheckCorrecion = watch('checkCorrecion');
  const watchCheckLabranza = watch('checkLabranza');

  // Cada vez que cambie un checkbox, ponemos la fecha de hoy o null
  useEffect(() => {
    if (watchCheckLimpieza) {
      setValue('limpiezaTerreno', new Date().toISOString().split('T')[0]);
    } else {
      setValue('limpiezaTerreno', null);
    }
  }, [watchCheckLimpieza, setValue]);

  useEffect(() => {
    if (watchCheckAnalisis) {
      setValue('analisisSuelo', new Date().toISOString().split('T')[0]);
    } else {
      setValue('analisisSuelo', null);
    }
  }, [watchCheckAnalisis, setValue]);

  useEffect(() => {
    if (watchCheckCorrecion) {
      setValue('correcionSuelo', new Date().toISOString().split('T')[0]);
    } else {
      setValue('correcionSuelo', null);
    }
  }, [watchCheckCorrecion, setValue]);

  useEffect(() => {
    if (watchCheckLabranza) {
      setValue('labranza', new Date().toISOString().split('T')[0]);
    } else {
      setValue('labranza', null);
    }
  }, [watchCheckLabranza, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    try {

      data.preparacionId = preparacionId;

    
      await patchPreparacion(preparacionId,data);

 
      window.location.reload();
    } catch (error) {
      console.error('Error al crear la preparación de terreno:', error);
    }
  });

  return (
    <div>
      <h3>Agregar Preparación de Terreno</h3>
      <form onSubmit={onSubmit}>
        {/* LIMPIEZA DEL TERRENO */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkLimpieza')} />
          <label style={{ marginLeft: '8px' }}>Limpieza del terreno</label>
          {/* Muestra la fecha si está chequeado */}
          {watchCheckLimpieza && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('limpiezaTerreno')})
            </span>
          )}
        </div>

        {/* ANÁLISIS DE SUELO */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkAnalisis')} />
          <label style={{ marginLeft: '8px' }}>Análisis de suelo</label>
          {watchCheckAnalisis && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('analisisSuelo')})
            </span>
          )}
        </div>

        {/* CORRECCIÓN DE SUELO */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkCorrecion')} />
          <label style={{ marginLeft: '8px' }}>Corrección de suelo</label>
          {watchCheckCorrecion && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('correcionSuelo')})
            </span>
          )}
        </div>

        {/* LABRANZA */}
        <div style={{ marginBottom: '8px' }}>
          <input type="checkbox" {...register('checkLabranza')} />
          <label style={{ marginLeft: '8px' }}>Labranza</label>
          {watchCheckLabranza && (
            <span style={{ marginLeft: '16px', color: 'green' }}>
              (Fecha: {watch('labranza')})
            </span>
          )}
        </div>

        {/* DELIMITACIÓN DE PARCELA (FLOAT) */}
        <div style={{ marginTop: '12px' }}>
          <label>Delimitación de parcela (m²):</label>
          <input
            type="number"
            step="any"  // Para permitir floats
            {...register('delimitacionParcela', { required: true })}
            style={{ marginLeft: '10px' }}
          />
          {errors.delimitacionParcela && (
            <span style={{ color: 'red', marginLeft: '8px' }}>
              Requerido
            </span>
          )}
        </div>

        <button style={{ marginTop: '16px' }}>Listo</button>
      </form>
    </div>
  );
}
