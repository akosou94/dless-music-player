import { Roboto } from '@next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import NextNProgress from 'nextjs-progressbar';

import { SessionProvider } from 'next-auth/react';

import Player from '@/src/ui/components/global/Player';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
});

import '@/styles/sass/Normalize.scss';
import '@/styles/sass/globals.scss';
import '@/styles/sass/grid.scss';

import Layout from '@/src/ui/components/global/Layout';
import React from 'react';
import { Providers } from '@/src/redux/provider';

interface IAppProps {
  Component: any;
  pageProps: any;
}

export default function App({
  Component,
  pageProps,
}: IAppProps): React.ReactNode {
  return (
    <SessionProvider session={pageProps?.session}>
      <Providers>
        <div className={roboto.className}>
          <Layout>
            <NextNProgress color='#e92a67' height={3} showOnShallow={false} />
            <Component {...pageProps} />
          </Layout>
          <Player />
        </div>
      </Providers>
    </SessionProvider>
  );
}
