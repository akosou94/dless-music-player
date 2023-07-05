import React from 'react';

import styles from '../Buttons/Buttons.module.scss';

export default function Buttons({ prev, next }) {
  return (
    <>
      <div className={styles.button}>
        <span onClick={prev} className={styles.button__left}></span>
        <span onClick={next} className={styles.button__right}></span>
      </div>
    </>
  );
}
