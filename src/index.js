import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import './index.css';
import App from './App';
import { translateLocation } from './reducers';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({ translateLocation })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
