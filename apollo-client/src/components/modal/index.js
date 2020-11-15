import React from 'react';
import {createPortal} from 'react-dom';
import {useApolloClient, useQuery} from "@apollo/client";
import {IS_NOTIFICATION_MODAL_OPEN} from "../../apollo/queries";
import {Overlay} from "./styles";
import {CardWrapper} from "../valueCalculator/styles";


const ResponseModal = () => {
	 const client = useApolloClient();
	 
	 const closeNotificationModal = () => {
		  client.writeQuery(
				{
					 query: IS_NOTIFICATION_MODAL_OPEN,
					 data: {isNotificationModalOpen: false}
				});
	 };
	 const {data} = useQuery(IS_NOTIFICATION_MODAL_OPEN);
	 const domElement = document.getElementById('portal');
	 
	 return data.isNotificationModalOpen && createPortal(
		  <Overlay onClick={() => closeNotificationModal()}>
				<CardWrapper onClick={(e) => e.stopPropagation()}>
					 <p> Success!</p>
				</CardWrapper>
		  </Overlay>,
		  domElement);
}

export default ResponseModal