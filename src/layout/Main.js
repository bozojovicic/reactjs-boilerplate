import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Things } from "../components/Things"
import Thing from "../components/Thing"
import { Login } from "../components/Login"
import AuthenticatedRoute from "./AuthenticatedRoute"
import Constants from '../Constants';

const Main = () => {
	return (
		<main>
			<Switch>
				<Route exact path={Constants.ROUTE_THINGS_ALL} component={Things} />
				<Route exact path={Constants.ROUTE_THING_VIEW} component={Thing} />
				<AuthenticatedRoute path={Constants.ROUTE_THING_CREATE} exact component={Thing} />
				<AuthenticatedRoute path={Constants.ROUTE_THING_EDIT} exact component={Thing} />
				<Route exact path={Constants.ROUTE_LOGIN} component={Login} />
				<Route path="*" component={Things} />  
			</Switch>
		</main>
	)
};

export default Main;