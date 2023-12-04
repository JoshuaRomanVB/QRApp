// asistenciaActions.js
import { registrarAsistenciaEnFirebase } from '../api/asistencia';

export const REGISTRAR_ASISTENCIA_EXITO = 'REGISTRAR_ASISTENCIA_EXITO';
export const REGISTRAR_ASISTENCIA_ERROR = 'REGISTRAR_ASISTENCIA_ERROR';

export const registrarAsistencia = (alumnoInfo) => {
  return async (dispatch) => {
    try {
      // Llamada a la API para registrar la asistencia en Firebase
      const registroExitoso = await registrarAsistenciaEnFirebase(alumnoInfo);

      if (registroExitoso) {
        // Despachar la acción de éxito si el registro fue exitoso
        dispatch({
          type: REGISTRAR_ASISTENCIA_EXITO,
          payload: alumnoInfo,
        });
      }
    } catch (error) {
      // Despachar la acción de error si hay un problema al registrar la asistencia
      dispatch({
        type: REGISTRAR_ASISTENCIA_ERROR,
        payload: error.message,
      });
    }
  };
};
