import React from 'react';
import { number } from 'prop-types';
import styles from './ProgressBar.scss';

const ProgressBar = ({ progress }) => {
  const getCircleClass = (index) => {
    const shared = styles.Circle;
    if (index === progress) return `${shared} ${styles.active}`;
    if (index < progress) return `${shared} ${styles.done}`;

    return shared;
  };

  return (
    <div className={styles.Container}>
      <div className={getCircleClass(0)}>
        <p>Information</p>
        <div>
          <i className="fa fa-check" />
          <p>1</p>
        </div>
      </div>
      <div className={styles.Bar} style={progress > 0 ? { backgroundColor: '#2091f3' } : {}} />
      <div className={getCircleClass(1)}>
        <p>Category</p>
        <div>
          <i className="fa fa-check" />
          <p>2</p>
        </div>
      </div>
      <div className={styles.Bar} style={progress > 1 ? { backgroundColor: '#2091f3' } : {}} />
      <div className={getCircleClass(2)}>
        <p>Checkout</p>
        <div>
          <i className="fa fa-check" />
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: number.isRequired
};

export default ProgressBar;
