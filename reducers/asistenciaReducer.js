// asistenciaReducer.js
import { REGISTRAR_ASISTENCIA_EXITO, REGISTRAR_ASISTENCIA_ERROR } from '../actions/asistenciaActions';

const initialState = {
  asistencia: [],
  error: null,
};

const asistenciaReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRAR_ASISTENCIA_EXITO:
      return {
        ...state,
        asistencia: [...state.asistencia, action.payload],
        error: null,
      };
    case REGISTRAR_ASISTENCIA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default asistenciaReducer;
