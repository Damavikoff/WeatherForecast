import './styles/styles.scss'
require.context("../assets/icons/", true, /\.\w+$/i)

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider> 
	</React.StrictMode>   
, document.querySelector('#app'))
