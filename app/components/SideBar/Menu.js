import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Menu.scss';

const Menu = () => (
  <div className={styles.Menu}>
    <Link to="/games/new" className={styles.Button}>Create Game</Link>
    <NavLink to="/" exact className={styles.Item} activeClassName={styles.active}>
      <div className={styles.Indicator} />
      Browse
    </NavLink>
  </div>
);

export default Menu;
