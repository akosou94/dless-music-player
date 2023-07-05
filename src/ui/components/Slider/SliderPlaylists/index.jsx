import React from 'react';
import Slider from '..';
import SliderItem from '../SliderItem';
import Link from 'next/link';

import styles from './SliderPlaylists.module.scss';

export default function SliderPlaylists({ playlists, buttons, pagination }) {
  return (
    <div className={styles.playlists__wrapper}>
      <Slider buttons={buttons} pagination={pagination}>
        {playlists.data?.map(({ id, attributes }, index) => (
          <SliderItem key={id}>
            <Link href={`/playlist/${id}`}>
              <img
                className={styles.playlists__slides}
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  playlists.data[index].attributes.poster.data.attributes.url
                }
                alt={'image'}
              />
            </Link>
            <h2 className={styles.playlists__descr}>
              {
                playlists.data[1].attributes.users_permissions_user.data
                  .attributes.username
              }
            </h2>
            <ul className={styles.playlists__list}>
              <li className={styles.playlists__item}>{attributes.title}</li>
            </ul>
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
}
