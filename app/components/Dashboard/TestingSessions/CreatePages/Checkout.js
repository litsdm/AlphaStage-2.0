import React from 'react';
import uuid from 'uuid/v4';
import { object } from 'prop-types';
import styles from './Checkout.scss';

const Checkout = ({ plan: { price, perks, description, duration, name } }) => {
  const planPrice = price === 'Free'
    ? '$0.00'
    : `$${price} USD`;

  const renderPerks = () => (
    perks.map(perk => (
      <p key={uuid()} className={styles.Perk}>
        <i className="fa fa-check-circle-o" /> {perk}.
      </p>
    ))
  );

  return (
    <div className={styles.Container}>
      <div className={styles.ContentCard}>
        <p className={styles.Title}><strong>{name}</strong> plan ({duration})</p>
        <div className={styles.PriceDivider}>
          <div />
          <p>{planPrice}</p>
        </div>
        <div className={styles.Info}>
          <p className={styles.Description}>{description}</p>
          {renderPerks()}
        </div>
        <div className={styles.Divider} />
        <div className={styles.Total}>Total: {planPrice}</div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  plan: object.isRequired
};

export default Checkout;
