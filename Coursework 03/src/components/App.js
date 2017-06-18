import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/App.css'

export default class App extends Component {
	render() {
		return (
			<div>
				<header>
					<nav className="navbar navbar-default navbar-main">
						<div className="container">
							<div className="navbar-header">
								<a className="navbar-brand" href="#/">AutoApp</a>
							</div>
								<ul className="nav navbar-nav navbar-right">
									<li><Link to="/">Home</Link></li>
									<li><Link to="/admin">Admin</Link></li>
								</ul>
						</div>
					</nav>
				</header>
			</div>
		);
	}
}
