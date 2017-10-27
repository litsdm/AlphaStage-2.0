import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.scss';

const Menu = () => (
  <div className={styles.Menu}>
    <NavLink to="/" exact className={styles.Item} activeClassName={styles.active}>
      <div className={styles.Indicator} />
      Browse
    </NavLink>
  </div>
);

export default Menu;
