import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { array, bool, func, object } from 'prop-types';
import jwtDecode from 'jwt-decode';

import Dashboard from '../components/Dashboard/Dashboard';
import Loader from '../components/Loader';

import userGamesQuery from '../graphql/userGames.graphql';
import allGamesQuery from '../graphql/allGames.graphql';
import updateGeneralSettings from '../graphql/updateGeneralSettings.graphql';
import deleteGame from '../graphql/deleteGame.graphql';
import createTestingSession from '../graphql/createTestingSession.graphql';
import markTest from '../graphql/markTest.graphql';
import setStrProperty from '../graphql/setStrProperty.graphql';

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
  graphql(createTestingSession, {
    props: ({ mutate }) => {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      const queriesToRefetch = [
        {
          query: userGamesQuery,
          variables: { id: user._id }
        }
      ];
      return ({
        createSession: (input) => mutate({
          refetchQueries: queriesToRefetch,
          variables: { input }
        }),
      });
    }
  }),
  graphql(updateGeneralSettings, {
    props: ({ mutate }) => ({
      updateGeneral: (gameId, isPrivate, releaseStatus) =>
        mutate({ variables: { gameId, isPrivate, releaseStatus } }),
    })
  }),
  graphql(setStrProperty, {
    props: ({ mutate }) => ({
      updateProperty: (gameId, name, value) => mutate({ variables: { gameId, name, value } })
    })
  }),
  graphql(deleteGame, {
    props: ({ mutate }) => {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      const queriesToRefetch = [
        {
          query: userGamesQuery,
          variables: { id: user._id }
        },
        {
          query: allGamesQuery,
          variables: { checkInvisible: true }
        }
      ];

      return ({
        delGame: (id) => mutate({
          refetchQueries: queriesToRefetch,
          variables: { id }
        }),
      });
    }
  }),
  graphql(markTest, {
    props: ({ mutate }) => ({
      markFeedback: (testId, mark) => mutate({ variables: { testId, mark } })
    })
  })
);

const DashboardPage = (props) => {
  const {
    user,
    games,
    updateGeneral,
    loading,
    delGame,
    createSession,
    markFeedback,
    updateProperty
  } = props;
  return (
    loading
      ? <Loader />
      : (
        <Dashboard
          user={user}
          games={games}
          updateGeneral={updateGeneral}
          deleteGame={delGame}
          createTestingSession={createSession}
          markTest={markFeedback}
          updateProperty={updateProperty}
        />
      )
  );
};


DashboardPage.propTypes = {
  user: object.isRequired,
  updateGeneral: func.isRequired,
  delGame: func.isRequired,
  createSession: func.isRequired,
  markFeedback: func.isRequired,
  updateProperty: func.isRequired,
  games: array,
  loading: bool
};

DashboardPage.defaultProps = {
  games: [],
  loading: false
};

const DashboardWithProps = connect(mapStateToProps, null)(DashboardPage);
const DashboardWithGames = withGraphql(DashboardWithProps);

export default DashboardWithGames;
