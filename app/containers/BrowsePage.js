import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import allGamesQuery from '../graphql/allGames.graphql';

import Browse from '../components/Browse/Browse';

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
      this.props.loading
      ? null
      : <Browse games={this.props.games} />
    );
  }
}

BrowsePage.propTypes = {
  loading: PropTypes.bool,
  games: PropTypes.array,
};

BrowsePage.defaultProps = {
  loading: false,
  games: []
};

const BrowsePageWithData = withGames(BrowsePage);

export default BrowsePageWithData;
