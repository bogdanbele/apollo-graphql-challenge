import React from "react";
import SecretValueCalculator from "./valueCalculator";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Container} from "./styles";
import {ThemeProvider} from "styled-components";
import {useApolloClient} from "@apollo/client";
import {IS_NOTIFICATION_MODAL_OPEN} from "../apollo/queries";
import ResponseModal from "./modal";

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
	 const client = useApolloClient();
	 
	 return (
		  <MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					 <ResponseModal/>
					 <Container>
						  <div>
								<button onClick={() => client.writeQuery({
									 query: IS_NOTIFICATION_MODAL_OPEN,
									 data: {
										  isNotificationModalOpen: true,
									 }
								})}>click</button>
								<h1>Header</h1>
						  </div>
						  <SecretValueCalculator/>
					 </Container>
				</ThemeProvider>
		  </MuiThemeProvider>
	 );
}

export default App;
