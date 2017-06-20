import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App'
import Admin from './components/Admin'
import Home from './components/Home'
import CarDetails from './components/CarDetails'
import CarForm from './components/CarForm'
import SearchPage from './components/SearchPage'
import NotFound from './components/NotFound'

import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import './style/bootstrap.min.css';
import './style/index.css';

ReactDOM.render(
	<Router>
		<div>
			<App />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/car/:id' component={CarDetails} />
				<Redirect from='/car' to='/' />

				<Route path='/admin/add' component={CarForm} />
				<Route path='/admin/edit/:id' component={CarForm} />
				<Redirect from='/admin/edit' to='/admin' />
				<Route path='/admin' component={Admin} />

				<Route path='/search/:text' component={SearchPage} />
				<Redirect from='/search/' to='/search/ ' />
				
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>,
	document.getElementById('root')
);
