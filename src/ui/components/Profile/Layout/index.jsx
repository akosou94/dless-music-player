import React from 'react';
import Sidebar from '@/src/ui/components/Profile';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className='container'>
      <div className={styles.profile}>
        <div className={styles.profile__menu}>
          <Sidebar />
        </div>
        <div className={styles.profile__content}>{children}</div>
      </div>
    </div>
  );
}
