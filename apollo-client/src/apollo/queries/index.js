import {gql} from '@apollo/client';

export const IS_NOTIFICATION_MODAL_OPEN = gql`
    query IsNotificationModalOpen {
        isNotificationModalOpen @client
    }
`;