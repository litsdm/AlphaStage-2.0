import React from 'react';
import uuid from 'uuid/v4';
import { array, func, number } from 'prop-types';
import styles from './Plans.scss';

const Plans = ({ plans, selectedPlan, setState }) => {
  const handlePlanClick = (index) => () => setState('selectedPlan', index);

  const renderPerks = (perks) =>
    perks.map(perk => <p key={uuid()}>{perk}</p>);


  const renderPlans = () =>
    plans.map((plan, index) => (
      <div
        key={uuid()}
        className={`${styles.Plan} ${index === selectedPlan ? styles.active : ''}`}
        onClick={handlePlanClick(index)}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <p className={styles.Name}>{plan.name}</p>
        <div className={styles.Divider} />
        <div className={styles.Info}>
          {renderPerks(plan.perks)}
        </div>
        <div className={styles.Divider2} />
        {
          plan.price === 'Free'
            ? <p className={styles.Price}>Free</p>
            : <p className={styles.Price}>{`$${plan.price} Monthly`}</p>
        }
      </div>
    ));

  return (
    <div className={styles.Container}>
      {renderPlans()}
    </div>
  );
};

Plans.propTypes = {
  plans: array.isRequired,
  selectedPlan: number.isRequired,
  setState: func.isRequired
};

export default Plans;
