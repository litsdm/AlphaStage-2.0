// @flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Home from '../components/Home';

const GET_GAMES = gql`
  query {
    games {
      _id
      name
      description
      img
    }
  }
`;

const withGames = graphql(GET_GAMES, {
  props: ({ data }) => {
    if (data.loading) return { userLoading: true };
    if (data.error) return { hasErrors: true };
    return {
      games: data.games,
    };
  }
});

class HomePage extends Component {
  render() {
    console.log(this.props);

    return (
      <Home />
    );
  }
}

const HomePageWithData = withGames(HomePage);

export default HomePageWithData;
