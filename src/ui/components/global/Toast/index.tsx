import React, { useEffect } from 'react';
import styles from '@/src/ui/components/global/Toast/Toast.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ toastlist, setList }: IToastProps): JSX.Element => {
  const deleteToast = (id: number): void => {
    const toastListItem = toastlist.filter(
      (e: { id: number }): boolean => e.id !== id
    );
    setList(toastListItem);
  };

  useEffect(() => {
    const interval = setInterval((): void => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className={`${styles.container} `}>
      {toastlist.map(
        (toast: IToast, i: number): JSX.Element => (
          <div
            key={i}
            className={`${styles.notification} ${styles[toast.type]}`}
          >
            <div className={styles.notification__message}>
              <p className={styles.title}>{toast.title}</p>
              <p className={styles.description}>{toast.description}</p>
            </div>
            <button onClick={(): void => deleteToast(toast.id)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Toast;
