import React, { useState } from 'react';
import Link from 'next/link';

import styles from '@/src/ui/components/global/Navigation/Navigation.module.scss';

export default function Navigation({ menu }) {
  const [isNav, setIsNav] = useState(false);

  return (
    <>
      <div className={styles.nav}>
        <div
          className={`${styles.nav__btn} ${
            isNav ? styles.nav__btn_active : ''
          }`}
          onClick={() => setIsNav(!isNav)}
        ></div>
        <div
          className={`${styles.nav__box} ${
            isNav ? styles.nav__box_active : ''
          }`}
        >
          {menu &&
            menu?.data.map(({ id, attributes }) => (
              <Link href='/' key={id} className={styles.nav__link}>
                {attributes.name}
              </Link>
            ))}
        </div>
      </div>

      {/* <Search /> */}
    </>
  );
}
