import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
//Se aplica al store como un middleware 

import reducers from './reducers';

const store = createStore(
  reducers, //Todos los reducers, los combinamos y enviamos desde el index de reducers. 
  {}, //Estado inicial 
  composeWithDevTools (
    applyMiddleware(reduxThunk) // Aquí se aplica el thunk para que nos sirvan los actions 
  ) 
);
//createStore recibe tres parámetros, el primero seran todos los reducers de la app. El segundo es el estado inicial. El tercero es el middleware  

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

