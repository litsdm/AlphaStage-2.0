import React, { Component } from 'react';
import { string } from 'prop-types';

import Modal from '../../Modal';


class Create extends Component {
  state = {
    endDate: null,
    maxTesters: 0,
    rewardType: '',
    reward: '',
    startDate: null
  }

  render() {
    const { id } = this.props;
    return (
      <Modal id={id}>
        <div>
          Create Session Modal
        </div>
      </Modal>
    );
  }
}

Create.propTypes = {
  id: string.isRequired
};

export default Create;
