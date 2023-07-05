import React from 'react';

import styles from '../Statistics/Statistics.module.scss';

export default function Statistics({
  liked,
  listened,
  playlists,
  favoriteAuthor,
}) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <span>S</span>tatistics
      </h3>
      <ul className={styles.userStat__list}>
        <li className={styles.userStat__item}>
          <p className={styles.userStat__title}>Liked</p>
          <span>{liked}</span>
        </li>
        <li className={styles.userStat__item}>
          <p className={styles.userStat__title}>Favorite Author</p>
          <span>{favoriteAuthor}</span>
        </li>
        <li className={styles.userStat__item}>
          <p className={styles.userStat__title}>Listened</p>
          <span>{listened} h</span>
        </li>
        <li className={styles.userStat__item}>
          <p className={styles.userStat__title}>Playlists</p>
          <span>{playlists}</span>
        </li>
      </ul>
    </div>
  );
}
