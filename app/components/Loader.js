import React from 'react';
import styles from './Loader.scss';

const Loader = () =>
  <i className={['fa fa-spinner fa-pulse fa-3x fa-fw', styles.Loader].join(' ')} />;

export default Loader;
