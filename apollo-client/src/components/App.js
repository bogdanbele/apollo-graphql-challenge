import React from "react";
import SecretValueCalculator from "./valueCalculator";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Container, Header} from "./styles";
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
						  <Header>
								<ul>
									 <li>Home</li>
									 <li>About</li>
									 <li>FAQ</li>
								</ul>
						  </Header>
						  <SecretValueCalculator/>
					 </Container>
				</ThemeProvider>
		  </MuiThemeProvider>
	 );
}

export default App;
