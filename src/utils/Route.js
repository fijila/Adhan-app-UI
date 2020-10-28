
import React from "react";

import {
	Route,
	Switch,
} from "react-router-dom";
import Timesetting from "../pages/Admin";
import Home from "../pages/Home";


export const AppRoutes = () => {
	return (
		// <Router history={createHashHistory()}>
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/admin" component={Timesetting} />
			</Switch>
		// </HashRouter>
	);
};
  
