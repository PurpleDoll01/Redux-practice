import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://monoku-tasks.herokuapp.com/R1OvSQOyETZseTHSEw3E/all');
        dispatch({
           type: TRAER_TODOS,
           payload: respuesta.data
        })                        
    } catch(error) {
        console.log(`Error: ${error.message}`)
        dispatch({
            type: ERROR,
            payload: 'Algo salió mal, intenta después' 
        })
    }
}

//El dispatch es el que despacha la llamada y contacta al reducer