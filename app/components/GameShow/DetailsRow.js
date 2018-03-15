import React from 'react';
import uuid from 'uuid/v4';
import { array, bool, string } from 'prop-types';
import styles from './AdditionalDetails.scss';

const DetailsRow = ({ subtitle, values, last }) => {
  const renderValues = () => (
    values.map(value => <p key={uuid()}>{value}</p>)
  );

  return values.length > 0 && values[0]
    ? (
      <div className={styles.Row} style={last ? { border: 'none' } : {}}>
        <p className={styles.Subtitle}>{subtitle}</p>
        <div className={styles.Values}>
          {renderValues()}
        </div>
      </div>
    )
    : null;
};

DetailsRow.propTypes = {
  subtitle: string.isRequired,
  values: array,
  last: bool
};

DetailsRow.defaultProps = {
  values: [],
  last: false
};

export default DetailsRow;
