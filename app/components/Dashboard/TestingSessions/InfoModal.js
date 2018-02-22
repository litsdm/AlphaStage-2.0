import React from 'react';
import { func, string } from 'prop-types';
import styles from './InfoModal.scss';

import Modal from '../../Modal';

const InfoModal = ({ id, startSession }) => {
  const onStart = () => {
    document.getElementById(id).style.display = 'none';
    startSession();
  };

  return (
    <Modal id={id} title="Testing Session">
      <div className={styles.Content}>
        <h2 className={styles.How}>How it works?</h2>
        <p>
          When you click on start session Alpha Stage will start recording your screen,
          {' '}and if you allow it, your microphone input (More in the commentary
          {' '}section). When you are done playing a modal like this one will pop-up
          {' '}where you will be able to see your gameplay and add written comments
          {' '}wherever you want on it! This is very helpful for the developers so
          {' '}you will gain extra exp by doing it.
        </p>
        <h2>This session{'\''}s objectives</h2>
        <p>
          The developers of this game have laid a few objectives for you to follow,
          {' '}you can do as many as you like and then select the ones you accomplished
          {' '}when you are done playing.
        </p>
        <h2>Commentary</h2>
        <p>
          If you allow it we will record your voice so you can tell the developers
          {' '}what is going through your mind as you play their game! This feature
          {' '}is completely optional and you can turn it off by un-checking the
          {' '}checkbox just below this text.
        </p>
      </div>
      <div className={styles.Footer}>
        <button className={styles.Start} onClick={onStart}>Start Session Now</button>
      </div>
    </Modal>
  );
};

InfoModal.propTypes = {
  id: string.isRequired,
  startSession: func.isRequired
};

export default InfoModal;
