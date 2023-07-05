import React from 'react';
import Head from 'next/head';
import Playlist_Page from '@/src/ui/components/Playlist_Page';

import { getPlaylistByID } from '@/api';

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await getPlaylistByID(id);

  if (response.data.length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { response },
  };
};

const Details = ({ response }) => {
  const { data } = response;

  return (
    <>
      <Head>
        <meta name='description' content='Decathlon lessons project' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container'>
        <Playlist_Page playlist={data} />
      </div>
    </>
  );
};

export default Details;
