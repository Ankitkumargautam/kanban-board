import React from 'react';
import styles from './Card.module.css';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLabels}>
          <label style={{ backgroundColor: 'blue' }}>urgent</label>
        </div>
        <div className={styles.cardTopMore}>
          <MoreHorizontal />
        </div>
      </div>
      <div className={styles.cardTitle}>Card title</div>
      <div className={styles.cardDescription}>
        Card Description lksjflsdlk lsjfka lfjlksjala lkdjlkdsjfla alf
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.cardFooterItem}>
          <Clock className={styles.cardFooterIcon} />
          29 Sep
        </p>
        <p className={styles.cardFooterItem}>
          <CheckSquare className={styles.cardFooterIcon} />
          1/4
        </p>
      </div>
    </div>
  );
};

export default Card;
