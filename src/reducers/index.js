import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './publicacionesReducer';

export default combineReducers({
    usuariosReducer,
    publicacionesReducer
}); //Aquí se envían todos los reducers que se van a enviar