import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import Dashboard from '../components/Dashboard/Dashboard';
import Loader from '../components/Loader';

import userGamesQuery from '../graphql/userGames.graphql';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const withGames = graphql(userGamesQuery, {
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
});

const DashboardPage = ({ user, games, loading }) => (
  loading
    ? <Loader />
    : <Dashboard user={user} games={games} />
);


DashboardPage.propTypes = {
  user: PropTypes.object.isRequired,
  games: PropTypes.array,
  loading: PropTypes.bool
};

DashboardPage.defaultProps = {
  games: [],
  loading: false
};

const DashboardWithProps = connect(mapStateToProps, null)(DashboardPage);
const DashboardWithGames = withGames(DashboardWithProps);

export default DashboardWithGames;
