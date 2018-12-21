import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import './index.css';
import App from './App';
import { translateLocation, handleWeather, getLatLong, 
          setZipcode, handleDOWFocus } 
  from './reducers';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({ translateLocation, handleWeather, 
                                      getLatLong, setZipcode, handleDOWFocus })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
