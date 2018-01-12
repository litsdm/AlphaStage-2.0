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

const CategoryPage = ({ games, loading, match }) => (
  loading
    ? <Loader />
    : <Category games={games} currentTag={match.params.category} />
);

CategoryPage.propTypes = {
  loading: PropTypes.bool,
  games: PropTypes.array,
  match: PropTypes.object.isRequired
};

CategoryPage.defaultProps = {
  loading: false,
  games: []
};

export default withGames(CategoryPage);
