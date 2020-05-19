import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

import axios from 'axios';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    });
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;

    const usuario_id = usuarios[key].id;

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

        const publicaciones_actualizadas = [
            ...publicaciones,
            respuesta.data
        ];

        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicaciones_actualizadas
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key: publicaciones_key
        }

        //El man quiere que los usuarios tengan la info de en qué posición se realizó la petición de sus posts. Aquí con esto le añade un parámetro llamado publicaciones_key a la búsqueda de los usuarios

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });
    } catch(error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles'
        });
    }
}