import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import Dashboard from '../components/Dashboard/Dashboard';
import Loader from '../components/Loader';

import userGamesQuery from '../graphql/userGames.graphql';
import updateGeneralSettings from '../graphql/updateGeneralSettings.graphql';
import deleteGame from '../graphql/deleteGame.graphql';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const withGraphql = compose(
  graphql(userGamesQuery, {
    props: ({ data }) => {
      if (!data.user) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        games: data.user.games,
      };
    },
    options: () => {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      return { variables: { id: user._id } };
    }
  }),
  graphql(updateGeneralSettings, {
    props: ({ mutate }) => ({
      updateGeneral: (gameId, isPrivate, releaseStatus) =>
        mutate({ variables: { gameId, isPrivate, releaseStatus } }),
    })
  }),
  graphql(deleteGame, {
    props: ({ mutate }) => {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      return ({
        delGame: (id) => mutate({
          refetchQueries: [{
            query: userGamesQuery,
            variables: { id: user._id }
          }],
          variables: { id }
        }),
      });
    }
  }),
);

const DashboardPage = ({ user, games, updateGeneral, loading, delGame }) => (
  loading
    ? <Loader />
    : (
      <Dashboard
        user={user}
        games={games}
        updateGeneral={updateGeneral}
        deleteGame={delGame}
      />
    )
);


DashboardPage.propTypes = {
  user: PropTypes.object.isRequired,
  updateGeneral: PropTypes.func.isRequired,
  delGame: PropTypes.func.isRequired,
  games: PropTypes.array,
  loading: PropTypes.bool
};

DashboardPage.defaultProps = {
  games: [],
  loading: false
};

const DashboardWithProps = connect(mapStateToProps, null)(DashboardPage);
const DashboardWithGames = withGraphql(DashboardWithProps);

export default DashboardWithGames;
