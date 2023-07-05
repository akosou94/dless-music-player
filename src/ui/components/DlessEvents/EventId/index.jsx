import React from 'react';

import styles from './EventId.module.scss';

export default function EventId({ events }) {
  const { title, place, date, time, author, poster, id } = events[0].attributes;

  const { data } = poster;

  const months = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Ноября',
    10: 'Декабря',
  };

  const eventDate = new Date(date);
  const eventMonth = months[eventDate.getMonth()];
  const eventYear = eventDate.getFullYear();
  const eventDay = eventDate.getDate();

  return (
    <div className={styles.wrapper} key={id}>
      <div className={styles.eventInfo__left}>
        <ul className={styles.eventInfo__texts}>
          <li className={styles.dataEvent__number}>{eventDay}</li>
          <li className={styles.dataEvent__month}>{eventMonth}</li>
          <li className={styles.dataEvent__year}>{eventYear}</li>
          <li className={styles.dataEvent__time}>{time.slice(0, 5)}</li>
          <li className={styles.eventInfo__place}>{place}</li>
        </ul>
        <div className={styles.eventInfo__image}>
          <img
            src={process.env.NEXT_PUBLIC_API_URL + data?.attributes?.['url']}
            alt='no image'
          />
        </div>
        <button className={styles.eventInfo__links}>
          <a href='http://'> Купить билет </a>
        </button>
      </div>
      <div className={styles.eventInfo__right}>
        <p className={styles.eventInfo__title}>{title}</p>
        <p className={styles.eventInfo__author}>{author}</p>
        <p className={styles.eventInfo}>
          Здесь будет большое красивое описание события! <br />
          Оно будет просто нереально крутое, виртуально-превиртуально: проще,
          лучше, качественнее - такого вы еще не видели! <br />
          Но для этого нам нужно API
        </p>
      </div>
    </div>
  );
}
