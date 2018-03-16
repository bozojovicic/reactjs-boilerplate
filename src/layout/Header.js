import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../Constants';

class Header extends React.Component {

	logout() {
		this.props.logoutA();
	}

	render() {

		let loggedIn = '';
		if(this.props.authData.username) {
			loggedIn = <li><NavLink to={Constants.ROUTE_THINGS_ALL}><span className="glyphicon glyphicon-user"></span> {this.props.authData.username} </NavLink></li>
		}

		let loginLink = '';
		let logoutLink = '';
		if(this.props.authData.username) {
			logoutLink = <li><NavLink to={Constants.ROUTE_THINGS_ALL} onClick={this.logout.bind(this)}><span className="glyphicon glyphicon-log-out"></span> Logout</NavLink></li>
		} else {
			loginLink = <li><NavLink to={Constants.ROUTE_LOGIN}><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>
		}

		let homeClassName = this.props.authData.loadingData ? 'glyphicon glyphicon-grain loading-data' : 'glyphicon glyphicon-grain';

		return (<header>
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>                        
						</button>
						<NavLink className="navbar-brand" to={Constants.ROUTE_THINGS_ALL}>Bozo's playground <span className={homeClassName}></span></NavLink>
					</div>
					<div className="collapse navbar-collapse" id="myNavbar">
						<ul className="nav navbar-nav">
							<li><NavLink exact activeClassName='active' to={Constants.ROUTE_THINGS_ALL}>All things</NavLink></li>
							<li><NavLink exact activeClassName='active' to={Constants.ROUTE_THING_CREATE}>Create new thing</NavLink></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							{loggedIn}
							{loginLink}
							{logoutLink}
						</ul>
					</div>
				</div>
			</nav>
		</header>)
	}
};

const logoutA = () => {
	return {type: 'SET_USERNAME', payload: ''};
}

const mapStateToProps = (state) => {
	return {
		authData: state.authR.authData
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		logoutA : logoutA
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);