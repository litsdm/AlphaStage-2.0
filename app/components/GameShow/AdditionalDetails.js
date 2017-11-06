import React from 'react';
import styles from './AdditionalDetails.scss';

import DetailsRow from './DetailsRow';

const AdditionalDetails = () => (
  <div className={styles.AdditionalDetails}>
    <p className={styles.Title}>Additional Details</p>
    <DetailsRow subtitle={'Languages'} values={['English', 'Spanish', 'Japanese']} />
    <DetailsRow subtitle={'Publisher'} values={['Alpha Stage Studios']} />
    <DetailsRow subtitle={'Space Required'} values={['20 GB']} />
    <DetailsRow subtitle={'Version'} values={['0.0.1']} />
  </div>
);

export default AdditionalDetails;
