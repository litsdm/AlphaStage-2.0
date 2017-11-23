import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdditionalDetails.scss';

import DetailsRow from './DetailsRow';

const AdditionalDetails = ({ languages, publisher, spaceRequired, website }) => (
  <div className={styles.AdditionalDetails}>
    <p className={styles.Title}>Additional Details</p>
    <DetailsRow subtitle={'Languages'} values={languages || []} />
    <DetailsRow subtitle={'Publisher'} values={[publisher]} />
    <DetailsRow subtitle={'Website'} values={[website]} />
    <DetailsRow subtitle={'Space Required'} values={[spaceRequired]} last />
  </div>
);

AdditionalDetails.propTypes = {
  languages: PropTypes.array,
  publisher: PropTypes.string,
  spaceRequired: PropTypes.string,
  website: PropTypes.string
};

AdditionalDetails.defaultProps = {
  languages: [],
  publisher: '',
  spaceRequired: '',
  website: ''
};

export default AdditionalDetails;
