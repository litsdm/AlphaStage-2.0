import React, { Component } from 'react';
import { array } from 'prop-types';

import TopSlider from './TopSlider';
import CategoryGrid from './CategoryGrid';

class Browse extends Component {
  render() {
    return (
      <div>
        <TopSlider games={this.props.games} />
        <CategoryGrid />
      </div>
    );
  }
}

Browse.propTypes = {
  games: array.isRequired
};

export default Browse;
