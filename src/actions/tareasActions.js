import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const tareas = {};
        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ));

        //Aquí estamos normalizando

        dispatch({
           type: TRAER_TODAS,
           payload: tareas
        })
    } catch(error) {
        console.log(`Error: ${error.message}`)
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponibles'
        })
    }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: 'cambio_usuario_id',
        payload: usuario_id
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: 'cambio_titulo',
        payload: titulo
    })
}

//El dispatch es el que despacha la llamada y contacta al reducer