import React from 'react';
import Slider from '..';
import SliderItem from '../SliderItem';
import Link from 'next/link';

import styles from './SliderEvents.module.scss';

export default function SliderEvents({ events, buttons, pagination }) {
  return (
    <div className={styles.events__wrapper}>
      <Slider buttons={buttons} pagination={pagination}>
        {events.data?.map(({ id, attributes }, index) => (
          <SliderItem key={id}>
            <Link href={`/events`}>
              <img
                className={styles.events__slides}
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  events.data[index].attributes.poster.data.attributes.url
                }
                alt={'image'}
              />
              <ul className={styles.events__list}>
                <li className={styles.events__description}>
                  <p className={styles.events__date}>
                    {attributes.date.slice(8, 10)} Марта
                  </p>
                  <p className={styles.events__time}>
                    {attributes.time.slice(0, 5)}
                  </p>
                </li>
                <li className={styles.events__description}>
                  <p className={styles.events__item}>{attributes.title}</p>
                  <p className={styles.events__item}>{attributes.author}</p>
                </li>
              </ul>
            </Link>
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
}
