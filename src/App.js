import React from 'react';
import './App.css';
import { HashRouter as Router } from "react-router-dom";
import { AppRoutes } from "./utils/Route.js";



function App() {
  return (
		<Router>
			<AppRoutes />
		</Router>
  );
}

export default App;
