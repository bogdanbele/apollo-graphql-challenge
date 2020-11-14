import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {gql, useLazyQuery} from "@apollo/client";
import Box from "@material-ui/core/Box";
import isInRange from "lodash.inrange";

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
	 const [isValid, setIsValid] = useState(false);
	 const [fetchExposure, {loading, error, data}] = useLazyQuery(FETCH_EXPOSURE);
	 
	 const fetchExposureCallback = useCallback(() => {
		  fetchExposure({
				variables: {inputValue}
		  });
	 }, [fetchExposure, inputValue]);
	 
	 console.log(isValid)
	 
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
						  onChange={(event) => {
								const parsedInput = parseInt(event.target.value);
								setInputValue(parsedInput);
								setIsValid(isInRange(parsedInput, 0, 11))
						  }}
						  onKeyPress={(event) => {
								if (event.key === 'Enter' && isValid) {
									 fetchExposureCallback();
									 event.preventDefault();
								}
						  }}
					 />
					 <Button variant="contained"
								disabled={!isValid}
								color="primary"
								onClick={() => {
									 console.log('onclick')
									 fetchExposureCallback()
								}}>Calculate Exposure</Button>
				
				</Box>
				{data && <pre>{JSON.stringify(data.exposure, null, 2)}</pre>}
				{error &&
				<pre>
					 <span>{getUserMessage(error)}</span>
					 </pre>}
		  </Box>
	 
	 )
}

export default SecretValueCalculator