import { getSession } from 'next-auth/react';
import Layout from '@/src/ui/components/Profile/Layout';
import ProfileSettings from '@/src/ui/components/Profile/ProfileSettings';

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const user = session.user;
  const jwtToken = session.jwt;

  return {
    props: { user, jwtToken },
  };
};

export default function SettingsPage({ user, jwtToken }) {
  return (
    <>
      <Layout>
        <ProfileSettings user={user} token={jwtToken} />
      </Layout>
    </>
  );
}
