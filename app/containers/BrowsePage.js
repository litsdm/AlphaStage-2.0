import React from 'react';
import { graphql } from 'react-apollo';
import { bool, array } from 'prop-types';

import allGamesQuery from '../graphql/allGames.graphql';

import Browse from '../components/Browse/Browse';

const withGames = graphql(allGamesQuery, {
  props: ({ data }) => {
    if (!data.games) return { loading: data.loading };
    if (data.error) return { hasErrors: true };
    return {
      games: data.games,
    };
  },
  options: () => ({ variables: { checkInvisible: true } })
});

const BrowsePage = ({ games, loading }) => (
  loading
    ? null
    : <Browse games={games} />
);

BrowsePage.propTypes = {
  loading: bool,
  games: array,
};

BrowsePage.defaultProps = {
  loading: false,
  games: []
};

const BrowsePageWithData = withGames(BrowsePage);

export default BrowsePageWithData;
