import { ACTUALIZAR, CARGANDO, ERROR } from '../types/publicacionesTypes';
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

        const nuevas = respuesta.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false,
        }));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas,
        ];

        dispatch({
            type: ACTUALIZAR,
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

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    /*const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto,
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ]

    publicaciones_actualizadas[pub_key][com_key] = actualizada; */

    const publicaciones_actualizadas = [
        ...publicaciones.slice(0, pub_key),
        ...[
            [
            ...publicaciones[pub_key].slice(0, com_key),
            ...[
                {
                  ...publicaciones[pub_key][com_key],
                  abierto: !publicaciones[pub_key][com_key].abierto
                },
            ...publicaciones[pub_key].slice((com_key + 1))
            ]
           ]
        ],
        ...publicaciones.slice((pub_key + 1))
    ]

    console.log({'seleccionada': seleccionada})
    console.log({'publicaciones2': publicaciones_actualizadas})

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas,
    })
}

export const traerComentarios = (pub_key, com_key) => (dispatch, getState) => {

};