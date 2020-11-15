import React, {useCallback, useRef, useState} from 'react';
import {Button, CardContent, CardHeader} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {gql, useLazyQuery} from "@apollo/client";
import isInRange from "lodash.inrange";
import {CardWrapper} from './styles';
import ModalPortal from "../modal";
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
		  	 	event.target.blur();
				fetchExposureCallback();
				event.preventDefault();
		  }
	 }
	 
	 const multiplyValues = ({val3, val5}) => val3 * val5
	 
	 const inputElementRef = useRef(null);
	 
	 return (
		  <CardWrapper style={{width:500}}>
				<h1>Let's solve things together</h1>
				<p>We have developed an in-house tool to calculate
					 a user's exposure to the virus. We predict it's around 94% accurate.</p>
				<h4>Please input the user id we should check</h4>
				<TextField
					 ref={inputElementRef}
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
					 <ModalPortal>
						  <CardHeader title="Success" subheader="Your calculation is completed"/>
						  <CardContent>
								<span>The amount of exposure is </span>{multiplyValues(data.exposure)}
						  </CardContent>
					 </ModalPortal>}
				{error &&
				<pre>
								<span>{getUserMessage(error)}</span>
						  </pre>}
		  </CardWrapper>
	 )
}

export default SecretValueCalculator