import React, {useCallback, useEffect, useState} from 'react';
import {Button, CardContent, CardHeader} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {gql, useApolloClient, useLazyQuery} from "@apollo/client";
import isInRange from "lodash.inrange";
import {CardWrapper} from './styles';
import ResponseModal from "../modal";
import {IS_NOTIFICATION_MODAL_OPEN} from "../../apollo/queries";

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
	 const [fetchExposure, {loading, error, data, client}] = useLazyQuery(FETCH_EXPOSURE, {
		  fetchPolicy: "network-only",
		  onCompleted: () => client.writeQuery({
				query: IS_NOTIFICATION_MODAL_OPEN,
				data: {
					 isNotificationModalOpen: true,
				}
		  })
	 });
	 
	 const fetchExposureCallback = useCallback(() => {
		  fetchExposure({
				variables: {inputValue}
		  });
	 }, [fetchExposure, inputValue]);
	 
	 const onChange = (event) => {
		  const parsedInput = parseInt(event.target.value);
		  setInputValue(parsedInput);
		  setIsValid(isInRange(parsedInput, 0, 11))
	 }
	 
	 const onKeyPress = (event) => {
		  if (event.key === 'Enter' && isValid) {
				fetchExposureCallback();
				event.preventDefault();
		  }
	 }
	 
	 const multiplyValues = ({val3, val5}) => val3 * val5
	 
	 
	 return (
		  <CardWrapper>
				<TextField
					 style={{marginBottom: 20}}
					 type="number"
					 onChange={onChange}
					 onKeyPress={onKeyPress}
				/>
				<Button variant="contained"
						  disabled={!isValid}
						  color="primary"
						  onClick={fetchExposureCallback}>Calculate</Button>
				{data &&
					 <ResponseModal>
						  <CardHeader title="Success" subheader="Your calculation is completed"/>
						  <CardContent>
								{multiplyValues(data.exposure)}
						  </CardContent>
					 </ResponseModal>}
				{error &&
							<pre>
								<span>{getUserMessage(error)}</span>
						  </pre>}
		  </CardWrapper>
	 )
}

export default SecretValueCalculator