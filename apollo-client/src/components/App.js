import React from "react";
import SecretValueCalculator from "./valueCalculator";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Container} from "./styles";
import {ThemeProvider} from "styled-components";

const theme = createMuiTheme({
	 palette: {
		  primary: {main: '#003755'},
		  secondary: {main: '#FFF'},
		  background: {
				default: '#003755'
		  },
	 },
	 overrides: {
		  MuiButton: {
				root: {
					 borderRadius: 20
				}
		  },
	 },
});

function App() {
	 return (
		  <MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					 <Container>
						  <div>
								<h1>Header</h1>
						  </div>
						  <SecretValueCalculator/>
					 </Container>
				</ThemeProvider>
		  </MuiThemeProvider>
	 );
}

export default App;
