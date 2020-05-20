import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        dispatch({
           type: TRAER_TODAS,
           payload: respuesta.data
        })
    } catch(error) {
        console.log(`Error: ${error.message}`)
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponibles'
        })
    }
}

//El dispatch es el que despacha la llamada y contacta al reducer