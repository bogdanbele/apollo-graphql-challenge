import React from "react";
import SecretValueCalculator from "./valueCalculator";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Container} from "./styles";
import {ThemeProvider} from "styled-components";

const theme = createMuiTheme({
	 typography: {
	 	fontFamily: "Kontrapunkt Light, sans-serif"
	 },
	 palette: {
		  primary: {main: '#003755'},
		  secondary: {main: '#ffffff'},
		  background: {
				default: '#003755'
		  },
	 },
	 overrides: {
		  MuiButton: {
				root: {
					 borderRadius: 50,
				},
				label: {
					 padding: 8,
					 textTransform: "none",
				}
		  },
	 },
});

function App() {
	 return (
		  <MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					 <Container>
						  <h1>Header</h1>
						  <SecretValueCalculator/>
					 </Container>
				</ThemeProvider>
		  </MuiThemeProvider>
	 );
}

export default App;
