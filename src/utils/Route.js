
import React from "react";

import {
	HashRouter as Router,
	Route,
	Switch,
	// browserHistory
} from "react-router-dom";
import contact from "../pages/contact/contact";
export const AppRoutes = () => {
	return (
		// <Router history={createHashHistory()}>
		<Router>
			<Switch>
				<Route exact path="/Home" component={home} />
				
				{/* <Route component={MessageContainer} /> */}
				<Route exact path="/" component={home} />
			</Switch>
		</Router>
		// </HashRouter>
	);
};
  
