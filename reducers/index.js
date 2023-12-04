// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import asistenciaReducer from './asistenciaReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  asistencia: asistenciaReducer,
  // Agrega más reductores aquí si es necesario
});

export default rootReducer;
