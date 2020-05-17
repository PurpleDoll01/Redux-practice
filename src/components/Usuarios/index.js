import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla';

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {

  componentDidMount() {
    if( !this.props.usuarios.length) {
      this.props.traerTodos(); //Esta funcion viene de usuariosActions
    }
  } 

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Fatal mensaje={ this.props.error } />
    }

    return <Tabla/>;
  };

  render() { 
    return (
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>   
    );
  }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}; //Siempre se reciben todos los reducers

export default connect(mapStateToProps, usuariosActions)(Usuarios); 
//Esta línea permite que el componente Usuarios se conecte a Redux. El primer parámetro son todos los reducers que el proveedor le entregará al componente. El segundo parámetro son todas las acciones 