import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cargando from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../general/Spinner';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar } = publicacionesActions;


class Publicaciones extends Component {
    async componentDidMount() {
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;

        if (!this.props.usuariosReducer.usuarios.length) {
            await usuariosTraerTodos();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
            await publicacionesTraerPorUsuario(key);
        }
        //Todo esto lo hacemos para verificar si users tiene el atributo de publicaciones_key, esto nos dice si ya este usuario hizo la llamada a sus posts.
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props; // No se podía destructurar el reducer en el didmount ya que es el que manera el estado, en el render ya se puede hacer

        if (usuariosReducer.error) {
            return <Fatal mensaje={ usuariosReducer.error } />
        }

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner/>
        }

        const nombre = usuariosReducer.usuarios[key].name

        return (
            <h1>
                Publicaciones de { nombre }
            </h1>
        );
    };

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        if (!usuarios.length) return; //Aquí no se hace nada porque se está haciendo en ponerUsuarios, igual abajo. HUh
        if(usuariosReducer.error) return;
        if(publicacionesReducer.cargando) {
            return <Spinner />
        }
        if (publicacionesReducer.error) {
            return <Fatal mensaje={publicacionesReducer.error} />
        }
        if (!publicaciones.length) return;

        const { publicaciones_key } = usuarios[key];

        if (!publicaciones[publicaciones_key]) return <Spinner />;

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    }

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div
                className='pub_titulo'
                key={ publicacion.id }
                onClick={ () => this.props.abrirCerrar(pub_key, com_key) }
            >
                <h2>
                    { publicacion.title }
                </h2>
                <h3>
                    { publicacion.body }
                </h3>
                {
                    (publicacion.abierto) ? 'abierto' : 'cerrado'
                }
            </div>
        ))
    );

    render() {
        console.log(this.props)
        return (
            <div>
               { this.ponerUsuario() }
               { this.ponerPublicaciones() }
            </div>
        );
    }
};

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);