import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App'
import Home from './components/Home'
import CarDetails from './components/CarDetails'

import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import './style/bootstrap.min.css';
import './style/index.css';

ReactDOM.render(
	<Router>
		<div>
			<App />
			<Route exact path='/' component={Home} />
			<Route path='/car/:id' component={CarDetails} />
		</div>
	</Router>,
	document.getElementById('root')
);
