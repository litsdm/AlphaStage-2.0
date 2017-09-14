import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import client from '../client';
import Routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ApolloProvider>
  );
}
