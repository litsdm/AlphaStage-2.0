import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import allGamesQuery from '../graphql/allGames.graphql';

import Browse from '../components/Browse';


const withGames = graphql(allGamesQuery, {
  props: ({ data }) => {
    if (!data.games) return { loading: data.loading };
    if (data.error) return { hasErrors: true };
    return {
      games: data.games,
    };
  }
});

class BrowsePage extends Component {
  render() {
    return (
      <Browse />
    );
  }
}

const BrowsePageWithData = withGames(BrowsePage);

export default BrowsePageWithData;
