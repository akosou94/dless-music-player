import Link from 'next/link';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '@/src/ui/components/DlessEvents/DlessEvents.module.scss';

export const EventInfo = ({ id, attributes, index }) => {
  const { title, place, date, time, author, poster } = attributes || {};
  const { data } = poster;

  const allMonths = {
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
  const eventMonth = allMonths[eventDate.getMonth()];
  const eventYear = eventDate.getFullYear();
  const eventDay = eventDate.getDate();

  return (
    <div className={styles.wrapper} key={id} index={index}>
      <div className={styles.eventInfo__left}>
        <ul className={styles.eventInfo__texts}>
          <li className={styles.dataEvent__number}>{eventDay}</li>
          <li className={styles.dataEvent__month}>{eventMonth}</li>
          <li className={styles.dataEvent__year}>{eventYear}</li>
          <li className={styles.dataEvent__time}>{time.slice(0, 5)}</li>
        </ul>
        {attributes.poster ? (
          <img
            src={process.env.NEXT_PUBLIC_API_URL + data?.attributes?.['url']}
            alt='no image'
          />
        ) : (
          <FontAwesomeIcon className='fa-xl' icon={faMusic} />
        )}
      </div>

      <div className={styles.eventInfo__right}>
        <Link href={`/events/${id}`} className={styles.eventInfo__title}>
          {title}
        </Link>
        <Link href={`/events/${id}`} className={styles.eventInfo__place}>
          {place}
        </Link>
        <Link href={`/events/${id}`} className={styles.eventInfo__author}>
          {author}
        </Link>
        <Link href='http://' className={styles.eventInfo__button}>
          Купить билет
        </Link>
      </div>
    </div>
  );
};
