import React from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import styles from './AdditionalDetails.scss';

const DetailsRow = ({ subtitle, values, last }) => {
  const renderValues = () => (
    values.map(value => <p key={uuid()}>{value}</p>)
  );

  return (
    <div className={styles.Row} style={last ? { border: 'none' } : {}}>
      <p className={styles.Subtitle}>{subtitle}</p>
      <div className={styles.Values}>
        {renderValues()}
      </div>
    </div>
  );
};

DetailsRow.propTypes = {
  subtitle: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  last: PropTypes.bool
};

DetailsRow.defaultProps = {
  last: false
};

export default DetailsRow;
