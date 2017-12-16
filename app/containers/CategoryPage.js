import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import gamesByTags from '../graphql/gamesByTags.graphql';

import Category from '../components/Category/Category';
import Loader from '../components/Loader';

const withGames = graphql(gamesByTags, {
  props: ({ data }) => {
    if (!data.gamesByTags) return { loading: data.loading };
    if (data.error) return { hasErrors: true };
    return {
      games: data.gamesByTags,
    };
  },
  options: (props) => ({ variables: { tags: [props.match.params.category] } })
});

const CategoryPage = ({ games, loading }) => (
  loading
    ? <Loader />
    : <Category games={games} />
);

CategoryPage.propTypes = {
  loading: PropTypes.bool,
  games: PropTypes.array,
};

CategoryPage.defaultProps = {
  loading: false,
  games: []
};

export default withGames(CategoryPage);
