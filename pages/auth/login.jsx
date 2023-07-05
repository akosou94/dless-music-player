import Head from 'next/head';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Toast from '@/src/ui/components/global/Toast';

const callbackUrl = '/profile';

export default function SignIn() {
  const { status } = useSession();
  const [login, setLogin] = useState('');
  const router = useRouter();
  const [passsword, setPassword] = useState('');
  const [list, setList] = useState([]);

  const loginIn = async () => {
    const result = await signIn('credentials', {
      identifier: login,
      password: passsword,
      redirect: false,
      callbackUrl,
    });

    setLogin('');
    setPassword('');

    if (result.ok && result.status === 200) {
      router.push(result.url);
    } else {
      setList([
        ...list,
        {
          id: Date.now(),
          type: 'error',
          title: `${result.status} ${result.error}`,
          description: 'Ошибка авторизации',
        },
      ]);
    }
  };

  return (
    <>
      <Head>
        <title>Авторизация</title>
        <meta name='description' content='Decathlon lessons project' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Toast toastlist={list} setList={setList} />

      <div className='container'>
        <h1 className='title'>Авторизация</h1>
        {status === 'loading' ? (
          <div>loading...</div>
        ) : (
          <div className='auth'>
            <input
              type='text'
              placeholder='login'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className='fields'
            />
            <input
              type='password'
              placeholder='pass'
              value={passsword}
              onChange={(e) => setPassword(e.target.value)}
              className='fields'
            />
            <button onClick={loginIn} className='btn'>
              Войти
            </button>

            <div>
              <br />
              <Link href='/auth/registration'>Зарегистрироваться</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
