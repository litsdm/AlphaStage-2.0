import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';

import createGame from '../graphql/createGame.graphql';
import editGame from '../graphql/editGame.graphql';
import fullGameQuery from '../graphql/fullGame.graphql';
import userGamesQuery from '../graphql/userGames.graphql';
import allGamesQuery from '../graphql/allGames.graphql';

import CreateGame from '../components/CreateGame/CreateGame';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const queriesToRefetch = (userId) => (
  [
    {
      query: userGamesQuery,
      variables: { id: userId }
    },
    {
      query: allGamesQuery,
      variables: { checkInvisible: true }
    }
  ]
);

const withMutation = compose(
  graphql(createGame, {
    props: ({ ownProps: { user }, mutate }) => ({
      submitGame: (input) =>
        mutate({ variables: { input }, refetchQueries: queriesToRefetch(user._id) }),
    }),
  }),
  graphql(editGame, {
    props: ({ ownProps: { user }, mutate }) => ({
      saveGame: (input) =>
        mutate({ variables: { input }, refetchQueries: queriesToRefetch(user._id) }),
    }),
  }),
  graphql(fullGameQuery, {
    props: ({ ownProps, data: { game, loading, error } }) => {
      if (!ownProps.match.params.id) return;
      if (!game) return { loading };
      if (error) return { hasErrors: true };
      return {
        game,
      };
    },
    options: (props) => ({ variables: { id: props.match.params.id } })
  })
);

const CreateGamePage = ({ submitGame, saveGame, user, match, game, loading }) => (
  loading
    ? null
    : (
      <CreateGame
        submitGame={submitGame}
        saveGame={saveGame}
        user={user}
        edit={typeof match.params.id !== 'undefined' && match.params.id !== null}
        game={game}
      />
    )
);

CreateGamePage.propTypes = {
  submitGame: func.isRequired,
  saveGame: func.isRequired,
  user: object.isRequired,
  match: object.isRequired,
  loading: bool,
  game: object
};

CreateGamePage.defaultProps = {
  loading: false,
  game: {}
};

const CreateWithData = withMutation(CreateGamePage);
const CreateWithProps = connect(mapStateToProps, null)(CreateWithData);

export default withMutation(CreateWithProps);
