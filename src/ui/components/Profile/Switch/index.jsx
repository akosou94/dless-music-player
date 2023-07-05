import React from 'react';

import styles from '../Switch/Switch.module.scss';

export default function Switch() {
  return (
    <>
      <div>
        <label className={styles.switch}>
          <input type='checkbox' />
          <span className={styles.slider}></span>
        </label>
      </div>
    </>
  );
}
