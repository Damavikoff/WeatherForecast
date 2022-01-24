import './styles/styles.scss';
require.context("../assets/icons/", true, /\.\w+$/i);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './store'

//http://api.openweathermap.org/geo/1.0/reverse?lat=53.893009&lon=27.567444&limit=1&appid=3b46066644b57abe8ffe0b69606b8649
// const locationInfo = await doRequest('http://api.openweathermap.org/geo/1.0/reverse?lat=53.893009&lon=27.567444&limit=1&appid=' + API_KEY);

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider> 
    </React.StrictMode>   
, document.querySelector('#app'));