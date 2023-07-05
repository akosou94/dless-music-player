import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from '@/src/ui/components/global/AuthBadge/AuthBadge.module.scss';

const AuthBadge = () => {
  const { data: session } = useSession();

  const customLoader = () => {
    return `https://api.dless.ru${session?.user?.image}`;
  };

  return (
    <Link
      href={session ? '/profile' : '/auth/login'}
      className={styles.authBadge}
    >
      <div className={styles.authBadge__name}>
        {session
          ? session?.user?.name
            ? session?.user?.name
            : session?.user?.username
          : 'Авторизация'}
      </div>
      <div className={styles.authBadge__ava}>
        {session?.user?.image ? (
          <img src={process.env.NEXT_PUBLIC_API_URL + session?.user?.image} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
    </Link>
  );
};

export default AuthBadge;
