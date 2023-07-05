import React from 'react';

import Logo from '@/src/ui/components/global/Logo';
import AuthBadge from '@/src/ui/components/global/AuthBadge';
import SearchNew from '@/src/ui/components/global/SearchNew';

import styles from '@/src/ui/components/global/Header/Header.module.scss';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header__box}>
          <div className={styles.header__left}>
            <Logo />
          </div>
          <div className={styles.header__center}>
            <SearchNew />
          </div>
          <div className={styles.header__right}>
            <AuthBadge />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
