import { useState } from 'react';
import Toast from '@/src/ui/components/global/Toast/index';

import styles from '@/src/ui/components/Profile/ProfileSettings/Settings.module.scss';

import { postPassword, putEmail, putName } from '@/api';
import { validatePassword, validateEmail } from '@/src/utils/validators';

export default function ProfileSettings({ user, token }) {
  const [list, setList] = useState([]);
  const { name, email, id } = user;
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const successNotify = () => {
    setList([
      ...list,
      {
        id: Date.now(),
        type: 'success',
        description: 'Успешно',
      },
    ]);
    clearInput();
  };
  const errorNotify = () => {
    setList([
      ...list,
      {
        id: Date.now(),
        type: 'error',
        description: 'Ошибка, проверьте корректность данных',
      },
    ]);
    clearInput();
  };

  const clearInput = () => {
    setNewName('');
    setNewEmail('');
    setCurrentPassword('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const updateUserName = () => {
    if (newName.length >= 6) {
      putName(
        {
          json: {
            name: newName,
          },
        },
        token,
        id
      );
      successNotify();
    } else {
      errorNotify();
    }
  };

  const updateUserEmail = () => {
    if (!validateEmail(newEmail)) {
      errorNotify();
    } else {
      putEmail(
        {
          json: {
            email: newEmail,
          },
        },
        token,
        id
      );
      successNotify();
    }
  };

  const updatePasswordHandle = () => {
    if (!validatePassword(currentPassword, password, passwordConfirmation)) {
      errorNotify();
    } else {
      postPassword(
        {
          json: {
            currentPassword: currentPassword,
            password: password,
            passwordConfirmation: passwordConfirmation,
          },
        },
        token
      );
      successNotify();
    }
  };

  return (
    <div>
      <Toast toastlist={list} setList={setList} />
      <div className={styles.wrapper}>
        <div className={styles.settings}>
          <div className={styles.user}>
            <h3>Изменить имя</h3>
            <ul className={styles.settings__list}>
              <li className={styles.settings__item}>
                <input
                  autoComplete='off'
                  className={styles.settings__input}
                  type={'text'}
                  value={newName}
                  placeholder={name}
                  onChange={(e) => setNewName(e.target.value)}
                />
                {newName && (
                  <label className={styles.label}> Не менее 6 символов </label>
                )}
              </li>
            </ul>
            <button
              className={styles.settings__button}
              type={'submit'}
              onClick={updateUserName}
            >
              Изменить
            </button>
          </div>
          <div className={styles.user}>
            <h3>Изменить email</h3>
            <ul className={styles.settings__list}>
              <li className={styles.settings__item}>
                <input
                  className={styles.settings__input}
                  type={'email'}
                  value={email}
                  placeholder={email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </li>
              <li className={styles.settings__item}>
                <input
                  className={styles.settings__input}
                  type={'email'}
                  value={newEmail}
                  placeholder={'New email'}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </li>
            </ul>
            <button
              className={styles.settings__button}
              type={'submit'}
              onClick={updateUserEmail}
            >
              Изменить
            </button>
          </div>

          <div className={styles.user}>
            <h3>Изменить пароль</h3>
            <ul className={styles.settings__list}>
              <li className={styles.settings__item}>
                <input
                  className={styles.settings__input}
                  type={'password'}
                  value={currentPassword}
                  placeholder='Старый пароль'
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </li>
              <li className={styles.settings__item}>
                <input
                  className={styles.settings__input}
                  type={'password'}
                  value={password}
                  placeholder='Новый пароль'
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <label className={styles.label}>
                    {' '}
                    Буквы и цифры. Не менее 6 символов{' '}
                  </label>
                )}
              </li>
              <li className={styles.settings__item}>
                <input
                  className={styles.settings__input}
                  type={'password'}
                  value={passwordConfirmation}
                  placeholder='Подтвердите новый пароль'
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </li>
            </ul>
            <button
              onClick={updatePasswordHandle}
              className={styles.settings__button}
              type={'submit'}
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
