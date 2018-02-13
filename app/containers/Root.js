import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import client from '../client';
import Routes from '../routes';

type Props = {
  store: {},
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    return (
      <ApolloProvider store={this.props.store} client={client}>
        <ConnectedRouter history={this.props.history}>
          <Routes history={this.props.history} />
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}
