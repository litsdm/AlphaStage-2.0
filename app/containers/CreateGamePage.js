import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import createGame from '../graphql/createGame.graphql';

import CreateGame from '../components/CreateGame/CreateGame';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const withMutation = graphql(createGame, {
  props: ({ mutate }) => ({
    submitGame: (input) => mutate({ variables: { input } }),
  }),
});

const CreateGamePage = ({ submitGame, user }) => (
  <div>
    <CreateGame submitGame={submitGame} user={user} />
  </div>
);

CreateGamePage.propTypes = {
  submitGame: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const connectedComponent = connect(mapStateToProps, null)(CreateGamePage);

export default withMutation(connectedComponent);
