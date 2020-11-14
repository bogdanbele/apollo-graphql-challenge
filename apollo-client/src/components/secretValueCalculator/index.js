import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {gql, useLazyQuery} from '@apollo/client';
import Box from "@material-ui/core/Box";

const FETCH_EXPOSURE = gql`
    query exposure($inputValue: Int!){
        exposure(input: $inputValue){
            val3
            val5
        }
    }
`;

const getUserMessage = (error) => {
	 try {
		  return error.graphQLErrors[0].extensions.response.body.error
	 } catch (e) {
		  return error.message
	 }
}

const SecretValueCalculator = () => {
	 const [inputValue, setInputValue] = useState(null);
	 const [fetchExposure, {loading, error, data}] = useLazyQuery(FETCH_EXPOSURE);
	 
	 if (data) {
		  console.log(data.exposure)
	 }
	 
	 return (
		  <Box display="flex"
				 alignItems="center"
				 flexDirection="column">
				<Box
					 css={{maxWidth: 150}}
					 display="flex"
					 flexDirection="column">
					 <TextField
						  style={{marginBottom: 20}}
						  type="number"
						  onBlur={(event) => {
								setInputValue(parseInt(event.target.value));
						  }}
					 />
					 <Button variant="contained" color="primary"
								onClick={() => fetchExposure({
									 variables: {inputValue}
								})}>Calculate Exposure</Button>
					
				</Box>
				{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
				{error &&
				<pre>
					 <span>{getUserMessage(error)}</span>
					 </pre>}
		  </Box>
		  
	 )
}

export default SecretValueCalculator