import React from "react";
import logo from '../logo.svg';
import './App.css';
import SecretValueCalculator from "./secretValueCalculator";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
	 palette: {
		  primary: {main: '#00bcd4'},
		  secondary:{main: '##ff4081'},
	 }
});

function App() {
	 return (
		  <MuiThemeProvider theme={theme}>
				<div className="App">
					 <SecretValueCalculator/>
				</div>
		  </MuiThemeProvider>
	 );
}

export default App;
