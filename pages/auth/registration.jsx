import { useState } from 'react';
import { AuthFetch } from '@/api';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import Registration from '@/ui/components/Form/Registration';

const callbackUrl = '/profile';

export default function SignUp() {
  const router = useRouter();

  const [reg, setReg] = useState({
    username: '',
    email: '',
    password: '',
  });

  const changeUsername = (e) => {
    setReg({ ...reg, username: e.target.value });
  };

  const changeEmail = (e) => {
    setReg({ ...reg, email: e.target.value });
  };

  const changePassword = (e) => {
    setReg({ ...reg, password: e.target.value });
  };

  const addReg = (e) => {
    e.preventDefault();

    AuthFetch(`/auth/local/register`, 'POST', reg).then(async (resp) => {
      if (resp.ok) {
        const { url } = await signIn('credentials', {
          identifier: reg.username,
          password: reg.password,
          redirect: false,
          callbackUrl,
        });

        router?.push(url);
      }

      setReg({
        username: '',
        email: '',
        password: '',
      });
    });
  };

  return (
    <>
      <div className='container'>
        {/* <Registration /> */}
        <div className='auth'>
          <h1 className='title'>Регистрация</h1>
          <form onSubmit={addReg}>
            <input
              type='text'
              placeholder='username'
              value={reg.username}
              onChange={changeUsername}
              className='fields'
            />
            <input
              type='email'
              placeholder='email'
              value={reg.email}
              onChange={changeEmail}
              className='fields'
            />
            <input
              type='password'
              placeholder='password'
              value={reg.password}
              onChange={changePassword}
              className='fields'
            />
            <button type='submit' className='btn'>
              Зарегистрироваться
            </button>
          </form>
        </div>
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
