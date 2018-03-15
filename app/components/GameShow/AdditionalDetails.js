import React from 'react';
import { array, string } from 'prop-types';
import styles from './AdditionalDetails.scss';

import DetailsRow from './DetailsRow';

const AdditionalDetails = ({ languages, publisher, spaceRequired, website }) => (
  <div className={styles.AdditionalDetails}>
    <p className={styles.Title}>Additional Details</p>
    <DetailsRow subtitle="Languages" values={languages || []} />
    <DetailsRow subtitle="Publisher" values={[publisher]} />
    <DetailsRow subtitle="Website" values={[website]} />
    <DetailsRow subtitle="Space Required" values={[spaceRequired]} last />
  </div>
);

AdditionalDetails.propTypes = {
  languages: array,
  publisher: string,
  spaceRequired: string,
  website: string
};

AdditionalDetails.defaultProps = {
  languages: [],
  publisher: '',
  spaceRequired: '',
  website: ''
};

export default AdditionalDetails;
