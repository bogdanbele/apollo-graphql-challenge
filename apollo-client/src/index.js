import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { IS_NOTIFICATION_MODAL_OPEN } from './apollo/queries';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
});

client.writeQuery({
  query: IS_NOTIFICATION_MODAL_OPEN,
  data: {
    isNotificationModalOpen: false,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
